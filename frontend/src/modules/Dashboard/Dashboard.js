import React from "react";
import { Card, Row, Col, Statistic, Table, Tag, Button } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const summaryData = [
    { title: "Recaudación", value: "$50,000", icon: <DollarOutlined /> },
    { title: "Usuarios Totales", value: "38", icon: <UserOutlined /> },
    { title: "Número de Proyectos", value: "$25,000", icon: <UserOutlined /> },
  ];

  // Datos para la gráfica de líneas
  const lineData = [
    { month: "Ene", "Mes Pasado": 12000, "Mes Actual": 18000 },
    { month: "Feb", "Mes Pasado": 15000, "Mes Actual": 17000 },
    { month: "Mar", "Mes Pasado": 14000, "Mes Actual": 21000 },
  ];

  // Datos para la gráfica de pastel
  const pieData = [
    { name: "Impacto Social", value: 40 },
    { name: "Sostenibilidad", value: 35 },
    { name: "Innovación", value: 25 },
  ];

  // Colores para el gráfico de pastel
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const columns = [
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Nombre Proyecto", dataIndex: "proyecto", key: "proyecto" },
    {
      title: "Legitimidad",
      dataIndex: "legitimidad",
      key: "legitimidad",
      render: (status) => (
        <Tag color={status === "Aceptado" ? "green" : "red"}>{status}</Tag>
      ),
    },
    { title: "Total de Inversores", dataIndex: "inversores", key: "inversores" },
    { title: "Monto", dataIndex: "monto", key: "monto" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    {
      title: "Acción",
      key: "accion",
      render: () => <Button type="primary">Detalles</Button>,
    },
  ];

  const dataSource = [
    {
      key: "1",
      fecha: "2024-01-15 11:30 am",
      proyecto: "Huerto Urbano Comunitario",
      legitimidad: "Aceptado",
      inversores: 14,
      monto: "$500.00",
      descripcion:
        "Con tu inversión, ayudamos a jóvenes emprendedores a superar desafíos económicos y crecer",
    },
    {
      key: "2",
      fecha: "2024-01-15 11:30 am",
      proyecto: "Huerto Urbano Comunitario",
      legitimidad: "Rechazado",
      inversores: 14,
      monto: "$500.00",
      descripcion:
        "Con tu inversión, ayudamos a jóvenes emprendedores a superar desafíos económicos y crecer",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={16}>
        {summaryData.map((item, index) => (
          <Col span={8} key={index}>
            <Card>
              <Statistic title={item.title} value={item.value} prefix={item.icon} />
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={12}>
          <Card title="Monto recaudado">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Mes Pasado" stroke="#8884d8" />
                <Line type="monotone" dataKey="Mes Actual" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Categorías de Proyectos Invertidos">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Card title="Inversiones Recientes" style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Card>
    </div>
  );
};

export default Dashboard;
