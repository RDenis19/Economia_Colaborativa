import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import MainView from "./views/MainView"; // Importa MainView correctamente
import { AuthContext } from "./auth/AuthContext";

const App = () => {
  const { roles } = useContext(AuthContext);

  // Función para generar las rutas protegidas
  const renderProtectedRoutes = () => {
    if (roles.length === 0) {
      // Si no hay roles, redirige al login
      return <Route path="*" element={<Navigate to="/" />} />;
    }

    // Renderiza la vista principal (MainView) para cualquier usuario con roles
    return <Route path="/*" element={<MainView />} />;
  };

  return (
    <Routes>
      {/* Ruta pública para el Login */}
      <Route path="/" element={<Login />} />

      {/* Llamada a la función que genera las rutas protegidas */}
      {renderProtectedRoutes()}
    </Routes>
  );
};

export default App;

