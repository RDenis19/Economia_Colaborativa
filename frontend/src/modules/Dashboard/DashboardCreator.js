// C:\Users\HP\Desktop\Economia_Colaborativa\frontend\src\modules\Dashboard\DashboardCreador.js

import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Statistic,
  Select,
  Button,
  Tag,
  Table,
  Divider,
  List,
  Avatar,
  Tooltip,
  Space,
  Form,
  Input,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";


const { Option } = Select;

const DashboardCreador = () => {
  // Estado para simular "páginas" o vistas: "dashboard", "createProject", "listProjects"
  const [view, setView] = useState("dashboard");

  // ----------------------
  // Datos MOCK para el dashboard
  // ----------------------
  const [projects] = useState([
    { id: 1, name: "Proyecto Salud Rural" },
    { id: 2, name: "Educación Inclusiva" },
    { id: 3, name: "Huerto Ecológico" },
  ]);

  const [selectedProject, setSelectedProject] = useState(projects[0].id);

  const [projectStats] = useState({
    totalDonations: 1139240.25,
    avgDonation: 231.2,
    totalRevenue: 500420.25,
    totalVisitors: 400000,
    currency: "USD",
  });

  const [revenueData] = useState([
    { month: "Abr", revenue: 45000 },
    { month: "May", revenue: 52000 },
    { month: "Jun", revenue: 48000 },
    { month: "Jul", revenue: 60000 },
    { month: "Ago", revenue: 55000 },
    { month: "Sep", revenue: 70000 },
    { month: "Oct", revenue: 75000 },
    { month: "Nov", revenue: 80000 },
    { month: "Dic", revenue: 82000 },
  ]);

  const columnsTransacciones = [
    {
      title: "Usuario",
      dataIndex: "name",
      key: "name",
      render: () => (
        <Avatar
          style={{ marginRight: 8, backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      ),
    },
    { title: "ID", dataIndex: "customerId", key: "customerId" },
    { title: "Tipo", dataIndex: "type", key: "type" },
    { title: "Ubicación", dataIndex: "location", key: "location" },
    { title: "Fecha", dataIndex: "date", key: "date" },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Approved" ? "green" : "red"}>{status}</Tag>
      ),
    },
    { title: "Monto", dataIndex: "amount", key: "amount" },
  ];

  const dataTransacciones = [
    {
      key: 1,
      name: "Aaron Alexander",
      customerId: "AA-100",
      type: "Humanity",
      location: "Jakarta, Indonesia",
      date: "24/01/2024",
      status: "Approved",
      amount: "$402.00",
    },
    {
      key: 2,
      name: "Michelle Joaquin",
      customerId: "MJ-203",
      type: "Health",
      location: "Seoul, South Korea",
      date: "24/01/2024",
      status: "Declined",
      amount: "$210.50",
    },
    {
      key: 3,
      name: "Carlos Rojas",
      customerId: "CR-505",
      type: "Education",
      location: "Bogotá, Colombia",
      date: "25/01/2024",
      status: "Approved",
      amount: "$340.00",
    },
  ];

  const [galleryImages] = useState([
    {
      id: 1,
      url: "https://picsum.photos/300/200?random=1",
      alt: "Imagen 1",
    },
    {
      id: 2,
      url: "https://picsum.photos/300/200?random=2",
      alt: "Imagen 2",
    },
    {
      id: 3,
      url: "https://picsum.photos/300/200?random=3",
      alt: "Imagen 3",
    },
  ]);

  const [feedbackComments] = useState([
    {
      author: "Juan Pérez",
      avatar: "https://joeschmoe.io/api/v1/random",
      content: "Me encanta la iniciativa, espero que siga creciendo.",
      datetime: "Hace 2 horas",
    },
    {
      author: "Sofía Méndez",
      avatar: "https://joeschmoe.io/api/v1/female/random",
      content: "¿Cómo puedo participar como voluntaria?",
      datetime: "Hace 1 día",
    },
  ]);

  const onProjectChange = (value) => {
    setSelectedProject(value);
    console.log("Proyecto seleccionado:", value);
  };

  // ----------------------
  // Gestión de proyectos creados (nueva funcionalidad)
  // ----------------------
  const [createdProjects, setCreatedProjects] = useState([]);

  // Cargar proyectos creados desde localStorage al montar el componente
  useEffect(() => {
    const storedProjects = localStorage.getItem("createdProjects");
    if (storedProjects) {
      setCreatedProjects(JSON.parse(storedProjects));
    }
  }, []);

  const saveProjectsToStorage = (projects) => {
    localStorage.setItem("createdProjects", JSON.stringify(projects));
  };

  const handleCreateProject = (project) => {
    const newProject = { id: Date.now(), ...project };
    const newProjects = [...createdProjects, newProject];
    setCreatedProjects(newProjects);
    saveProjectsToStorage(newProjects);
    message.success("Proyecto creado exitosamente");
    setView("dashboard");
  };

  // ----------------------
  // Vistas
  // ----------------------

  // Vista Dashboard (principal)
  const renderDashboard = () => {
    return (
      <div style={{ padding: 20 }}>
        {/* Selector de proyecto y botones para cambiar de vista */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <Select
              value={selectedProject}
              style={{ width: 240 }}
              onChange={onProjectChange}
            >
              {projects.map((p) => (
                <Option key={p.id} value={p.id}>
                  {p.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Space>
              <Button type="primary" onClick={() => setView("createProject")}>
                Publicar Nuevo Proyecto
              </Button>
              <Button onClick={() => setView("listProjects")}>
                Ver Listado de Proyectos
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Tarjetas de estadísticas */}
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="Total Donation"
                value={projectStats.totalDonations}
                precision={2}
                prefix={projectStats.currency === "USD" ? "$" : ""}
                valueStyle={{ color: "#3f8600" }}
                suffix={
                  <span style={{ color: "#3f8600" }}>
                    +3.4% <small>From last month</small>
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="Avg Donation"
                value={projectStats.avgDonation}
                precision={2}
                prefix={projectStats.currency === "USD" ? "$" : ""}
                valueStyle={{ color: "#cf1322" }}
                suffix={
                  <span style={{ color: "#cf1322" }}>
                    +1.02% <small>From last month</small>
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="Total Revenue"
                value={projectStats.totalRevenue}
                precision={2}
                prefix={projectStats.currency === "USD" ? "$" : ""}
                valueStyle={{ color: "#2f54eb" }}
                suffix={
                  <span style={{ color: "#2f54eb" }}>
                    +2.15% <small>From last month</small>
                  </span>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card hoverable>
              <Statistic
                title="Total Visitors"
                value={projectStats.totalVisitors}
                precision={0}
                valueStyle={{ color: "#fa8c16" }}
                suffix={
                  <span style={{ color: "#fa8c16" }}>
                    -2.25% <small>From last month</small>
                  </span>
                }
              />
            </Card>
          </Col>
        </Row>

        {/* Gráfica de ingresos */}
        <Card
          title="Revenue"
          extra={
            <Space>
              <Select defaultValue="This year">
                <Option value="This year">This year</Option>
                <Option value="Last year">Last year</Option>
              </Select>
              <Select defaultValue="Growth">
                <Option value="Growth">Growth</Option>
                <Option value="Decline">Decline</Option>
              </Select>
            </Space>
          }
          style={{ marginTop: 20 }}
        >
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#52c41a"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Tabla de transacciones */}
        <Card title="Transactions" style={{ marginTop: 20 }}>
          <Table
            columns={columnsTransacciones}
            dataSource={dataTransacciones}
            pagination={{ pageSize: 5 }}
            rowKey="key"
          />
        </Card>

        {/* Galería de imágenes y comentarios */}
        <Row gutter={24} style={{ marginTop: 20 }}>
          <Col xs={24} md={12}>
            <Card title="Project Gallery">
              <Row gutter={16}>
                {galleryImages.map((img) => (
                  <Col xs={12} key={img.id} style={{ marginBottom: 16 }}>
                    <img
                      src={img.url}
                      alt={img.alt}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: 8,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      }}
                    />
                  </Col>
                ))}
              </Row>
              <Button type="dashed" icon={<CameraOutlined />}>
                Agregar Nuevas Imágenes
              </Button>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Comments & Feedback">
              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={feedbackComments}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={
                        <Tooltip title={item.datetime}>
                          <span>{item.author}</span>
                        </Tooltip>
                      }
                      description={item.content}
                    />
                  </List.Item>
                )}
              />
              <Divider />
              <Button type="primary">Ver Todos</Button>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  // Vista para crear un nuevo proyecto
  const renderCreateProject = () => {
    return (
      <div style={{ padding: 20 }}>
        <Card title="Crear Nuevo Proyecto">
          <Form
            layout="vertical"
            onFinish={(values) => {
              // Si se seleccionó una fecha, formatearla
              const formattedValues = {
                ...values,
                deadline: values.deadline
                  ? values.deadline.format("YYYY-MM-DD")
                  : null,
              };
              handleCreateProject(formattedValues);
            }}
          >
            <Form.Item
              name="name"
              label="Nombre del Proyecto"
              rules={[
                { required: true, message: "Por favor ingresa el nombre del proyecto" },
              ]}
            >
              <Input placeholder="Nombre del proyecto" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Descripción"
              rules={[
                { required: true, message: "Por favor ingresa una descripción" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Descripción del proyecto" />
            </Form.Item>
            <Form.Item
              name="goal"
              label="Meta de Financiamiento"
              rules={[
                { required: true, message: "Ingresa la meta de financiamiento" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                placeholder="Meta de financiamiento"
              />
            </Form.Item>
            <Form.Item
              name="category"
              label="Categoría"
              rules={[
                { required: true, message: "Selecciona una categoría" },
              ]}
            >
              <Select placeholder="Selecciona una categoría">
                <Option value="Salud">Salud</Option>
                <Option value="Educación">Educación</Option>
                <Option value="Tecnología">Tecnología</Option>
                <Option value="Medio Ambiente">Medio Ambiente</Option>
                <Option value="Arte">Arte</Option>
              </Select>
            </Form.Item>
            <Form.Item name="deadline" label="Fecha Límite">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="imageUrl" label="URL de Imagen">
              <Input placeholder="https://example.com/imagen.jpg" />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Crear Proyecto
                </Button>
                <Button onClick={() => setView("dashboard")}>
                  Cancelar
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  };

  // Vista para listar los proyectos creados
  const renderListProjects = () => {
    return (
      <div style={{ padding: 20 }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
          <Col>
            <h2>Listado de Proyectos Creados</h2>
          </Col>
          <Col>
            <Button onClick={() => setView("dashboard")}>Volver al Dashboard</Button>
          </Col>
        </Row>
        <Row gutter={16}>
          {createdProjects.length === 0 ? (
            <Col span={24}>
              <Card>
                <p>No hay proyectos creados aún.</p>
              </Card>
            </Col>
          ) : (
            createdProjects.map((project) => (
              <Col xs={24} sm={12} md={8} key={project.id}>
                <Card
                  hoverable
                  cover={
                    project.imageUrl ? (
                      <img
                        alt={project.name}
                        src={project.imageUrl}
                        style={{ height: 200, objectFit: "cover" }}
                      />
                    ) : null
                  }
                >
                  <Card.Meta title={project.name} description={project.description} />
                  <Divider />
                  <p>
                    <strong>Meta:</strong> ${project.goal}
                  </p>
                  {project.deadline && (
                    <p>
                      <strong>Fecha Límite:</strong> {project.deadline}
                    </p>
                  )}
                  <p>
                    <strong>Categoría:</strong> {project.category}
                  </p>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    );
  };

  return (
    <div>
      {view === "dashboard" && renderDashboard()}
      {view === "createProject" && renderCreateProject()}
      {view === "listProjects" && renderListProjects()}
    </div>
  );
};

export default DashboardCreador;
