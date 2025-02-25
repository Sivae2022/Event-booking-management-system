import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check if the token exists
    const location = useLocation();

    return isAuthenticated ? (
        Component
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
};

export default ProtectedRoute;
