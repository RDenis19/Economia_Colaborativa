// src/modules/Inversiones/UserInversiones.js

import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Tag,
  Progress,
  Button,
  Modal,
  Timeline,
  Divider,
  message,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  HistoryOutlined,
  CheckOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

const UserInversiones = () => {
  // Estado para controlar el Modal y el proyecto seleccionado
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Proyectos de ejemplo en los que el usuario ha invertido o se ha postulado
  const userInvestments = [
    {
      id: 1,
      title: "Huerto Urbano Comunitario",
      description:
        "Proyecto para cultivar vegetales y frutas libres de pesticidas, promoviendo la educación ambiental y la alimentación saludable.",
      image:
        "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Agricultura Sostenible",
      location: "Quito",
      raised: 3200,
      goal: 5000,
      investors: 12,
      startDate: "01/09/2023",
      progressUpdates: [
        {
          date: "05/09/2023",
          title: "Preparación del Terreno",
          description: "Se limpió y niveló el terreno para la siembra inicial.",
          status: "done",
        },
        {
          date: "15/09/2023",
          title: "Instalación de Riego",
          description:
            "Se colocó un sistema de riego por goteo para optimizar el uso del agua.",
          status: "done",
        },
        {
          date: "25/09/2023",
          title: "Segunda Fase de Cultivo",
          description:
            "Se sembraron nuevas variedades de hortalizas con métodos orgánicos.",
          status: "in-progress",
        },
      ],
    },
    {
      id: 2,
      title: "Reciclaje de Plásticos",
      description:
        "Iniciativa para recolectar y procesar plásticos, fomentando la economía circular y la reducción de residuos.",
      image:
        "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
      category: "Medio Ambiente",
      location: "Guayaquil",
      raised: 2300,
      goal: 5000,
      investors: 10,
      startDate: "01/10/2023",
      progressUpdates: [
        {
          date: "05/10/2023",
          title: "Primera Recogida",
          description:
            "Se recolectaron 250 kg de plástico en el barrio Sur de la ciudad.",
          status: "done",
        },
        {
          date: "12/10/2023",
          title: "Instalación de Centro de Acopio",
          description:
            "Se habilitó un punto de acopio en una zona central para facilitar la entrega de residuos.",
          status: "in-progress",
        },
      ],
    },
    {
      id: 3,
      title: "Taller de Artesanías Locales",
      description:
        "Empoderar a artesanos regionales y comercializar sus creaciones en plataformas digitales para aumentar sus ingresos.",
      image:
        "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
      category: "Emprendimiento Cultural",
      location: "Cuenca",
      raised: 1800,
      goal: 3000,
      investors: 8,
      startDate: "15/10/2023",
      progressUpdates: [
        {
          date: "20/10/2023",
          title: "Formación de Artesanos",
          description:
            "Se impartió un taller de marketing digital y packaging ecológico a 15 artesanos.",
          status: "done",
        },
        {
          date: "01/11/2023",
          title: "Plataforma de Venta en Línea",
          description:
            "Se está desarrollando un e-commerce para promocionar sus productos.",
          status: "delayed",
        },
      ],
    },
    {
      id: 4,
      title: "Renovación de Bibliotecas Rurales",
      description:
        "Mejorar la infraestructura y dotar de nuevos libros a bibliotecas alejadas, promoviendo la lectura infantil.",
      image:
        "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60",
      category: "Educación",
      location: "Loja",
      raised: 4200,
      goal: 6000,
      investors: 15,
      startDate: "10/10/2023",
      progressUpdates: [
        {
          date: "12/10/2023",
          title: "Diagnóstico de Necesidades",
          description:
            "Se evaluaron 3 bibliotecas que requieren reparación y libros nuevos.",
          status: "done",
        },
        {
          date: "25/10/2023",
          title: "Compra de Libros",
          description:
            "Se adquirieron 200 libros de literatura infantil y juvenil.",
          status: "in-progress",
        },
      ],
    },
  ];

  // Handlers para el Modal
  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  // Funciones de "Dar Me Gusta" y "Ver Historial Completo" (simuladas)
  const handleLike = () => {
    message.success(`¡Te ha gustado el proyecto: ${selectedProject?.title}!`);
  };
  const handleVerHistorial = () => {
    message.info("Mostrando historial completo (en construcción)...");
  };

  // Cálculo de porcentaje recaudado
  const getPercent = (raised, goal) =>
    Math.min(Math.round((raised / goal) * 100), 100);

  // Helper para íconos y color en la Timeline
  const getTimelineDot = (status) => {
    switch (status) {
      case "done":
        return <CheckCircleOutlined style={{ fontSize: 16, color: "green" }} />;
      case "in-progress":
        return (
          <ClockCircleOutlined style={{ fontSize: 16, color: "#1890ff" }} />
        );
      case "delayed":
        return (
          <ExclamationCircleOutlined style={{ fontSize: 16, color: "orange" }} />
        );
      default:
        return <ClockCircleOutlined style={{ fontSize: 16 }} />;
    }
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <div style={{ padding: 24, backgroundColor: "#fafafa", minHeight: "100vh" }}>
      <Title level={2} style={{ marginBottom: 16 }}>
        Mis Inversiones / Postulaciones
      </Title>
      <Paragraph style={{ marginBottom: 32 }}>
        Aquí encuentras los proyectos en los que has participado, con su estado
        de avance y detalles de cada hito.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {userInvestments.map((project) => {
          const percent = getPercent(project.raised, project.goal);

          return (
            <Col key={project.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                bodyStyle={{ minHeight: 140 }}
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      style={{ width: "100%", height: 150, objectFit: "cover" }}
                    />
                    <div style={{ position: "absolute", top: 8, left: 8 }}>
                      <Tag color="blue">{project.category}</Tag>
                    </div>
                  </div>
                }
                onClick={() => handleOpenModal(project)}
              >
                <Meta
                  title={project.title}
                  description={
                    <Paragraph type="secondary" ellipsis>
                      {project.description}
                    </Paragraph>
                  }
                />
                <div style={{ marginTop: 12 }}>
                  <Progress
                    percent={percent}
                    status="active"
                    strokeWidth={12}
                    showInfo={false}
                    style={{ marginBottom: 4 }}
                  />
                  <div style={{ fontWeight: "bold", fontSize: 14 }}>
                    ${project.raised.toLocaleString()} recaudados
                    <span style={{ color: "#999", marginLeft: 6 }}>
                      / ${project.goal.toLocaleString()}
                    </span>
                    <span style={{ float: "right", color: "#999" }}>
                      {percent}%
                    </span>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* MODAL DETALLES DEL PROYECTO */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={750}
        bodyStyle={{ padding: 24 }}
        style={{ top: 40 }}
      >
        {selectedProject && (
          <>
            {/* Imagen de cabecera */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: 230,
                marginBottom: 16,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div style={{ position: "absolute", top: 8, left: 8 }}>
                <Tag color="purple">{selectedProject.category}</Tag>
              </div>
            </div>

            <Title level={3} style={{ marginBottom: 8 }}>
              {selectedProject.title}
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 4 }}>
              <strong>Ubicación:</strong> {selectedProject.location}{" "}
              <span style={{ margin: "0 10px" }}>·</span>
              <strong>Inversores:</strong> {selectedProject.investors}{" "}
              <span style={{ margin: "0 10px" }}>·</span>
              <strong>Inicio:</strong> {selectedProject.startDate}
            </Paragraph>
            <Paragraph>{selectedProject.description}</Paragraph>

            {/* Barra de Progreso */}
            <Paragraph style={{ fontWeight: "bold", marginBottom: 4 }}>
              Fondos Recaudados: ${selectedProject.raised.toLocaleString()} / $
              {selectedProject.goal.toLocaleString()}
            </Paragraph>
            <Progress
              percent={getPercent(selectedProject.raised, selectedProject.goal)}
              status="active"
              strokeWidth={12}
              style={{ marginBottom: 16 }}
            />
            <Divider />

            {/* Timeline de Avances */}
            <Title level={4} style={{ marginBottom: 12 }}>
              Avances del Proyecto
            </Title>
            {selectedProject.progressUpdates && (
              <Timeline mode="left" style={{ marginBottom: 24 }}>
                {selectedProject.progressUpdates.map((upd, idx) => (
                  <Timeline.Item
                    key={idx}
                    label={upd.date}
                    dot={getTimelineDot(upd.status)}
                  >
                    <Paragraph style={{ marginBottom: 4, fontWeight: "bold" }}>
                      {upd.title}
                    </Paragraph>
                    <Text type="secondary">{upd.description}</Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            )}

            {/* Botones en el footer */}
            <div style={{ textAlign: "right" }}>
              <Button
                icon={<HistoryOutlined />}
                style={{ marginRight: 8 }}
                onClick={handleVerHistorial}
              >
                Ver Historial Completo
              </Button>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={handleLike}
                style={{ marginRight: 8 }}
              >
                Me Gusta
              </Button>
              <Button onClick={handleCloseModal}>Cerrar</Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default UserInversiones;
