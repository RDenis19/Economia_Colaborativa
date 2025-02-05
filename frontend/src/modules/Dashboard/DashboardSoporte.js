// C:\Users\HP\Desktop\Economia_Colaborativa\frontend\src\modules\Dashboard\DashboardSoporte.js

import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Tag,
  Button,
  Divider,
  Space,
  Progress,
  List,
  Avatar
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PhoneOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  DollarOutlined
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// =================================================
// Función para obtener ícono y color según el tipo
// =================================================
const getNotificationAvatar = (tipo) => {
  switch (tipo) {
    case "warning":
      return {
        icon: <FileTextOutlined />,
        color: "#faad14",
      };
    case "success":
      return {
        icon: <DollarOutlined />,
        color: "#52c41a",
      };
    case "info":
      return {
        icon: <FileDoneOutlined />,
        color: "#1890ff",
      };
    default:
      return {
        icon: <FileDoneOutlined />,
        color: "#1890ff",
      };
  }
};

// =================================================
// Estilos básicos para Cards y List
// =================================================
const cardStyle = {
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  marginBottom: 20,
};

const DashboardSoporte = () => {
  // 1) PROYECTOS PENDIENTES DE VERIFICACIÓN
  const columnsVerificacion = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Proyecto", dataIndex: "nombre", key: "nombre" },
    { title: "Creador", dataIndex: "creador", key: "creador" },
    { title: "Categoría", dataIndex: "categoria", key: "categoria" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    {
      title: "Acciones",
      key: "acciones",
      render: (record) => (
        <Space>
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => handleAprobarProyecto(record.id)}
          >
            Aprobar
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => handleRechazarProyecto(record.id)}
          >
            Rechazar
          </Button>
        </Space>
      ),
    },
  ];

  const [proyectosPendientes] = useState([
    {
      key: 1,
      id: "P-101",
      nombre: "Reciclaje Comunitario",
      creador: "Juan Pérez",
      categoria: "Sostenibilidad",
      fecha: "2025-02-01",
    },
    {
      key: 2,
      id: "P-102",
      nombre: "Educación Rural",
      creador: "María Flores",
      categoria: "Educación",
      fecha: "2025-02-02",
    },
  ]);

  // 2) TICKETS DE SOPORTE
  const columnsTickets = [
    { title: "Ticket ID", dataIndex: "ticketId", key: "ticketId" },
    { title: "Usuario", dataIndex: "usuario", key: "usuario" },
    { title: "Asunto", dataIndex: "asunto", key: "asunto" },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) => {
        let color = "green";
        if (estado === "Abierto") color = "volcano";
        if (estado === "En Proceso") color = "blue";
        return <Tag color={color}>{estado}</Tag>;
      },
    },
    {
      title: "Prioridad",
      dataIndex: "prioridad",
      key: "prioridad",
      render: (prioridad) => {
        let color = "geekblue";
        if (prioridad === "Alta") color = "red";
        return <Tag color={color}>{prioridad}</Tag>;
      },
    },
    { title: "Creado", dataIndex: "fechaCreacion", key: "fechaCreacion" },
    {
      title: "Acción",
      key: "accion",
      render: (record) => (
        <Button type="link" onClick={() => handleVerTicket(record.ticketId)}>
          Ver Detalles
        </Button>
      ),
    },
  ];

  const [ticketsSoporte] = useState([
    {
      key: 1,
      ticketId: "T-1001",
      usuario: "Carlos Rojas",
      asunto: "Problema al cargar documentos",
      estado: "Abierto",
      prioridad: "Alta",
      fechaCreacion: "2025-01-25",
    },
    {
      key: 2,
      ticketId: "T-1002",
      usuario: "Lucía Santos",
      asunto: "No puedo ver mi historial de donaciones",
      estado: "En Proceso",
      prioridad: "Media",
      fechaCreacion: "2025-01-28",
    },
    {
      key: 3,
      ticketId: "T-1003",
      usuario: "Rolando Ruiz",
      asunto: "Necesito cambiar método de pago",
      estado: "Abierto",
      prioridad: "Baja",
      fechaCreacion: "2025-02-01",
    },
  ]);

  // 3) LLAMADAS/CONTACTOS (Simulación de llamadas de soporte)
  const columnsLlamadas = [
    { title: "ID Llamada", dataIndex: "callId", key: "callId" },
    { title: "Usuario", dataIndex: "usuario", key: "usuario" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Duración (min)", dataIndex: "duracion", key: "duracion" },
    {
      title: "Resolución",
      dataIndex: "resolucion",
      key: "resolucion",
      render: (res) => (
        <Tag color={res === "Resuelto" ? "green" : "orange"}>{res}</Tag>
      ),
    },
  ];

  const [llamadasSoporte] = useState([
    {
      key: 1,
      callId: "C-2001",
      usuario: "Diego Armando",
      fecha: "2025-02-01 09:30",
      duracion: 12,
      resolucion: "Resuelto",
    },
    {
      key: 2,
      callId: "C-2002",
      usuario: "Marisol Fernández",
      fecha: "2025-02-01 10:15",
      duracion: 7,
      resolucion: "Pendiente",
    },
  ]);

  // 4) GRÁFICA DE INCIDENCIAS (Distribución por categoría)
  const dataIncidencias = [
    { name: "Pago", value: 40 },
    { name: "Documentación", value: 25 },
    { name: "Cuenta", value: 20 },
    { name: "Otros", value: 15 },
  ];
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

  // 5) NOTIFICACIONES (ejemplo más resumido)
  const [notificaciones] = useState([
    {
      id: 1,
      titulo: "Nuevo Proyecto Enviado",
      tipo: "info",
      mensaje:
        "El proyecto 'Campaña de Agua Limpia' fue enviado para revisión por Juan Pérez.",
      fecha: "04/02/2025 20:40",
    },
    {
      id: 2,
      titulo: "Meta Alcanzada",
      tipo: "success",
      mensaje:
        "El proyecto 'Tecnología para Todos' alcanzó el 100% de su meta de financiamiento.",
      fecha: "04/02/2025 19:40",
    },
  ]);

  // ======================
  // HANDLERS (Simulados)
  // ======================
  const handleAprobarProyecto = (id) => {
    alert(`Proyecto ${id} Aprobado`);
  };
  const handleRechazarProyecto = (id) => {
    alert(`Proyecto ${id} Rechazado`);
  };
  const handleVerTicket = (ticketId) => {
    alert(`Detalles del Ticket: ${ticketId}`);
  };

  return (
    <div style={{ padding: 20, background: "#f5f7fa" }}>
      {/* NOTIFICACIONES (resumidas) */}
      <Card
        title={<strong>Notificaciones</strong>}
        style={cardStyle}
        bodyStyle={{ padding: 16 }}
      >
        <List
          itemLayout="horizontal"
          dataSource={notificaciones}
          renderItem={(notif) => {
            const { icon, color } = getNotificationAvatar(notif.tipo);
            return (
              <List.Item
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 4,
                  marginBottom: 8,
                  border: "1px solid #f0f0f0",
                }}
                actions={[
                  <Button type="link" size="small">
                    Ver
                  </Button>,
                  <Button type="link" size="small" danger>
                    Eliminar
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ backgroundColor: color, color: "#fff" }}>
                      {icon}
                    </Avatar>
                  }
                  title={<strong>{notif.titulo}</strong>}
                  description={notif.mensaje}
                />
                <div style={{ fontSize: 12, color: "gray" }}>{notif.fecha}</div>
              </List.Item>
            );
          }}
        />
      </Card>

      {/* PROYECTOS PENDIENTES DE VERIFICACIÓN */}
      <Card
        title={<strong>Proyectos Pendientes de Verificación</strong>}
        style={cardStyle}
      >
        <Table
          columns={columnsVerificacion}
          dataSource={proyectosPendientes}
          pagination={false}
          rowKey="key"
          size="small"
        />
      </Card>

      {/* TICKETS DE SOPORTE */}
      <Card title={<strong>Tickets de Soporte</strong>} style={cardStyle}>
        <Table
          columns={columnsTickets}
          dataSource={ticketsSoporte}
          pagination={{ pageSize: 4 }}
          rowKey="key"
          size="small"
        />
      </Card>

      {/* LLAMADAS RECIENTES */}
      <Card
        title={
          <Space>
            <PhoneOutlined />
            <strong>Llamadas Recientes</strong>
          </Space>
        }
        style={cardStyle}
      >
        <Table
          columns={columnsLlamadas}
          dataSource={llamadasSoporte}
          pagination={false}
          rowKey="key"
          size="small"
        />
      </Card>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          {/* GRÁFICA: DISTRIBUCIÓN DE INCIDENCIAS */}
          <Card
            title={
              <Space>
                <FileDoneOutlined />
                <strong>Distribución de Incidencias</strong>
              </Space>
            }
            style={cardStyle}
          >
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={dataIncidencias}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {dataIncidencias.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>

        {/* INDICADOR DE PROGRESO (SIMULANDO SLA u OTRO MÉTRICA) */}
        <Col xs={24} md={12}>
          <Card
            title={<strong>Indicador de Nivel de Servicio (SLA)</strong>}
            style={cardStyle}
          >
            <p>
              <strong>Casos resueltos este mes:</strong> 75%
            </p>
            <Progress percent={75} status="active" />
            <Divider />
            <p>
              <strong>Tiempo promedio de respuesta:</strong> 40 min
            </p>
            <Progress
              percent={40}
              format={(p) => `${p} min`}
              strokeColor="orange"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardSoporte;
