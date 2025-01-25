import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);

  return (
    <AuthContext.Provider value={{ roles, setRoles }}>
      {children}
    </AuthContext.Provider>
  );
};
