import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { NavLink } from "react-router-dom";
import {
  LogoutOutlined,
  HomeOutlined,
  UserOutlined,
  ProjectOutlined,
  NotificationOutlined,
  MessageOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

function Sidebar({ links = [], onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Depurar los enlaces recibidos
  console.log("Enlaces de la barra lateral:", links);

  // Definir iconos para los módulos
  const iconMap = {
    Dashboard: <HomeOutlined />, 
    Usuarios: <UserOutlined />, 
    Proyectos: <ProjectOutlined />, 
    Tickets: <MessageOutlined />, 
    Notificaciones: <NotificationOutlined />,
  };

  // Crear los items del menú dinámicamente
  const menuItems = links.map((link) => {
    if (link.name === "Proyectos") {
      return {
        key: link.path,
        icon: iconMap[link.name],
        label: <NavLink to={link.path}>{link.name}</NavLink>,
        children: [
          {
            key: "/projects/categories",
            icon: <FolderOpenOutlined />,
            label: <NavLink to="/projects/categories">Categorías</NavLink>,
          },
          {
            key: "/projects/types",
            icon: <FolderOpenOutlined />,
            label: <NavLink to="/projects/types">Tipos de Proyecto</NavLink>,
          },
        ],
      };
    }
    return {
      key: link.path,
      icon: iconMap[link.name],
      label: <NavLink to={link.path}>{link.name}</NavLink>,
    };
  });

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse} theme="dark">
      <div style={{ padding: "16px", textAlign: "center", color: "white" }}>
        {!collapsed && <h1 style={{ color: "white", margin: 0 }}>CoFinance</h1>}
      </div>
      <Menu theme="dark" mode="inline" items={menuItems} />
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button
          type="primary"
          icon={<LogoutOutlined />}
          danger
          onClick={onLogout}
          style={{ width: "100%" }}
        >
          {!collapsed && "Cerrar Sesión"}
        </Button>
      </div>
    </Sider>
  );
}

export default Sidebar;
