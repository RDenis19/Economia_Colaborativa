import React from "react";
import { Card, Row, Col, Table, Typography, Button } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const Dashboard = () => {
  // Datos de totales
  const totalsData = [
    { title: "Recaudación", value: "$50,000" },
    { title: "Usuarios Totales", value: 38 },
    { title: "Número de Proyectos", value: "$25,000" },
  ];

  // Datos para el gráfico de líneas
  const montoRecaudadoData = [
    { mes: "Ene", actual: 3000, pasado: 2000 },
    { mes: "Feb", actual: 4000, pasado: 3000 },
    { mes: "Mar", actual: 3500, pasado: 3200 },
    { mes: "Abr", actual: 5000, pasado: 4500 },
    { mes: "May", actual: 6000, pasado: 5500 },
    { mes: "Jun", actual: 7000, pasado: 6000 },
  ];

  // Datos para el gráfico de pastel
  const categoriasData = [
    { name: "Impacto Social", value: 40, color: "#8884d8" },
    { name: "Sostenibilidad", value: 30, color: "#82ca9d" },
    { name: "Innovación", value: 30, color: "#ffc658" },
  ];

  // Datos para la tabla
  const transaccionesData = [
    {
      key: "1",
      fecha: "2024-01-15 11:30 am",
      proyecto: "Huerto Urbano Comunitario",
      legitimidad: "Aceptado",
      inversores: 14,
      monto: "$500.00",
      descripcion: "Con tu inversión, ayudamos a jóvenes emprendedores a superar desafíos económicos y crecer",
    },
    {
      key: "2",
      fecha: "2024-01-15 11:30 am",
      proyecto: "Huerto Urbano Comunitario",
      legitimidad: "Rechazado",
      inversores: 14,
      monto: "$500.00",
      descripcion: "Con tu inversión, ayudamos a jóvenes emprendedores a superar desafíos económicos y crecer",
    },
  ];

  const transaccionesColumns = [
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Nombre Proyecto", dataIndex: "proyecto", key: "proyecto" },
    { title: "Legitimidad", dataIndex: "legitimidad", key: "legitimidad", render: (legitimidad) => (
        <span
          style={{
            padding: "5px 10px",
            borderRadius: "5px",
            color: "#fff",
            background: legitimidad === "Aceptado" ? "green" : "red",
          }}
        >
          {legitimidad}
        </span>
      ),
    },
    { title: "Total de Inversores", dataIndex: "inversores", key: "inversores" },
    { title: "Monto", dataIndex: "monto", key: "monto" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    {
      title: "Acción",
      render: () => <Button type="primary">Detalles</Button>,
    },
  ];

  return (
    <div style={{ padding: "20px", background: "#f6f6f6" }}>
        
      {/* Totales */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        {totalsData.map((item, index) => (
          <Col span={8} key={index}>
            <Card bordered={false} style={{ textAlign: "center" }}>
              <Typography.Title level={4}>{item.title}</Typography.Title>
              <Typography.Title level={3}>{item.value}</Typography.Title>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Monto Recaudado y Categorías */}
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Monto Recaudado" bordered={false}>
            <LineChart
              width={600}
              height={300}
              data={montoRecaudadoData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pasado" stroke="#8884d8" name="Mes Pasado" />
              <Line type="monotone" dataKey="actual" stroke="#82ca9d" name="Mes Actual" />
            </LineChart>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Categorías de Proyectos Invertidos" bordered={false}>
            <PieChart width={300} height={300}>
              <Pie
                data={categoriasData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoriasData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>
      </Row>

      {/* Tabla de transacciones */}
      <Row style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Transacciones Recientes" bordered={false}>
            <Table dataSource={transaccionesData} columns={transaccionesColumns} pagination={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
