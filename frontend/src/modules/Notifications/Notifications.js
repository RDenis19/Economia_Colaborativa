// NotificationsCenter.js
import React, { useState, useEffect } from "react";
import {
  Layout,
  Card,
  List,
  Drawer,
  Button,
  Input,
  Tabs,
  Checkbox,
  Row,
  Col,
  Typography,
  message,
  Modal,
  Divider,
} from "antd";
import {
  BellOutlined,
  DollarCircleOutlined,
  FileOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
  StarOutlined,
  StarFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;

// Datos de ejemplo para las notificaciones (definido fuera del componente)
const initialNotifications = [
  {
    id: 1,
    type: "Proyecto",
    title: "Nuevo Proyecto Enviado",
    description:
      "El proyecto 'Campaña de Agua Limpia' fue enviado para revisión por Juan Pérez.",
    timestamp: new Date().toISOString(),
    read: false,
    important: false,
  },
  {
    id: 2,
    type: "Financiero",
    title: "Meta Alcanzada",
    description:
      "El proyecto 'Tecnología para Todos' alcanzó el 100% de su meta de financiamiento.",
    timestamp: new Date(new Date().getTime() - 3600000).toISOString(),
    read: false,
    important: false,
  },
  {
    id: 3,
    type: "Usuario",
    title: "Nuevo Registro de Usuario",
    description: "La usuaria María López se ha registrado en la plataforma.",
    timestamp: new Date(new Date().getTime() - 7200000).toISOString(),
    read: true,
    important: false,
  },
  {
    id: 4,
    type: "Seguridad",
    title: "Alerta de Seguridad",
    description:
      "Se detectó actividad sospechosa en la cuenta de UsuarioXYZ. Se recomienda revisar el acceso.",
    timestamp: new Date(new Date().getTime() - 10800000).toISOString(),
    read: false,
    important: false,
  },
];

const NotificationsCenter = () => {
  // Estados principales
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all"); // "all", "Proyecto", "Financiero", "Usuario", "Seguridad"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); // Para selección masiva

  // Cargar notificaciones de ejemplo al montar el componente
  useEffect(() => {
    setNotifications(initialNotifications);
  }, []);

  // Filtrar según tipo y búsqueda
  useEffect(() => {
    let data = notifications;
    if (typeFilter !== "all") {
      data = data.filter((item) => item.type === typeFilter);
    }
    if (searchQuery) {
      data = data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Ordenar por fecha descendente (más reciente primero)
    data.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setFilteredNotifications(data);
  }, [notifications, typeFilter, searchQuery]);

  // Abrir Drawer de detalle y marcar como leída
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setDrawerVisible(true);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const markAsRead = (id) => {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item
    );
    setNotifications(updated);
    message.success("Notificación marcada como leída");
  };

  // Alternar "destacar"
  const toggleImportant = (id) => {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, important: !item.important } : item
    );
    setNotifications(updated);
  };

  // Eliminar individual
  const handleDeleteNotification = (id) => {
    Modal.confirm({
      title: "Eliminar Notificación",
      content: "¿Estás seguro de eliminar esta notificación?",
      onOk: () => {
        const updated = notifications.filter((item) => item.id !== id);
        setNotifications(updated);
        message.success("Notificación eliminada");
      },
    });
  };

  // Eliminación masiva
  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      message.warning("No hay notificaciones seleccionadas");
      return;
    }
    Modal.confirm({
      title: "Eliminar Notificaciones",
      content: `¿Estás seguro de eliminar las ${selectedIds.length} notificaciones seleccionadas?`,
      onOk: () => {
        const updated = notifications.filter(
          (item) => !selectedIds.includes(item.id)
        );
        setNotifications(updated);
        setSelectedIds([]);
        message.success("Notificaciones eliminadas");
      },
    });
  };

  const handleSelect = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  // Retorna avatar según el tipo
  const getAvatarForType = (type) => {
    switch (type) {
      case "Proyecto":
        return (
          <span style={{ backgroundColor: "#1890ff", borderRadius: "50%", padding: 8 }}>
            <FileOutlined style={{ color: "#fff" }} />
          </span>
        );
      case "Financiero":
        return (
          <span style={{ backgroundColor: "#52c41a", borderRadius: "50%", padding: 8 }}>
            <DollarCircleOutlined style={{ color: "#fff" }} />
          </span>
        );
      case "Usuario":
        return (
          <span style={{ backgroundColor: "#faad14", borderRadius: "50%", padding: 8 }}>
            <UserOutlined style={{ color: "#fff" }} />
          </span>
        );
      case "Seguridad":
        return (
          <span style={{ backgroundColor: "#f5222d", borderRadius: "50%", padding: 8 }}>
            <ExclamationCircleOutlined style={{ color: "#fff" }} />
          </span>
        );
      default:
        return (
          <span style={{ backgroundColor: "#8c8c8c", borderRadius: "50%", padding: 8 }}>
            <BellOutlined style={{ color: "#fff" }} />
          </span>
        );
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Header con margen extra para separar el campo de búsqueda */}
      <Header style={{ background: "#001529", padding: "0 24px" }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ color: "#fff", margin: 0 }}>
              Centro de Notificaciones
            </Title>
          </Col>
          <Col>
            <div style={{ marginBottom: 12 }}>
              <Search
                placeholder="Buscar notificaciones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: 300 }}
                allowClear
              />
            </div>
          </Col>
        </Row>
      </Header>

      {/* Content */}
      <Content style={{ margin: "24px" }}>
        <Card style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          {/* Tabs para seccionar por tipo */}
          <Tabs activeKey={typeFilter} onChange={(key) => setTypeFilter(key)}>
            <TabPane tab="Todos" key="all" />
            <TabPane tab="Proyecto" key="Proyecto" />
            <TabPane tab="Financiero" key="Financiero" />
            <TabPane tab="Usuario" key="Usuario" />
            <TabPane tab="Seguridad" key="Seguridad" />
          </Tabs>

          {/* Botón para eliminación masiva */}
          {selectedIds.length > 0 && (
            <Row justify="end" style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={handleBulkDelete}
              >
                Eliminar Seleccionadas
              </Button>
            </Row>
          )}

          {/* Listado de Notificaciones */}
          <List
            itemLayout="vertical"
            dataSource={filteredNotifications}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                style={{
                  background: item.read ? "#fff" : "#e6f7ff",
                  borderRadius: 4,
                  marginBottom: 8,
                  padding: 16,
                  transition: "all 0.3s",
                  border: item.important ? "2px solid #faad14" : "none",
                }}
                actions={[
                  <Button type="link" onClick={() => handleNotificationClick(item)}>
                    Ver
                  </Button>,
                  <Button type="link" onClick={() => toggleImportant(item.id)}>
                    {item.important ? (
                      <StarFilled style={{ color: "#faad14" }} />
                    ) : (
                      <StarOutlined />
                    )}
                  </Button>,
                  <Button type="link" danger onClick={() => handleDeleteNotification(item.id)}>
                    Eliminar
                  </Button>,
                ]}
              >
                <Row align="middle" gutter={16}>
                  {/* Checkbox de selección */}
                  <Col>
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onChange={(e) => handleSelect(item.id, e.target.checked)}
                    />
                  </Col>
                  {/* Avatar */}
                  <Col>{getAvatarForType(item.type)}</Col>
                  {/* Información */}
                  <Col flex="auto">
                    <Row justify="space-between">
                      <Col>
                        <Text strong>{item.title}</Text>
                      </Col>
                      <Col>
                        <Text type="secondary">
                          {moment(item.timestamp).format("DD/MM/YYYY HH:mm")}
                        </Text>
                      </Col>
                    </Row>
                    <Divider style={{ margin: "4px 0" }} />
                    <Text>{item.description}</Text>
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </Card>
      </Content>

      {/* Drawer con detalle llamativo */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            {getAvatarForType(selectedNotification?.type)}
            <span style={{ marginLeft: 12, fontSize: 18, fontWeight: 500 }}>
              {selectedNotification?.title}
            </span>
          </div>
        }
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={450}
      >
        {selectedNotification && (
          <Card bordered={false} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Title level={4}>{selectedNotification.title}</Title>
                <Text type="secondary">
                  {moment(selectedNotification.timestamp).format("DD/MM/YYYY HH:mm")}
                </Text>
              </Col>
              <Col span={24}>
                <Divider />
                <Row>
                  <Col span={8}>
                    <Text strong>Tipo:</Text>
                  </Col>
                  <Col span={16}>
                    <Text>{selectedNotification.type}</Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8}>
                    <Text strong>Descripción:</Text>
                  </Col>
                  <Col span={16}>
                    <Text>{selectedNotification.description}</Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8}>
                    <Text strong>Estado:</Text>
                  </Col>
                  <Col span={16}>
                    <Text>{selectedNotification.read ? "Leída" : "No Leída"}</Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={8}>
                    <Text strong>Destacada:</Text>
                  </Col>
                  <Col span={16}>
                    <Text>{selectedNotification.important ? "Sí" : "No"}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        )}
      </Drawer>
    </Layout>
  );
};

export default NotificationsCenter;
