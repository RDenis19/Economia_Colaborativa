import React from "react";
import { Card, Row, Col, Progress, Table, Typography, Button } from "antd";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const Dashboard = () => {
  // Datos para los totales
  const totalsData = [
    { title: "Total Invertido", value: "$50,000" },
    { title: "Proyectos Invertidos", value: 38 },
    { title: "Ganancias", value: "$25,000" },
  ];

  // Datos para el gráfico de categorías
  const categoriasData = [
    { name: "Impacto Social", value: 40, color: "#8884d8" },
    { name: "Sostenibilidad", value: 30, color: "#82ca9d" },
    { name: "Innovación", value: 30, color: "#ffc658" },
  ];

  // Datos de proyectos recientes
  const proyectosRecientes = [
    {
      key: "1",
      titulo: "Desarrollo Energía Solar Comunitaria",
      lugar: "Valle Central, Loja",
      duracion: "12 meses",
      progreso: 45,
      recaudado: "$17,000 / $25,000",
      categoria: "Tecnológico",
      inicio: "01/09/2023",
    },
    {
      key: "2",
      titulo: "Rifa Comunitaria",
      lugar: "Mérfis, Loja",
      duracion: "24 meses",
      progreso: 30,
      recaudado: "$7,500 / $25,000",
      categoria: "Solidario",
      inicio: "01/09/2023",
    },
  ];

  // Datos para la tabla de transacciones
  const transaccionesData = Array(3).fill({
    fecha: "2024-01-15 11:30 am",
    proyecto: "Huerto Urbano Comunitario",
    inversionista: "Juan Pérez",
    tipo: "Inversión",
    monto: "$500.00",
    metodo: "Transferencia",
    estado: "Completado",
  });

  const transaccionesColumns = [
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Nombre Proyecto", dataIndex: "proyecto", key: "proyecto" },
    { title: "Inversionista", dataIndex: "inversionista", key: "inversionista" },
    { title: "Tipo de Transacción", dataIndex: "tipo", key: "tipo" },
    { title: "Monto", dataIndex: "monto", key: "monto" },
    { title: "Método de Pago", dataIndex: "metodo", key: "metodo" },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) => (
        <span style={{ color: estado === "Completado" ? "green" : "red" }}>
          {estado}
        </span>
      ),
    },
    {
      title: "Acción",
      render: () => (
        <Button type="primary">Detalles</Button>
      ),
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

      {/* Proyectos Recientes y Categorías */}
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Proyectos Recientes" bordered={false}>
            {proyectosRecientes.map((proyecto) => (
              <Card
                key={proyecto.key}
                style={{ marginBottom: "20px" }}
                bordered={false}
              >
                <Typography.Title level={5}>
                  {proyecto.titulo}
                </Typography.Title>
                <p>
                  <strong>Ubicación:</strong> {proyecto.lugar} |{" "}
                  <strong>Duración:</strong> {proyecto.duracion}
                </p>
                <p>
                  <strong>Inicio:</strong> {proyecto.inicio} |{" "}
                  <strong>Progreso:</strong>{" "}
                  <Progress
                    percent={proyecto.progreso}
                    size="small"
                    status="active"
                  />
                </p>
                <p>
                  <strong>Recaudado:</strong> {proyecto.recaudado} |{" "}
                  <strong>Categoría:</strong> {proyecto.categoria}
                </p>
              </Card>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Categorías de Proyectos Invertidos" bordered={false}>
            <PieChart width={300} height={200}>
              <Pie
                data={categoriasData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
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
            <Table
              dataSource={transaccionesData}
              columns={transaccionesColumns}
              pagination={false}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
