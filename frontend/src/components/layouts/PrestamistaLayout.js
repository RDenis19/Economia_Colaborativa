import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import {
  HomeOutlined,
  EyeOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

function PrestamistaLayout({ children }) {
  const prestamistaLinks = [
    {
      label: "Dashboard",
      to: "/prestamista/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: "Seguimiento",
      to: "/prestamista/seguimiento",
      icon: <EyeOutlined />,
    },
    {
      label: "Proyectos",
      to: "/prestamista/proyectos",
      icon: <ProjectOutlined />,
    },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar links={prestamistaLinks} />
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Header
          username="Prestamista"
          profilePic="https://via.placeholder.com/40"
        />
        <Content
          style={{
            margin: "16px",
            padding: 24,
            background: "#fff",
            borderRadius: "8px",
            overflowY: "auto", 
            height: "calc(100vh - 64px - 32px)", 
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default PrestamistaLayout;
