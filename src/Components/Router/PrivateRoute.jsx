import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Spinner from './Spinner';

// Renamed RoleRoute to PrivateRoute
const PrivateRoute = ({ allowedRole, children }) => {
  const { user, load } = useContext(AuthContext);
  const location = useLocation();

  if (load) return <Spinner />;

  if (!user) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role != allowedRole) {
    console.log(user?.role)
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Role-based wrappers using PrivateRoute
export const WorkerRoute = ({ children }) => (
  <PrivateRoute allowedRole="Worker">{children}</PrivateRoute>
);

export const BuyerRoute = ({ children }) => (
  <PrivateRoute allowedRole="Buyer">{children}</PrivateRoute>
);

export const AdminRoute = ({ children }) => (
  <PrivateRoute allowedRole="Admin">{children}</PrivateRoute>
);
