// src/auth/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario] = useState(null);
  const [roles, setRoles] = useState([]);

  return (
    <AuthContext.Provider value={{ usuario, roles, setRoles }}>
      {children}
    </AuthContext.Provider>
  );
};
