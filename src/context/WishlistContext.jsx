import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user, isAuthenticated } = useAuth();

  const getWishlistStorageKey = () => {
    if (isAuthenticated && user?.id) {
      return `dovini-wishlist-user-${user.id}`;
    }
    return "dovini-wishlist";
  };

  const loadWishlist = () => {
    const storageKey = getWishlistStorageKey();
    const savedWishlist = localStorage.getItem(storageKey);
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Error loading wishlist:", error);
      }
    } else {
      if (isAuthenticated && user?.id) {
        const guestWishlist = localStorage.getItem("dovini-wishlist");
        if (guestWishlist) {
          try {
            const guestItems = JSON.parse(guestWishlist);
            if (guestItems.length > 0) {
              setWishlist(guestItems);
              localStorage.setItem(getWishlistStorageKey(), guestWishlist);
            } else {
              setWishlist([]);
            }
          } catch (error) {
            console.error("Error migrating guest wishlist:", error);
            setWishlist([]);
          }
        } else {
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    }
  };

  useEffect(() => {
    loadWishlist();
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (wishlist.length >= 0) {
      const storageKey = getWishlistStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    }
  }, [wishlist, user, isAuthenticated]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const wishlistCount = wishlist.length;

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    wishlistCount,
    currentUserId: user?.id,
    isAuthenticated,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
