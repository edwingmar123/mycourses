import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext"; 

const PrivateRoute = ({ children }) => {
  const { userName } = useAuth(); // Obtén el valor de userName del contexto

  return userName ? children : <Navigate to="/login" />;
};

export default PrivateRoute;