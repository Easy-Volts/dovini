import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user, isAuthenticated } = useAuth();

  // Generate storage key based on user authentication state
  const getWishlistStorageKey = () => {
    if (isAuthenticated && user?.id) {
      return `dovini-wishlist-user-${user.id}`;
    }
    return 'dovini-wishlist'; // Guest wishlist
  };

  // Load wishlist from localStorage
  const loadWishlist = () => {
    const storageKey = getWishlistStorageKey();
    const savedWishlist = localStorage.getItem(storageKey);
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    } else {
      // If no wishlist exists for current user, check for guest wishlist
      if (isAuthenticated && user?.id) {
        const guestWishlist = localStorage.getItem('dovini-wishlist');
        if (guestWishlist) {
          try {
            const guestItems = JSON.parse(guestWishlist);
            if (guestItems.length > 0) {
              // Merge guest wishlist with user's empty wishlist
              setWishlist(guestItems);
              localStorage.setItem(getWishlistStorageKey(), guestWishlist);
              // Optional: Clear guest wishlist after migration
              // localStorage.removeItem('dovini-wishlist');
            } else {
              setWishlist([]);
            }
          } catch (error) {
            console.error('Error migrating guest wishlist:', error);
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

  // Load wishlist when component mounts or user state changes
  useEffect(() => {
    loadWishlist();
  }, [user, isAuthenticated]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlist.length >= 0) { // Save even if empty to create user-specific storage
      const storageKey = getWishlistStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(wishlist));
    }
  }, [wishlist, user, isAuthenticated]);

  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev; // Already in wishlist
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
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

  // Get wishlist count for current user
  const wishlistCount = wishlist.length;

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
    wishlistCount,
    // Expose current user info for debugging
    currentUserId: user?.id,
    isAuthenticated,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};