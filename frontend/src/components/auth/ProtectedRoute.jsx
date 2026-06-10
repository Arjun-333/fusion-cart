import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-wrapper flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
