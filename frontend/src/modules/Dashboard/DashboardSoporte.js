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
  List,
  Avatar,
  Tooltip,
  Space,
  Progress,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  PhoneOutlined,
  FileDoneOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ======================
// COMPONENTE PRINCIPAL
// ======================
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
    { title: "Estado", dataIndex: "estado", key: "estado",
      render: (estado) => {
        let color = "green";
        if (estado === "Abierto") color = "volcano";
        if (estado === "En Proceso") color = "blue";
        return <Tag color={color}>{estado}</Tag>;
      }
    },
    { title: "Prioridad", dataIndex: "prioridad", key: "prioridad",
      render: (prioridad) => {
        let color = "geekblue";
        if (prioridad === "Alta") color = "red";
        return <Tag color={color}>{prioridad}</Tag>;
      }
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
  // Podrías tener incidencias: Pago, Documentación, Cuenta, Otros
  const dataIncidencias = [
    { name: "Pago", value: 40 },
    { name: "Documentación", value: 25 },
    { name: "Cuenta", value: 20 },
    { name: "Otros", value: 15 },
  ];
  const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F"];

  // 5) NOTIFICACIONES
  const [notificaciones] = useState([
    {
      id: 1,
      tipo: "warning",
      mensaje: "Proyecto #123 reportado por 3 usuarios",
    },
    {
      id: 2,
      tipo: "info",
      mensaje: "Límite de recaudación alcanzado en #245",
    },
    {
      id: 3,
      tipo: "success",
      mensaje: "Proyecto #202 verificado con éxito",
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
    <div style={{ padding: 20 }}>

      {/* PROYECTOS PENDIENTES DE VERIFICACIÓN */}
      <Card title="Proyectos Pendientes de Verificación" style={{ marginBottom: 20 }}>
        <Table
          columns={columnsVerificacion}
          dataSource={proyectosPendientes}
          pagination={false}
          rowKey="key"
        />
      </Card>

      {/* TICKETS DE SOPORTE */}
      <Card title="Tickets de Soporte" style={{ marginBottom: 20 }}>
        <Table
          columns={columnsTickets}
          dataSource={ticketsSoporte}
          pagination={{ pageSize: 4 }}
          rowKey="key"
        />
      </Card>

      {/* LLAMADAS RECIENTES */}
      <Card
        title={
          <Space>
            <PhoneOutlined />
            Llamadas Recientes
          </Space>
        }
        style={{ marginBottom: 20 }}
      >
        <Table
          columns={columnsLlamadas}
          dataSource={llamadasSoporte}
          pagination={false}
          rowKey="key"
        />
      </Card>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          {/* GRÁFICA: DISTRIBUCIÓN DE INCIDENCIAS */}
          <Card
            title={
              <Space>
                <FileDoneOutlined />
                Distribución de Incidencias
              </Space>
            }
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
          <Card title="Indicador de Nivel de Servicio (SLA)">
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
