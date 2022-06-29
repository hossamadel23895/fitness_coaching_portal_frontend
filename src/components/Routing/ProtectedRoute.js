import React from "react";
import { Navigate, Route } from "react-router-dom";
import Cookies from "universal-cookie";

function ProtectedRoute({ redirectPath = "/login", children }) {
  const cookies = new Cookies();
  const isAuthenticated = cookies.get("jwt");
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to={redirectPath} replace />;
}

export default ProtectedRoute;
