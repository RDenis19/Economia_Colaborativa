import React from "react";
import { Card, Row, Col, Statistic, Table, Tag, Button } from "antd";
import { Line } from "@ant-design/charts";
import { Pie } from "@ant-design/plots";
import { UserOutlined, DollarOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const summaryData = [
    { title: "Recaudación", value: "$50,000", icon: <DollarOutlined /> },
    { title: "Usuarios Totales", value: "38", icon: <UserOutlined /> },
    { title: "Número de Proyectos", value: "$25,000", icon: <UserOutlined /> },
  ];

  const lineConfig = {
    data: [
      { month: "Ene", value: 12000, category: "Mes Pasado" },
      { month: "Feb", value: 15000, category: "Mes Pasado" },
      { month: "Mar", value: 14000, category: "Mes Pasado" },
      { month: "Ene", value: 18000, category: "Mes Actual" },
      { month: "Feb", value: 17000, category: "Mes Actual" },
      { month: "Mar", value: 21000, category: "Mes Actual" },
    ],
    xField: "month",
    yField: "value",
    seriesField: "category",
    smooth: true,
  };

  const pieConfig = {
    data: [
      { type: "Impacto Social", value: 40 },
      { type: "Sostenibilidad", value: 35 },
      { type: "Innovación", value: 25 },
    ],
    angleField: "value",
    colorField: "type",
  };

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
        <Col span={12}><Card title="Monto recaudado"><Line {...lineConfig} /></Card></Col>
        <Col span={12}><Card title="Categorías de Proyectos Invertidos"><Pie {...pieConfig} /></Card></Col>
      </Row>
      <Card title="Inversiones Recientes" style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      </Card>
    </div>
  );
};

export default Dashboard;
