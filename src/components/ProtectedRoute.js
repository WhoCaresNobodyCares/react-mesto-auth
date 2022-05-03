import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = props => {
  return props.isLoggedIn ? props.element : <Navigate to='sign-up' replace />;
};

export default ProtectedRoute;
