import React, { useContext } from "react";
import { Layout } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; 
import Header from "../components/Header";   
import { AuthContext } from "../auth/AuthContext";
import { Permissions } from "../auth/Permissions";

// Importar módulos
import Dashboard from "../modules/Dashboard/Dashboard";
import Projects from "../modules/Projects/Projects";
import Users from "../modules/Users/Users";
import Tickets from "../modules/Tickets/Tickets";
import Notifications from "../modules/Notifications/Notifications";

// Importar submódulos de proyectos
import ProjectCategories from "../modules/Projects/Submodules/ProjectCategory/ProjectCategories";
import ProjectTypes from "../modules/Projects/Submodules/ProjectType/ProjectTypes";

// Registrar los módulos disponibles
const Modules = { 
  Dashboard, 
  Projects, 
  Users, 
  Tickets, 
  Notifications,
  ProjectCategories, 
  ProjectTypes 
};

const { Content } = Layout;

const MainView = () => {
  const { roles } = useContext(AuthContext);

  // Obtener módulos según los permisos del rol
  const userModules = roles
    .flatMap((role) => Permissions[role] || [])
    .filter((mod, index, self) => 
      self.findIndex((m) => m.name === mod.name) === index
    ); 

  console.log("Roles actuales:", roles);
  console.log("Módulos disponibles:", userModules);

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.href = "/";
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Sidebar fijo */}
      <Sidebar links={userModules} onLogout={handleLogout} />

      {/* Contenedor principal con Header fijo */}
      <Layout style={{ marginLeft: 0 }}>
        
        {/* Header alineado al Sidebar */}
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
            zIndex: 1000 
          }}
        />

        {/* Contenido principal con margen y estilos optimizados */}
        <Content 
          style={{ 
            marginTop: "70px", 
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
              return <Route key={index} path={module.path} element={<Component />} />;
            })}
            
            {/* Rutas específicas para categorías y tipos de proyectos */}
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
