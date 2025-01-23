import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import {
  HomeOutlined,
  ProjectOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

function SoporteLayout({ children }) {
  const soporteLinks = [
    {
      label: "Dashboard",
      to: "/soporte/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: "Proyectos",
      to: "/soporte/proyectos",
      icon: <ProjectOutlined />,
    },
    {
      label: "Tickets",
      to: "/soporte/tickets",
      icon: <FileTextOutlined />,
    },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar links={soporteLinks} />
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Header
          username="Soporte"
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

export default SoporteLayout;
