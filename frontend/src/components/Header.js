import React from "react";
import { Layout, Avatar, Badge, Typography, Row, Col, Dropdown, Menu } from "antd";
import { BellOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

function Header({ username, profilePic, onLogout }) {
  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Perfil
      </Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />} onClick={onLogout}>
        Cerrar Sesión
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader
      style={{
        backgroundColor: "#001529",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        lineHeight: "64px",
      }}
    >
      {/* Bienvenida */}
      <Row align="middle" style={{ color: "white" }}>
        <Text style={{ fontSize: "16px", color: "#fff" }}>
          Bienvenido, <span style={{ fontWeight: "bold" }}>{username}</span>
        </Text>
      </Row>

      {/* Notificaciones y Avatar */}
      <Row align="middle" gutter={16}>
        <Col>
          <Badge count={5} offset={[10, 0]}>
            <BellOutlined style={{ fontSize: "18px", color: "#fff", cursor: "pointer" }} />
          </Badge>
        </Col>
        <Col>
          <Dropdown overlay={userMenu} placement="bottomRight" trigger={["click"]}>
            <Avatar
              src={profilePic || null}
              icon={!profilePic && <UserOutlined />}
              style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
            />
          </Dropdown>
        </Col>
      </Row>
    </AntHeader>
  );
}

export default Header;
