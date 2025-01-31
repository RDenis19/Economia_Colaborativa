import React, { createContext, useState, useEffect } from "react";
import { getToken } from "../utils/authUtils"; // Importar la función para obtener el token
import { jwtDecode } from "jwt-decode"; // Para decodificar el token

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roles, setRoles] = useState([]);
  const [usuario, setUsuario] = useState(null); // Estado para almacenar el usuario autenticado

  useEffect(() => {
    const token = getToken(); // Obtener el token del localStorage

    if (token) {
      const decodedToken = jwtDecode(token);
      setUsuario(decodedToken); // Decodificar el token y almacenar la información del usuario
      setRoles(decodedToken.roles || []); // Si el token tiene roles, los almacenamos
    }
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, roles, setRoles }}>
      {children}
    </AuthContext.Provider>
  );
};
