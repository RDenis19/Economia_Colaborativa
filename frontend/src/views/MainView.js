import React, { useContext } from "react";
import { Layout } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Componente de la barra lateral
import Header from "../components/Header";   // Componente del encabezado
import { AuthContext } from "../auth/AuthContext";
import { Permissions } from "../auth/Permissions";

// Importar módulos
import Dashboard from "../modules/Dashboard/Dashboard";
import Projects from "../modules/Projects/Projects";
import Users from "../modules/Users/Users";
import Tickets from "../modules/Tickets/Tickets";
import Notifications from "../modules/Notifications/Notifications";

// Registrar los módulos disponibles
const Modules = { Dashboard, Projects, Users, Tickets, Notifications };

const { Content } = Layout;

const MainView = () => {
  const { roles } = useContext(AuthContext);

  // Obtener módulos según los permisos del rol
  const userModules = roles
    .flatMap((role) => Permissions[role] || []) // Obtener permisos según el rol
    .filter((mod, index, self) => 
      self.findIndex((m) => m.name === mod.name) === index
    ); // Evitar duplicados

  const handleLogout = () => {
    localStorage.removeItem("jwt_token"); // Eliminar el token del almacenamiento local
    window.location.href = "/"; // Redirigir al login
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Barra lateral */}
      <Sidebar links={userModules} onLogout={handleLogout} />

      {/* Contenido principal */}
      <Layout>
        <Header 
          username="Usuario Ejemplo" // Cambiar por el nombre real del usuario si está disponible
          profilePic={null} 
          onLogout={handleLogout} 
        />
        <Content style={{ margin: "24px 16px", padding: 24, background: "#fff" }}>
          <Routes>
            {userModules.map((module, index) => {
              const Component = Modules[module.component]; // Selecciona el componente dinámico
              return (
                <Route key={index} path={module.path} element={<Component />} />
              );
            })}
            {/* Ruta predeterminada */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainView;
