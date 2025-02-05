// src/modules/Projects/ProjectsUser.js

import React, { useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Modal,
  Typography,
  Divider,
  Tag,
  Progress,
  Pagination,
  message,
} from "antd";
import { HeartOutlined, UserAddOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Title, Paragraph } = Typography;

// Número de proyectos a mostrar por página (4 columnas x 4 filas = 16)
const PAGE_SIZE = 16;

const ProjectsUser = () => {
  // Creamos 15 proyectos de ejemplo
  // (Cambia 'image' por import local o una URL pública)
  const allProjects = [
    {
      id: 1,
      title: "Proyecto Bosques",
      description: "Reforestación para la reducción de CO2.",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
      raised: 5000,
      goal: 10000,
      category: "Medio Ambiente",
      currency: "$",
    },
    {
      id: 2,
      title: "Educación para Todos",
      description: "Mejorar la educación en áreas rurales.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      raised: 25000,
      goal: 30000,
      category: "Educación",
      currency: "$",
    },
    {
      id: 3,
      title: "Salud para Niños",
      description: "Campaña de vacunación en zonas apartadas.",
      image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb",
      raised: 8000,
      goal: 15000,
      category: "Salud",
      currency: "$",
    },
    {
      id: 4,
      title: "Tecnología Rural",
      description: "Llevar internet y equipos a escuelas rurales.",
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f",
      raised: 12000,
      goal: 20000,
      category: "Tecnología",
      currency: "$",
    },
    {
      id: 5,
      title: "Reciclaje Urbano",
      description: "Iniciativa para recolectar desechos reciclables.",
      image: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      raised: 3000,
      goal: 5000,
      category: "Medio Ambiente",
      currency: "$",
    },
    {
      id: 6,
      title: "Apoyo a Refugiados",
      description: "Proveer vivienda y alimentos a refugiados.",
      image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
      raised: 4000,
      goal: 10000,
      category: "Humanitario",
      currency: "$",
    },
    {
      id: 7,
      title: "Desarrollo de Software Libre",
      description: "Fomentar herramientas libres para educación.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      raised: 15000,
      goal: 25000,
      category: "Tecnología",
      currency: "$",
    },
    {
      id: 8,
      title: "Construyendo Hogares",
      description: "Creación de viviendas dignas en zonas marginadas.",
      image: "https://images.unsplash.com/photo-1603921326210-6edd2d60ca68",
      raised: 6000,
      goal: 10000,
      category: "Desarrollo Social",
      currency: "$",
    },
    {
      id: 9,
      title: "Clases de Música",
      description: "Proveer instrumentos y cursos a niños talentosos.",
      image: "https://images.unsplash.com/photo-1453060113865-968cea1ad53a",
      raised: 2500,
      goal: 5000,
      category: "Arte y Cultura",
      currency: "$",
    },
    {
      id: 10,
      title: "Investigación Médica",
      description: "Financiar estudios contra enfermedades raras.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7",
      raised: 45000,
      goal: 60000,
      category: "Salud",
      currency: "$",
    },
    {
      id: 11,
      title: "Huertos Urbanos",
      description: "Fomentar cultivos comunitarios en la ciudad.",
      image: "https://images.unsplash.com/photo-1535914254981-b5012eebbd15",
      raised: 8000,
      goal: 10000,
      category: "Medio Ambiente",
      currency: "$",
    },
    {
      id: 12,
      title: "Microcréditos para Emprendedores",
      description: "Apoyar negocios emergentes en zonas rurales.",
      image: "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      raised: 9000,
      goal: 20000,
      category: "Desarrollo Social",
      currency: "$",
    },
    {
      id: 13,
      title: "Biblioteca Móvil",
      description: "Llevar libros y lectura a comunidades alejadas.",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60",
      raised: 3000,
      goal: 8000,
      category: "Educación",
      currency: "$",
    },
    {
      id: 14,
      title: "Rescate de Animales",
      description: "Brindar refugio y atención veterinaria a animales.",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
      raised: 2000,
      goal: 5000,
      category: "Animales",
      currency: "$",
    },
    {
      id: 15,
      title: "Arte Callejero",
      description: "Promover talleres de grafiti y arte urbano.",
      image: "https://images.unsplash.com/photo-1534137667199-675a46e143f3",
      raised: 5000,
      goal: 7000,
      category: "Arte y Cultura",
      currency: "$",
    },
  ];

  // Estado para controlar la página actual de la paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para el Modal (proyecto seleccionado)
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // ===========================
  // FUNCIONES
  // ===========================
  // Abrir modal con detalles
  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  // Botón "Postular"
  const handlePostular = () => {
    message.success(`Te has postulado al proyecto: ${selectedProject?.title}`);
    handleCloseModal();
  };

  // Botón "Dar Me Gusta"
  const handleLike = () => {
    message.info(`Te ha gustado: ${selectedProject?.title}`);
  };

  // Paginación manual
  const totalItems = allProjects.length;           // 15 en este caso
  const startIndex = (currentPage - 1) * PAGE_SIZE; // Si PAGE_SIZE=16, la página 1 tendrá 0..15
  const endIndex = startIndex + PAGE_SIZE;          // 16
  const projectsToShow = allProjects.slice(startIndex, endIndex);

  // ===========================
  // RENDER
  // ===========================
  return (
    <div style={{ padding: 24 }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        Proyectos Disponibles
      </Title>

      <Row gutter={[16, 16]}>
        {projectsToShow.map((project) => {
          // Calcular porcentaje
          const percent = Math.min(
            Math.round((project.raised / project.goal) * 100),
            100
          );

          return (
            <Col key={project.id} xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                cover={
                  <div style={{ position: "relative" }}>
                    <img
                      alt={project.title}
                      src={project.image}
                      style={{
                        height: 150,
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Etiqueta con la categoría en la esquina superior */}
                    <div style={{ position: "absolute", top: 8, right: 8 }}>
                      <Tag color="blue">{project.category}</Tag>
                    </div>
                  </div>
                }
                onClick={() => handleViewProject(project)}
              >
                <Meta
                  title={project.title}
                  description={
                    <Paragraph type="secondary" ellipsis>
                      {project.description}
                    </Paragraph>
                  }
                />
                {/* Barra de progreso + recaudado/goal */}
                <div style={{ marginTop: 12 }}>
                  <Progress
                    percent={percent}
                    status="active"
                    showInfo={false}
                    strokeWidth={12}
                    style={{ marginBottom: 4 }}
                  />
                  <div style={{ fontWeight: "bold", fontSize: 14 }}>
                    {project.raised.toLocaleString()} {project.currency} recaudados
                    <span style={{ color: "#999", marginLeft: 8 }}>
                      (meta: {project.goal.toLocaleString()} {project.currency})
                    </span>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Paginación */}
      <Row justify="end" style={{ marginTop: 24 }}>
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={totalItems}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </Row>

      {/* Modal de Detalles */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        title={selectedProject?.title}
        footer={[
          <Button
            key="postular"
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handlePostular}
          >
            Postular
          </Button>,
          <Button
            key="like"
            icon={<HeartOutlined style={{ color: "hotpink" }} />}
            onClick={handleLike}
          >
            Dar Me Gusta
          </Button>,
          <Button key="close" onClick={handleCloseModal}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedProject && (
          <>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{
                  maxHeight: 200,
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </div>
            {/* Barra de progreso */}
            <Paragraph>
              <strong>Descripción:</strong> {selectedProject.description}
            </Paragraph>
            <Divider />

            {/* Cálculo de progreso */}
            <Progress
              percent={Math.min(
                Math.round(
                  (selectedProject.raised / selectedProject.goal) * 100
                ),
                100
              )}
              status="active"
              strokeWidth={12}
              style={{ marginBottom: 8 }}
            />
            <Paragraph style={{ fontWeight: "bold", fontSize: 14 }}>
              {selectedProject.raised.toLocaleString()} {selectedProject.currency} recaudados
              <span style={{ color: "#999", marginLeft: 8 }}>
                (meta: {selectedProject.goal.toLocaleString()}{" "}
                {selectedProject.currency})
              </span>
            </Paragraph>
            <Paragraph>
              <strong>Categoría:</strong> {selectedProject.category}
            </Paragraph>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProjectsUser;
