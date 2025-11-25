import React, { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // start as true
  const [error, setError] = useState(null);

  // Derived boolean for role check
  const isAdmin = !!admin; // only true if admin exists (already verified in login)

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://api.dovinigears.ng/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        const user = data.data.user;

        if (user.role !== 'admin') {
          setError('Access denied. Not an admin.');
          setLoading(false);
          return false;
        }

        setAdmin(user);
        setToken(data.data.token);
        localStorage.setItem('admin', JSON.stringify(user));
        localStorage.setItem('adminToken', data.data.token);

        setLoading(false);
        return true;
      } else {
        setError('Invalid credentials');
        setLoading(false);
        return false;
      }
    } catch (err) {
      setError('Login failed. Try again.');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
  };

  // Restore session from localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    const storedToken = localStorage.getItem('adminToken');

    if (storedAdmin && storedToken) {
      setAdmin(JSON.parse(storedAdmin));
      setToken(storedToken);
    }

    setLoading(false); // done restoring, even if nothing was found
  }, []);

  return (
    <AdminContext.Provider
      value={{ admin, token, loading, error, login, logout, isAdmin }}
    >
      {children}
    </AdminContext.Provider>
  );
};
