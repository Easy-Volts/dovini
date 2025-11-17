import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthContext';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('dovini_token');
      if (!token) {
        setOrders([]);
        return;
      }
      
      const res = await fetch("https://api.dovinigears.ng/orders", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data.data || []);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchOrders();
    } else {
      
      setLoading(false);
    }
  }, [user, isAuthenticated]);

  return (
    <OrdersContext.Provider value={{ orders, loading, error }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
