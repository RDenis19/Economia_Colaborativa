// src/App.jsx
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import MainView from "./views/MainView";
import { AuthContext } from "./auth/AuthContext";

const App = () => {
  const { roles } = useContext(AuthContext);

  return (
    <Routes>
      {/* Ruta pública para Login */}
      <Route path="/" element={<Login />} />

      {/* Si hay roles, carga la vista principal */}
      {roles.length > 0 && <Route path="/*" element={<MainView />} />}

      {/* Si no hay roles, redirige a Login */}
      {roles.length === 0 && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  );
};

export default App;
