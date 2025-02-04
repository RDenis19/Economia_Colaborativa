// src/auth/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [usuario, setUsuario] = useState(null);
  const [roles, setRoles] = useState([]);

  return (
    <AuthContext.Provider value={{ usuario, roles, setRoles }}>
      {children}
    </AuthContext.Provider>
  );
};
