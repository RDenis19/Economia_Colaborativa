import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Layout } from "antd";
import {
  HomeOutlined,
  FileSearchOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

function PrestatarioLayout({ children }) {
  const prestatarioLinks = [
    {
      label: "Dashboard",
      to: "/prestatario/dashboard",
      icon: <HomeOutlined />,
    },
    {
      label: "Seguimiento",
      to: "/prestatario/seguimiento",
      icon: <FileSearchOutlined />,
    },
    {
      label: "Proyectos",
      to: "/prestatario/proyectos",
      icon: <ProjectOutlined />,
    },
  ];

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar links={prestatarioLinks} />
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Header
          username="Prestatario"
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

export default PrestatarioLayout;
