import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
const ProtectedAdmin = ({ children }) => {
  const {admin, loading} = useAdmin()
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/app/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedAdmin;