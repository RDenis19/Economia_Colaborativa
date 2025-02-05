// C:\Users\HP\Desktop\Economia_Colaborativa\frontend\src\modules\Dashboard\DashboardAdmin.js

import React, { useState } from "react";
import {
  Tabs,
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Tag,
  Button,
  Space,
  Select,
  DatePicker,
  Divider,
  Tooltip as AntTooltip,
  Form,
  Input,
  Alert,
} from "antd";
import {
  UserOutlined,
  DollarOutlined,
  FundOutlined,
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import moment from "moment";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

/** 
 * DASHBOARD DE ADMINISTRADOR 
 * Varios apartados: 
 *  1. Resumen (gráficas, KPIs, inversiones recientes)
 *  2. Solicitudes de Aprobación
 *  3. Proyectos en Curso
 *  4. Soporte (Tickets)
 *  5. Usuarios
 *  6. Alertas/Notificaciones
 *  7. Historial/Auditoría
 *  8. Configuraciones
 */
const DashboardAdmin = () => {
  // ================================
  // MOCK DATA
  // ================================

  // 1) RESUMEN (KPIs)
  const [summaryData] = useState([
    {
      title: "Recaudación Total",
      value: "$50,000",
      icon: <DollarOutlined style={{ color: "#1890ff" }} />,
      tooltip: "Monto total recaudado en todos los proyectos",
    },
    {
      title: "Usuarios Registrados",
      value: "150",
      icon: <UserOutlined style={{ color: "#52c41a" }} />,
      tooltip: "Cantidad de usuarios en la plataforma",
    },
    {
      title: "Proyectos Activos",
      value: "89",
      icon: <FundOutlined style={{ color: "#eb2f96" }} />,
      tooltip: "Proyectos vigentes en campaña de recaudación",
    },
    {
      title: "Proyectos Totales",
      value: "250",
      icon: <FundOutlined style={{ color: "#faad14" }} />,
      tooltip: "Proyectos creados, incluyendo finalizados",
    },
  ]);

  // Datos para la gráfica de líneas (monto recaudado)
  const lineData = [
    { month: "Ene", MesPasado: 12000, MesActual: 18000 },
    { month: "Feb", MesPasado: 15000, MesActual: 17000 },
    { month: "Mar", MesPasado: 14000, MesActual: 21000 },
    { month: "Abr", MesPasado: 18000, MesActual: 23000 },
    { month: "May", MesPasado: 20000, MesActual: 25000 },
  ];

  // Datos para la gráfica de pastel
  const pieData = [
    { name: "Impacto Social", value: 40 },
    { name: "Sostenibilidad", value: 35 },
    { name: "Innovación", value: 25 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  // Datos para la gráfica de barras
  const barData = [
    { categoria: "Salud", proyectos: 30 },
    { categoria: "Tecnología", proyectos: 45 },
    { categoria: "Educación", proyectos: 20 },
    { categoria: "Arte", proyectos: 15 },
    { categoria: "Otros", proyectos: 40 },
  ];

  // Inversiones recientes (tabla)
  const columnsInversiones = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      sorter: (a, b) =>
        moment(a.fecha, "YYYY-MM-DD HH:mm").valueOf() -
        moment(b.fecha, "YYYY-MM-DD HH:mm").valueOf(),
      defaultSortOrder: "descend",
    },
    { title: "Proyecto", dataIndex: "proyecto", key: "proyecto" },
    {
      title: "Legitimidad",
      dataIndex: "legitimidad",
      key: "legitimidad",
      filters: [
        { text: "Aceptado", value: "Aceptado" },
        { text: "Rechazado", value: "Rechazado" },
      ],
      onFilter: (value, record) => record.legitimidad.indexOf(value) === 0,
      render: (status) => (
        <Tag
          icon={status === "Aceptado" ? <CheckOutlined /> : <CloseOutlined />}
          color={status === "Aceptado" ? "green" : "red"}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Inversores",
      dataIndex: "inversores",
      key: "inversores",
      sorter: (a, b) => a.inversores - b.inversores,
    },
    { title: "Monto", dataIndex: "monto", key: "monto" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    {
      title: "Acción",
      key: "accion",
      render: (record) => (
        <Button type="primary" onClick={() => handleDetallesProyecto(record)}>
          Detalles
        </Button>
      ),
    },
  ];

  const dataInversiones = [
    {
      key: "1",
      fecha: "2024-01-15 11:30",
      proyecto: "Huerto Urbano Comunitario",
      legitimidad: "Aceptado",
      inversores: 14,
      monto: "$500.00",
      descripcion: "Fomentando la siembra urbana y la conciencia ecológica",
    },
    {
      key: "2",
      fecha: "2024-01-10 09:15",
      proyecto: "Energía Solar Domiciliaria",
      legitimidad: "Rechazado",
      inversores: 8,
      monto: "$1,200.00",
      descripcion: "Paneles solares para zonas rurales",
    },
    {
      key: "3",
      fecha: "2024-01-12 14:00",
      proyecto: "Plataforma Educativa Online",
      legitimidad: "Aceptado",
      inversores: 20,
      monto: "$750.00",
      descripcion: "Cursos en línea para estudiantes de bajos recursos",
    },
  ];

  // 2) SOLICITUDES DE APROBACIÓN DE PROYECTOS
  const columnsSolicitudes = [
    { title: "Proyecto", dataIndex: "nombre", key: "nombre" },
    { title: "Fecha Solicitud", dataIndex: "fechaSolicitud", key: "fechaSolicitud" },
    { title: "Creador", dataIndex: "creador", key: "creador" },
    { title: "Categoría", dataIndex: "categoria", key: "categoria" },
    {
      title: "Acción",
      key: "accion",
      render: (record) => (
        <Space>
          <Button type="primary" onClick={() => aprobarProyecto(record.id)}>
            Aprobar
          </Button>
          <Button danger onClick={() => rechazarProyecto(record.id)}>
            Rechazar
          </Button>
        </Space>
      ),
    },
  ];

  const [solicitudesProyectos] = useState([
    {
      id: 1,
      nombre: "Aplicación Móvil de Salud Mental",
      fechaSolicitud: "2024-01-20",
      creador: "Ana López",
      categoria: "Salud",
    },
    {
      id: 2,
      nombre: "Eco-Friendly Packaging",
      fechaSolicitud: "2024-01-18",
      creador: "Carlos Velázquez",
      categoria: "Sostenibilidad",
    },
  ]);

  // 3) PROYECTOS EN CURSO
  const columnsProyectosCurso = [
    { title: "Proyecto", dataIndex: "nombre", key: "nombre" },
    { title: "Creador", dataIndex: "creador", key: "creador" },
    { title: "Meta", dataIndex: "meta", key: "meta" },
    { title: "Recaudado", dataIndex: "recaudado", key: "recaudado" },
    {
      title: "Estado",
      dataIndex: "estado",
      key: "estado",
      render: (estado) => (
        <Tag color={estado === "En Curso" ? "blue" : "green"}>{estado}</Tag>
      ),
    },
    {
      title: "Acción",
      key: "accion",
      render: (record) => (
        <Space>
          <Button onClick={() => pausarProyecto(record.id)}>Pausar</Button>
          <Button type="dashed" onClick={() => extenderPlazo(record.id)}>
            Extender Plazo
          </Button>
        </Space>
      ),
    },
  ];

  const [proyectosCurso] = useState([
    {
      id: 1,
      nombre: "Sistema de Riego Automatizado",
      creador: "Andrea Gómez",
      meta: "$3,000",
      recaudado: "$1,200",
      estado: "En Curso",
    },
    {
      id: 2,
      nombre: "Centro de Reciclaje Urbano",
      creador: "Luis Ramírez",
      meta: "$5,000",
      recaudado: "$5,200",
      estado: "Financiado",
    },
  ]);

  // 4) SOPORTE (TICKETS)
  const columnsTickets = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Descripción", dataIndex: "descripcion", key: "descripcion" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    { title: "Prioridad", dataIndex: "prioridad", key: "prioridad" },
    { title: "Fecha Creación", dataIndex: "fechaCreacion", key: "fechaCreacion" },
    {
      title: "Acción",
      key: "accion",
      render: (record) => (
        <Button type="primary" onClick={() => asignarTicket(record.id)}>
          Atender
        </Button>
      ),
    },
  ];

  const [ticketsSoporte] = useState([
    {
      id: 1001,
      titulo: "Problema con pago",
      descripcion: "No puedo completar el proceso de pago con mi tarjeta.",
      estado: "Abierto",
      prioridad: "Alta",
      fechaCreacion: "2024-01-15",
    },
    {
      id: 1002,
      titulo: "Error al subir documentos",
      descripcion: "La plataforma da error 500 al subir mi ID.",
      estado: "En proceso",
      prioridad: "Media",
      fechaCreacion: "2024-01-16",
    },
  ]);

  // 5) USUARIOS
  const columnsUsuarios = [
    { title: "Nombre", dataIndex: "nombre", key: "nombre" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Rol", dataIndex: "rol", key: "rol" },
    { title: "Estado", dataIndex: "estado", key: "estado" },
    {
      title: "Acciones",
      key: "acciones",
      render: (record) => (
        <Button danger onClick={() => suspenderUsuario(record.id)}>
          Suspender
        </Button>
      ),
    },
  ];

  const [usuarios] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@example.com",
      rol: "Inversor",
      estado: "Activo",
    },
    {
      id: 2,
      nombre: "María García",
      email: "maria@example.com",
      rol: "Creador",
      estado: "Activo",
    },
  ]);

  // 6) ALERTAS / NOTIFICACIONES
  const [alertas] = useState([
    { id: 1, mensaje: "Proyecto #123 ha superado su meta", tipo: "info" },
    { id: 2, mensaje: "Retiro pendiente por $1,200", tipo: "warning" },
    { id: 3, mensaje: "Proyecto #345 ha sido reportado por 3 usuarios", tipo: "error" },
  ]);

  // 7) HISTORIAL / AUDITORÍA
  const columnsHistorial = [
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Usuario", dataIndex: "usuario", key: "usuario" },
    { title: "Acción", dataIndex: "accion", key: "accion" },
    { title: "Resultado", dataIndex: "resultado", key: "resultado" },
  ];

  const [historial] = useState([
    {
      id: 1,
      fecha: "2024-01-10 10:00",
      usuario: "Admin1",
      accion: "Aprobación de proyecto",
      resultado: "Proyecto #101 aprobado",
    },
    {
      id: 2,
      fecha: "2024-01-10 11:00",
      usuario: "Admin2",
      accion: "Rechazo de proyecto",
      resultado: "Proyecto #102 rechazado por falta de documentos",
    },
  ]);

  // 8) CONFIGURACIONES
  const [form] = Form.useForm();

  // ================================
  // HANDLERS (Simulados)
  // ================================
  const handleDetallesProyecto = (record) => {
    alert(`Detalles del proyecto: ${record.proyecto}`);
  };

  const aprobarProyecto = (id) => {
    alert(`Proyecto con ID ${id} aprobado`);
  };

  const rechazarProyecto = (id) => {
    alert(`Proyecto con ID ${id} rechazado`);
  };

  const pausarProyecto = (id) => {
    alert(`Proyecto con ID ${id} pausado`);
  };

  const extenderPlazo = (id) => {
    alert(`Se ha extendido el plazo para el proyecto con ID ${id}`);
  };

  const asignarTicket = (id) => {
    alert(`Ticket #${id} asignado`);
  };

  const suspenderUsuario = (id) => {
    alert(`Usuario con ID ${id} suspendido`);
  };

  const handleConfigSubmit = (values) => {
    alert(`Nuevas configuraciones guardadas:\n${JSON.stringify(values, null, 2)}`);
  };

  // Filtros de ejemplo para año, trimestre y mes (en la pestaña Resumen)
  const [filters, setFilters] = useState({
    year: "2024",
    quarter: "",
    month: "",
  });

  const handleChangeYear = (value) => {
    setFilters({ ...filters, year: value });
  };

  const handleChangeQuarter = (value) => {
    setFilters({ ...filters, quarter: value });
  };

  const handleChangeMonth = (value) => {
    setFilters({ ...filters, month: value });
  };

  const handleDateRangeChange = (dates) => {
    if (dates) {
      console.log(
        "Rango de fechas seleccionado:",
        dates[0].format("YYYY-MM-DD"),
        "-",
        dates[1].format("YYYY-MM-DD")
      );
    }
  };

  // ================================
  // RENDER
  // ================================
  return (
    <div style={{ padding: 20 }}>
      <Tabs defaultActiveKey="1">
        {/* =========================
            PESTAÑA 1: RESUMEN
          ========================= */}
        <TabPane tab="Resumen" key="1">
          <Card style={{ marginBottom: 20 }}>
            <Row gutter={[16, 16]} align="middle" justify="space-between">
              <Col>
                <Space>
                  <Select
                    placeholder="Año"
                    style={{ width: 100 }}
                    onChange={handleChangeYear}
                    value={filters.year}
                  >
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                    <Option value="2024">2024</Option>
                  </Select>
                  <Select
                    placeholder="Trimestre"
                    style={{ width: 120 }}
                    onChange={handleChangeQuarter}
                    value={filters.quarter}
                  >
                    <Option value="Q1">Q1</Option>
                    <Option value="Q2">Q2</Option>
                    <Option value="Q3">Q3</Option>
                    <Option value="Q4">Q4</Option>
                  </Select>
                  <Select
                    placeholder="Mes"
                    style={{ width: 100 }}
                    onChange={handleChangeMonth}
                    value={filters.month}
                  >
                    <Option value="01">Enero</Option>
                    <Option value="02">Febrero</Option>
                    <Option value="03">Marzo</Option>
                    <Option value="04">Abril</Option>
                    <Option value="05">Mayo</Option>
                    <Option value="06">Junio</Option>
                    <Option value="07">Julio</Option>
                    <Option value="08">Agosto</Option>
                    <Option value="09">Septiembre</Option>
                    <Option value="10">Octubre</Option>
                    <Option value="11">Noviembre</Option>
                    <Option value="12">Diciembre</Option>
                  </Select>
                  <RangePicker onChange={handleDateRangeChange} format="YYYY-MM-DD" />
                </Space>
              </Col>
            </Row>
          </Card>

          {/* Métricas principales */}
          <Row gutter={16}>
            {summaryData.map((item, index) => (
              <Col xs={24} sm={12} md={6} key={index}>
                <Card hoverable>
                  <Space>
                    <Statistic
                      title={
                        <Space>
                          {item.title}
                          <AntTooltip title={item.tooltip}>
                            <InfoCircleOutlined />
                          </AntTooltip>
                        </Space>
                      }
                      value={item.value}
                      prefix={item.icon}
                    />
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Gráficas */}
          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col xs={24} md={12}>
              <Card title="Monto Recaudado" hoverable>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="MesPasado" stroke="#8884d8" />
                    <Line type="monotone" dataKey="MesActual" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card title="Categorías de Proyectos (Porcentaje)" hoverable>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
            <Col span={24}>
              <Card title="Proyectos por Categoría (Cantidad)">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="categoria" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="proyectos" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Inversiones Recientes */}
          <Divider orientation="left" style={{ marginTop: 40, fontSize: 18 }}>
            Inversiones Recientes
          </Divider>
          <Card>
            <Table
              columns={columnsInversiones}
              dataSource={dataInversiones}
              pagination={{ pageSize: 5 }}
              rowKey="key"
            />
          </Card>
        </TabPane>

        {/* =========================
            PESTAÑA 2: SOLICITUDES DE APROBACIÓN
          ========================= */}
        <TabPane tab="Solicitudes de Aprobación" key="2">
          <Card title="Proyectos Pendientes de Aprobación">
            <Table
              dataSource={solicitudesProyectos}
              columns={columnsSolicitudes}
              rowKey="id"
            />
          </Card>
        </TabPane>

        {/* =========================
            PESTAÑA 3: PROYECTOS EN CURSO
          ========================= */}
        <TabPane tab="Proyectos en Curso" key="3">
          <Card title="Gestión de Proyectos Activos">
            <Table
              dataSource={proyectosCurso}
              columns={columnsProyectosCurso}
              rowKey="id"
            />
          </Card>
        </TabPane>

        {/* =========================
            PESTAÑA 4: SOPORTE (TICKETS)
          ========================= */}
        <TabPane tab="Soporte (Tickets)" key="4">
          <Card title="Listado de Tickets de Soporte">
            <Table
              dataSource={ticketsSoporte}
              columns={columnsTickets}
              rowKey="id"
            />
          </Card>
        </TabPane>

        {/* =========================
            PESTAÑA 5: USUARIOS
          ========================= */}
        <TabPane tab="Usuarios" key="5">
          <Card title="Gestión de Usuarios">
            <Table
              dataSource={usuarios}
              columns={columnsUsuarios}
              rowKey="id"
            />
          </Card>
        </TabPane>

        {/* =========================
            PESTAÑA 6: ALERTAS / NOTIFICACIONES
          ========================= */}
        <TabPane tab="Alertas" key="6">
          <Card title="Alertas y Notificaciones Importantes">
            {alertas.map((alerta) => (
              <Alert
                key={alerta.id}
                message={`Alerta #${alerta.id}`}
                description={alerta.mensaje}
                type={alerta.tipo}
                showIcon
                style={{ marginBottom: 10 }}
              />
            ))}
          </Card>
        </TabPane>

        {/* =========================
            PESTAÑA 7: HISTORIAL / AUDITORÍA
          ========================= */}
        <TabPane tab="Historial" key="7">
          <Card title="Historial de Cambios / Auditoría">
            <Table
              dataSource={historial}
              columns={columnsHistorial}
              rowKey="id"
            />
          </Card>
        </TabPane>

        {/* =========================
            PESTAÑA 8: CONFIGURACIONES
          ========================= */}
        <TabPane tab="Configuraciones" key="8">
          <Card title="Parámetros Globales">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleConfigSubmit}
              initialValues={{
                comision: "5%",
                limiteRetiro: "$1,000",
                politicaCancelacion: "Permitir cancelaciones con reembolso en 48h",
              }}
            >
              <Form.Item label="Comisión de la Plataforma" name="comision">
                <Input />
              </Form.Item>
              <Form.Item label="Límite de Retiro" name="limiteRetiro">
                <Input />
              </Form.Item>
              <Form.Item label="Política de Cancelación" name="politicaCancelacion">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Guardar Configuraciones
              </Button>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DashboardAdmin;
  