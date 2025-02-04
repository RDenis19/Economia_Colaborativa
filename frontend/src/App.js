// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import MainView from "./views/MainView";
import { AuthContext } from "./auth/AuthContext";

const App = () => {
  const { roles } = useContext(AuthContext);

  // Si no hay roles, se mostrará el login; de lo contrario, la vista principal.
  return (
    <Routes>
      {/* Ruta pública para Login */}
      <Route path="/" element={<Login />} />
      
      {/* Si se han asignado roles, se carga MainView */}
      {roles.length > 0 && <Route path="/*" element={<MainView />} />}
      
      {/* Si no hay roles, cualquier otra ruta redirige a "/" */}
      {roles.length === 0 && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  );
};

export default App;
