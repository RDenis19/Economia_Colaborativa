import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { NavLink } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const { Sider } = Layout;

function Sidebar({ links = [], onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Crea los items del menú dinámicamente
  const menuItems = links.map((link) => ({
    key: link.to,
    icon: link.icon,
    label: <NavLink to={link.to}>{link.label}</NavLink>,
    children: link.subMenu?.map((subLink) => ({
      key: subLink.to,
      label: <NavLink to={subLink.to}>{subLink.label}</NavLink>,
    })),
  }));

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
      <div style={{ padding: "16px", textAlign: "center", color: "white" }}>
        {!collapsed && <h1 style={{ color: "white", margin: 0 }}>CoFinance</h1>}
      </div>
      <Menu theme="dark" mode="inline" items={menuItems} />
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button type="primary" icon={<LogoutOutlined />} onClick={onLogout}>
          {!collapsed && "Cerrar Sesión"}
        </Button>
      </div>
    </Sider>
  );
}

export default Sidebar;
