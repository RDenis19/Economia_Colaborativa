// src/modules/Dashboard/UserDashboard.js

import React from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Statistic,
  Divider,
  Tag,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const UserDashboard = () => {

  const totalProjects = 12; // Proyectos publicados por el usuario
  const totalInvestment = 74500; // Dinero total invertido o recaudado
  const topProjects = [
    {
      id: 1,
      name: "Proyecto Solar",
      category: "Medio Ambiente",
      raised: 30000,
    },
    {
      id: 2,
      name: "Educación Rural",
      category: "Educación",
      raised: 25000,
    },
    {
      id: 3,
      name: "Salud para Todos",
      category: "Salud",
      raised: 20000,
    },
  ];

  // Tabla de proyectos más exitosos
  // (Podrías traerlos de una API y filtrar los top 5, por ejemplo)
  const columnsTopProjects = [
    {
      title: "Proyecto",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Categoría",
      dataIndex: "category",
      key: "category",
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    {
      title: "Recaudación",
      dataIndex: "raised",
      key: "raised",
      render: (val) => `$${val.toLocaleString()}`,
    },
  ];

  // Datos para la gráfica de pastel (demanda o tipos de proyecto)
  const pieData = [
    { name: "Educación", value: 40 },
    { name: "Salud", value: 25 },
    { name: "Medio Ambiente", value: 20 },
    { name: "Tecnología", value: 10 },
    { name: "Otros", value: 5 },
  ];
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F", "#A28EEC"];

  // Datos para la gráfica de barras (ej. inversores por categoría)
  const barData = [
    { category: "Educación", investors: 120 },
    { category: "Salud", investors: 90 },
    { category: "Medio Ambiente", investors: 75 },
    { category: "Tecnología", investors: 50 },
    { category: "Otros", investors: 30 },
  ];

  // ===========================
  // 2. RENDER DEL COMPONENTE
  // ===========================
  return (
    <div style={{ padding: 24 }}>
      <h2>Dashboard de Usuario</h2>

      {/* FILA DE TARJETAS (MÉTRICAS PRINCIPALES) */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {/* Proyectos Publicados */}
        <Col xs={24} sm={12} md={6}>
          <Card style={{ borderRadius: 6 }}>
            <Statistic
              title="Proyectos Publicados"
              value={totalProjects}
              prefix={<RocketOutlined />}
            />
          </Card>
        </Col>
        {/* Total Invertido */}
        <Col xs={24} sm={12} md={6}>
          <Card style={{ borderRadius: 6 }}>
            <Statistic
              title="Total Invertido"
              value={totalInvestment}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        {/* Crecimiento mensual (ejemplo) */}
        <Col xs={24} sm={12} md={6}>
          <Card style={{ borderRadius: 6 }}>
            <Statistic
              title="Crecimiento Mensual"
              value={12.5}
              precision={1}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        {/* Disminución en gastos (ejemplo) */}
        <Col xs={24} sm={12} md={6}>
          <Card style={{ borderRadius: 6 }}>
            <Statistic
              title="Gastos Operativos"
              value={8.3}
              precision={1}
              prefix={<ArrowDownOutlined />}
              suffix="%"
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      {/* FILA CON TABLA DE TOP PROYECTOS + GRÁFICA DE PASTEL */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card style={{ borderRadius: 6 }} title="Proyectos más exitosos">
            <Table
              columns={columnsTopProjects}
              dataSource={topProjects}
              rowKey="id"
              pagination={false}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ borderRadius: 6 }} title="Demanda por Tipo de Proyecto">
            <div style={{ width: "100%", height: 300 }}>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </div>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* FILA CON GRÁFICA DE BARRAS (INVERSORES POR CATEGORÍA) */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card style={{ borderRadius: 6 }} title="Inversionistas por Categoría">
            <div style={{ width: "100%", height: 300 }}>
              <BarChart width={500} height={300} data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="investors" fill="#8884d8" />
              </BarChart>
            </div>
          </Card>
        </Col>
        {/* Podrías agregar otra gráfica, o un Card con más info */}
        <Col xs={24} md={12}>
          <Card style={{ borderRadius: 6 }} title="Otra métrica que te interese">
            <p>
              Aquí podrías poner cualquier otra estadística, otra gráfica o
              una tabla adicional.
            </p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
