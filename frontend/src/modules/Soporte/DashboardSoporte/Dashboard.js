import React from "react";
import { Card, Row, Col, Typography } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  // Datos para los totales
  const totalsData = [
    { title: "Proyectos Pendientes", value: 39 },
    { title: "Tickets Pendientes", value: 59 },
    { title: "Alertas", value: 28 },
  ];

  // Datos para el gráfico de líneas
  const usuariosActivosData = [
    { dia: "1", diciembre: 3000, noviembre: 2500, octubre: 2000 },
    { dia: "2", diciembre: 3200, noviembre: 2700, octubre: 2100 },
    { dia: "3", diciembre: 3500, noviembre: 3000, octubre: 2300 },
    { dia: "4", diciembre: 3700, noviembre: 3300, octubre: 2500 },
    { dia: "5", diciembre: 4000, noviembre: 3500, octubre: 2800 },
  ];

  // Datos para el gráfico de pastel
  const proyectosTicketsData = [
    { name: "Proyectos", value: 70, color: "#8884d8" },
    { name: "Tickets", value: 30, color: "#82ca9d" },
  ];

  return (
    <div style={{ padding: "20px", background: "#f6f6f6" }}>

      {/* Totales */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        {totalsData.map((item, index) => (
          <Col span={8} key={index}>
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                height: "80px", // Ajustar altura
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography.Text style={{ fontSize: "16px" }}>
                {item.title}
              </Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>
                {item.value}
              </Typography.Title>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Usuarios Activos y Proyectos vs Tickets */}
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Usuarios Activos" bordered={false}>
            <LineChart
              width={600}
              height={300}
              data={usuariosActivosData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="diciembre" stroke="#8884d8" name="Diciembre" />
              <Line type="monotone" dataKey="noviembre" stroke="#82ca9d" name="Noviembre" />
              <Line type="monotone" dataKey="octubre" stroke="#ffc658" name="Octubre" />
            </LineChart>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Proyectos y Tickets" bordered={false}>
            <PieChart width={300} height={300}>
              <Pie
                data={proyectosTicketsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {proyectosTicketsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
