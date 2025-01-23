import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { NavLink } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Sidebar({ links = [], onLogout }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapse}>
      <div style={{ padding: "16px", textAlign: "center", color: "white" }}>
        {!collapsed && <h1 style={{ color: "white", margin: 0 }}>CoFinance</h1>}
      </div>
      <Menu theme="dark" mode="inline">
        {links.map((link) =>
          link.subMenu ? (
            <SubMenu key={link.label} icon={link.icon} title={link.label}>
              {link.subMenu.map((subLink) => (
                <Menu.Item key={subLink.to}>
                  <NavLink to={subLink.to}>{subLink.label}</NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          ) : (
            <Menu.Item key={link.to} icon={link.icon}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </Menu.Item>
          )
        )}
      </Menu>
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Button type="primary" icon={<LogoutOutlined />} onClick={onLogout}>
          {!collapsed && "Cerrar Sesión"}
        </Button>
      </div>
    </Sider>
  );
}

export default Sidebar;
