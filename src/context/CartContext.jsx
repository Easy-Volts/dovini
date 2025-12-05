import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    case 'SET_CART':
      return action.payload;
    default:
      return state;
  }
};

const getUserCartKey = (user) => {
  if (!user || !user.id) return 'dovini_guest_cart';
  return `dovini_cart_user_${user.id}`;
};

const getGuestCartKey = () => 'dovini_guest_cart';

const mergeCarts = (guestCart, userCart) => {
  const merged = [...userCart];
  guestCart.forEach(guestItem => {
    const existingIndex = merged.findIndex(item => item.id === guestItem.id);
    if (existingIndex >= 0) {
      merged[existingIndex].quantity += guestItem.quantity;
    } else {
      merged.push(guestItem);
    }
  });
  return merged;
};

const loadCartFromStorage = (key) => {
  try {
    const localData = localStorage.getItem(key);
    return localData ? JSON.parse(localData) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

const saveCartToStorage = (key, cartData) => {
  try {
    localStorage.setItem(key, JSON.stringify(cartData));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  
  const currentCartKey = isAuthenticated && user ? getUserCartKey(user) : getGuestCartKey();
  
  const initialCart = loadCartFromStorage(currentCartKey);
  
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  useEffect(() => {
    if (isAuthenticated && user) {
      const userCartKey = getUserCartKey(user);
      const currentUserCart = loadCartFromStorage(userCartKey);
      const guestCart = loadCartFromStorage(getGuestCartKey());
      
      if (guestCart.length > 0) {
        const mergedCart = mergeCarts(guestCart, currentUserCart);
        dispatch({ type: 'SET_CART', payload: mergedCart });
        saveCartToStorage(userCartKey, mergedCart);
        
        localStorage.removeItem(getGuestCartKey());
      } else if (currentUserCart.length > 0) {
        dispatch({ type: 'SET_CART', payload: currentUserCart });
      }
    } else if (!isAuthenticated && user === null) {
      const guestCartKey = getGuestCartKey();
      saveCartToStorage(guestCartKey, cart);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const storageKey = isAuthenticated && user ? getUserCartKey(user) : getGuestCartKey();
    saveCartToStorage(storageKey, cart);
  }, [cart, isAuthenticated, user]);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    
    const storageKey = isAuthenticated && user ? getUserCartKey(user) : getGuestCartKey();
    localStorage.removeItem(storageKey);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSummary = () => {
    const total = getTotal();
    const itemCount = getItemCount();
    const savings = cart.reduce((total, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);

    return {
      total,
      itemCount,
      savings,
      isEmpty: cart.length === 0
    };
  };

  const getCurrentUserCartKey = () => {
    return currentCartKey;
  };

  const clearAllUserCarts = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('dovini_cart_user_')) {
        localStorage.removeItem(key);
      }
    });
  };

  const getAllUserCartKeys = () => {
    const keys = Object.keys(localStorage);
    return keys.filter(key => key.startsWith('dovini_cart_user_'));
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
      getItemCount,
      getCartSummary,
      getCurrentUserCartKey,
      clearAllUserCarts,
      getAllUserCartKeys,
      isAuthenticated,
      user,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};