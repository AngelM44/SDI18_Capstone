import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";

function ProtectedRoute(props) {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return null; // Render a loading indicator while the authentication state is being initialized
  }

  return (
    <Route
      {...props}
      element={
        isAuthenticated ? props.element : <Navigate to="/login" replace />
      }
    />
  );
}

export default ProtectedRoute;
