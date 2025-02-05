// NotificationDashboard.js
import React, { useState, useEffect } from "react";
import {
  Layout,
  Tabs,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Table,
  Modal,
  Tag,
  message,
  Card,
  Row,
  Col,
} from "antd";
import { BellOutlined } from "@ant-design/icons";
import moment from "moment";

const { Header, Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

// Estilos en línea para personalizar la vista
const containerStyle = {
  minHeight: "100vh",
  background: "#f0f2f5",
};

const headerStyle = {
  background: "#001529",
  padding: "0 24px",
};

const headerTitleStyle = {
  color: "#fff",
  fontSize: "24px",
  lineHeight: "64px",
  margin: 0,
};

const contentStyle = {
  margin: "24px",
};

const cardStyle = {
  marginBottom: "24px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
};

const NotificationDashboard = () => {
  // Estado para almacenar las notificaciones
  const [notifications, setNotifications] = useState([]);
  // Formulario para enviar notificaciones
  const [form] = Form.useForm();
  // Estados para ver el detalle de una notificación
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Cargar notificaciones desde localStorage al montar el componente
  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  // Función para actualizar el localStorage
  const updateLocalStorage = (data) => {
    localStorage.setItem("notifications", JSON.stringify(data));
  };

  // Manejo del envío (creación) de una notificación
  const handleSendNotification = (values) => {
    const newNotification = {
      id: notifications.length
        ? Math.max(...notifications.map((n) => n.id)) + 1
        : 1,
      title: values.title,
      message: values.message,
      type: values.type,
      recipients: values.recipients,
      scheduledDate: values.scheduledDate
        ? values.scheduledDate.toISOString()
        : null,
      createdAt: new Date().toISOString(),
      status: values.scheduledDate ? "Programado" : "Enviado",
    };

    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    updateLocalStorage(updatedNotifications);
    message.success("Notificación enviada correctamente");
    form.resetFields();
  };

  // Columnas para la tabla del historial de notificaciones
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        let color = "";
        if (type === "Información") color = "blue";
        else if (type === "Alerta") color = "red";
        else if (type === "Advertencia") color = "orange";
        else if (type === "Éxito") color = "green";
        return <Tag color={color}>{type}</Tag>;
      },
      width: 120,
    },
    {
      title: "Destinatarios",
      dataIndex: "recipients",
      key: "recipients",
      render: (recipients) =>
        Array.isArray(recipients) ? recipients.join(", ") : recipients,
    },
    {
      title: "Fecha de Envío",
      dataIndex: "scheduledDate",
      key: "scheduledDate",
      render: (date, record) =>
        date
          ? moment(date).format("DD/MM/YYYY HH:mm")
          : moment(record.createdAt).format("DD/MM/YYYY HH:mm"),
      width: 160,
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <span>
          <Button
            type="link"
            onClick={() => {
              setSelectedNotification(record);
              setDetailModalVisible(true);
            }}
          >
            Ver
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Eliminar
          </Button>
        </span>
      ),
      width: 150,
    },
  ];

  // Función para eliminar una notificación
  const handleDelete = (id) => {
    Modal.confirm({
      title: "Eliminar Notificación",
      content: "¿Estás seguro de eliminar esta notificación?",
      onOk: () => {
        const updated = notifications.filter((n) => n.id !== id);
        setNotifications(updated);
        updateLocalStorage(updated);
        message.success("Notificación eliminada.");
      },
    });
  };

  return (
    <Layout style={containerStyle}>
      <Header style={headerStyle}>
        <Row align="middle">
          <Col>
            <BellOutlined
              style={{ fontSize: "32px", color: "#fff", marginRight: "16px" }}
            />
          </Col>
          <Col>
            <h1 style={headerTitleStyle}>Gestión de Notificaciones</h1>
          </Col>
        </Row>
      </Header>
      <Content style={contentStyle}>
        <Tabs defaultActiveKey="1" type="card">
          {/* Pestaña para enviar una nueva notificación */}
          <TabPane tab="Enviar Notificación" key="1">
            <Card title="Crear Nueva Notificación" style={cardStyle}>
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSendNotification}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Título"
                      name="title"
                      rules={[
                        { required: true, message: "Ingrese el título" },
                      ]}
                    >
                      <Input placeholder="Título de la notificación" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Tipo"
                      name="type"
                      rules={[
                        { required: true, message: "Seleccione el tipo" },
                      ]}
                    >
                      <Select placeholder="Seleccione el tipo">
                        <Option value="Información">Información</Option>
                        <Option value="Alerta">Alerta</Option>
                        <Option value="Advertencia">Advertencia</Option>
                        <Option value="Éxito">Éxito</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item
                      label="Mensaje"
                      name="message"
                      rules={[
                        { required: true, message: "Ingrese el mensaje" },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="Contenido de la notificación"
                        rows={4}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Destinatarios"
                      name="recipients"
                      rules={[
                        {
                          required: true,
                          message: "Seleccione al menos un destinatario",
                        },
                      ]}
                    >
                      <Select mode="multiple" placeholder="Seleccione destinatarios">
                        <Option value="Todos">Todos</Option>
                        <Option value="Usuarios VIP">Usuarios VIP</Option>
                        <Option value="Nuevos Usuarios">Nuevos Usuarios</Option>
                        <Option value="Segmento 1">Segmento 1</Option>
                        <Option value="Segmento 2">Segmento 2</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="Fecha y Hora de Envío (opcional)"
                      name="scheduledDate"
                    >
                      <DatePicker
                        showTime
                        format="DD/MM/YYYY HH:mm"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Enviar Notificación
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>

          {/* Pestaña para el historial de notificaciones */}
          <TabPane tab="Historial de Notificaciones" key="2">
            <Card title="Historial" style={cardStyle}>
              <Table
                columns={columns}
                dataSource={notifications}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </TabPane>
        </Tabs>
      </Content>

      {/* Modal para ver el detalle de la notificación */}
      <Modal
        visible={detailModalVisible}
        title="Detalle de la Notificación"
        footer={null}
        onCancel={() => setDetailModalVisible(false)}
      >
        {selectedNotification && (
          <div>
            <p>
              <strong>Título:</strong> {selectedNotification.title}
            </p>
            <p>
              <strong>Mensaje:</strong> {selectedNotification.message}
            </p>
            <p>
              <strong>Tipo:</strong> {selectedNotification.type}
            </p>
            <p>
              <strong>Destinatarios:</strong>{" "}
              {Array.isArray(selectedNotification.recipients)
                ? selectedNotification.recipients.join(", ")
                : selectedNotification.recipients}
            </p>
            <p>
              <strong>Fecha de Envío:</strong>{" "}
              {selectedNotification.scheduledDate
                ? moment(selectedNotification.scheduledDate).format("DD/MM/YYYY HH:mm")
                : moment(selectedNotification.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>
            <p>
              <strong>Estado:</strong> {selectedNotification.status}
            </p>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default NotificationDashboard;
