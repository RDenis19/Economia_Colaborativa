// src/views/MainView.jsx
import React, { useContext } from "react";
import { Layout } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { AuthContext } from "../auth/AuthContext";
import { Permissions } from "../auth/Permissions";

// Importar módulos para Dashboard
import DashboardAdmin from "../modules/Dashboard/DashboardAdmin";
import DashboardCreator from "../modules/Dashboard/DashboardCreator";
import DashboardUser from "../modules/Dashboard/DashboardUser";

// Importar módulos para Proyectos
import ProjectsAdmin from "../modules/Projects/ProjectsAdmin";
import ProjectsCreator from "../modules/Projects/ProjectsCreator";
import ProjectsUser from "../modules/Projects/ProjectsUser";

// Importar otros módulos
import Users from "../modules/Users/Users";
import Tickets from "../modules/Tickets/Tickets";
import Notifications from "../modules/Notifications/Notifications";

// Importar submódulos de Proyectos
import ProjectCategories from "../modules/Projects/Submodules/ProjectCategory/ProjectCategories";
import ProjectTypes from "../modules/Projects/Submodules/ProjectType/ProjectTypes";

// Importar módulo para Inversiones (para el rol usuario)
// Asegúrate de que el archivo exista en la ruta indicada y tenga export default
import Investments from "../modules/Inversiones/Inversiones";

// Registrar los módulos disponibles (las claves deben coincidir EXACTAMENTE con los valores en Permissions)
const Modules = {
  DashboardAdmin,
  DashboardCreator,
  DashboardUser,
  Users,
  ProjectsAdmin,
  ProjectsCreator,
  ProjectsUser,
  Tickets,
  Notifications,
  ProjectCategories,
  ProjectTypes,
  Investments,
};

const { Content } = Layout;

const MainView = () => {
  const { roles } = useContext(AuthContext);

  const userModules = roles
    .flatMap((role) => Permissions[role] || [])
    .filter((mod, index, self) =>
      self.findIndex((m) => m.name === mod.name) === index
    );

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/";
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar links={userModules} onLogout={handleLogout} />
      <Layout style={{ marginLeft: 0 }}>
        <Header
          username="Usuario Ejemplo"
          profilePic={null}
          onLogout={handleLogout}
          style={{
            width: "calc(100% - 200px)",
            backgroundColor: "#001529",
            height: "64px",
            lineHeight: "64px",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 200,
            zIndex: 1000,
          }}
        />
        <Content
          style={{
            marginTop: "20px",
            marginLeft: "24px",
            marginRight: "24px",
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            overflowY: "auto",
            height: "calc(100vh - 90px)",
          }}
        >
          <Routes>
            {userModules.map((module, index) => {
              const Component = Modules[module.component];
              return (
                <Route
                  key={index}
                  path={module.path}
                  element={<Component />}
                />
              );
            })}
            {/* Rutas específicas para submódulos de Proyectos */}
            <Route path="/projects/categories" element={<ProjectCategories />} />
            <Route path="/projects/types" element={<ProjectTypes />} />
            {/* Ruta predeterminada */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainView;
