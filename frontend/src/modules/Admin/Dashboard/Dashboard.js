import React from "react";
import { Card, Row, Col, Table} from "antd";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Dashboard = () => {
  // Datos para gráficos
  const nuevosUsuariosData = [
    { mes: "Jun", usuarios: 200 },
    { mes: "Jul", usuarios: 400 },
    { mes: "Ago", usuarios: 600 },
    { mes: "Sep", usuarios: 800 },
    { mes: "Oct", usuarios: 700 },
    { mes: "Nov", usuarios: 900 },
    { mes: "Dic", usuarios: 1000 },
  ];

  const montoInvertidoData = [
    { mes: "Jan", monto: 100000 },
    { mes: "Feb", monto: 300000 },
    { mes: "Mar", monto: 500000 },
    { mes: "Apr", monto: 700000 },
    { mes: "May", monto: 400000 },
    { mes: "Jun", monto: 800000 },
    { mes: "Jul", monto: 1000000 },
  ];

  const categoriasProyectosData = [
    { name: "Cultura y Creatividad", value: 10 },
    { name: "Tecnología Social", value: 15 },
    { name: "Energías Renovables", value: 30 },
    { name: "Agricultura Sostenible", value: 25 },
    { name: "Educación Comunitaria", value: 20 },
  ];

  const coloresPie = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#ffbb28"];

  const tableData = [
    {
      key: "1",
      id: "INV-004",
      nombre: "Red de Reciclaje Inteligente",
      usuarios: "12 Usuarios",
      recaudado: "$15,000",
      tipo: "Tipo de Proyecto",
      categoria: "Categoría del Proyecto",
    },
  ];

  const tableColumns = [
    {
      title: "ID Proyecto",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre del Proyecto",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Usuarios Invertidos",
      dataIndex: "usuarios",
      key: "usuarios",
    },
    {
      title: "Monto Recaudado",
      dataIndex: "recaudado",
      key: "recaudado",
    },
    {
      title: "Tipo de Proyecto",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Categoría del Proyecto",
      dataIndex: "categoria",
      key: "categoria",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Nuevos Usuarios" bordered={false}>
            <LineChart
              width={300}
              height={200}
              data={nuevosUsuariosData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="usuarios" stroke="#8884d8" />
            </LineChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Monto Invertido" bordered={false}>
            <LineChart
              width={300}
              height={200}
              data={montoInvertidoData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="monto" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Card title="Categorías de Proyectos" bordered={false}>
            <PieChart width={300} height={200}>
              <Pie
                data={categoriasProyectosData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {categoriasProyectosData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={coloresPie[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Proyectos Activos" bordered={false}>
            <BarChart
              width={300}
              height={200}
              data={nuevosUsuariosData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="usuarios" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Proyectos">
            <Table dataSource={tableData} columns={tableColumns} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
