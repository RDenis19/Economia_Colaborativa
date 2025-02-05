// src/components/Sidebar.js
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

  // Definir iconos para cada módulo
  const iconMap = {
    Dashboard: <HomeOutlined />,
    Usuarios: <UserOutlined />,
    Proyectos: <ProjectOutlined />,
    Tickets: <MessageOutlined />,
    Inversiones: <ProjectOutlined />,
    Notificaciones: <NotificationOutlined />,
  };

  // Crear los items del menú dinámicamente:
  // Si el objeto "link" tiene la propiedad subMenu, se muestran sus children; de lo contrario, se muestra solo el item principal.
  const menuItems = links.map((link) => {
    if (link.subMenu) {
      // Solo el administrador tendrá definido la propiedad subMenu en "Proyectos"
      return {
        key: link.path,
        icon: iconMap[link.name] || null,
        label: <NavLink to={link.path}>{link.name}</NavLink>,
        children: link.subMenu.map((sub) => ({
          key: sub.path,
          icon: <FolderOpenOutlined />,
          label: <NavLink to={sub.path}>{sub.name}</NavLink>,
        })),
      };
    } else {
      return {
        key: link.path,
        icon: iconMap[link.name] || null,
        label: <NavLink to={link.path}>{link.name}</NavLink>,
      };
    }
  });

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapse}
      theme="dark"
    >
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
