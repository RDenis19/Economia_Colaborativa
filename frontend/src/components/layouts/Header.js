import React from "react";
import { Layout, Avatar, Badge, Typography, Row, Col } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

function Header({ username, profilePic }) {
  return (
    <AntHeader
      style={{
        backgroundColor: "#001529",
        padding: "0 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px", // Fija la altura del encabezado
        lineHeight: "64px",
      }}
    >
      <Row align="middle" style={{ color: "white" }}>
        <Text style={{ fontSize: "16px", color: "#fff" }}>
          Bienvenido, <span style={{ fontWeight: "bold" }}>{username}</span>
        </Text>
      </Row>
      <Row align="middle" gutter={16}>
        <Col>
          <Badge count={5} offset={[10, 0]}>
            <BellOutlined style={{ fontSize: "18px", color: "#fff" }} />
          </Badge>
        </Col>
        <Col>
          <Avatar
            src={profilePic || null}
            icon={!profilePic && <UserOutlined />}
            style={{ backgroundColor: "#1890ff" }}
          />
        </Col>
      </Row>
    </AntHeader>

  );
}

export default Header;
