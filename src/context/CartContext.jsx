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

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });


  // Helper function to merge guest cart with user cart
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

  const updateUserCart = async (userId, cartData) => {
    try {
      await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cartData }),
      });
    } catch (error) {
      console.error('Error updating user cart:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      // Load user's cart from server
      fetch(`http://localhost:3000/users/${user.id}`)
        .then(res => res.json())
        .then(userData => {
          if (userData.cart && userData.cart.length > 0) {
            // Merge guest cart with user cart
            const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const mergedCart = mergeCarts(guestCart, userData.cart);
            dispatch({ type: 'SET_CART', payload: mergedCart });
            // Update server with merged cart
            updateUserCart(user.id, mergedCart);
          } else {
            // If user has no cart, use guest cart
            const guestCart = JSON.parse(localStorage.getItem('cart') || '[]');
            if (guestCart.length > 0) {
              dispatch({ type: 'SET_CART', payload: guestCart });
              updateUserCart(user.id, guestCart);
            }
          }
        })
        .catch(error => console.error('Error loading user cart:', error));
    } else {
      // User logged out, save current cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [isAuthenticated, user]);

  // Save cart to server when cart changes and user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && cart.length >= 0) {
      updateUserCart(user.id, cart);
    } else if (!isAuthenticated) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
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
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotal,
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