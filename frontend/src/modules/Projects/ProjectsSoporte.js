// src/modules/Projects/ProjectsSoporte.js

import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Modal,
  message,
  Typography,
  Divider,
  Tag,
  Select,
  Pagination,
} from "antd";
import { EyeOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";

// Importamos las imágenes locales desde la carpeta src/assets/images
import cover1 from "../../assets/IMAGEN1.avif";
import cover2 from "../../assets/IMAGEN 2.avif";
import cover3 from "../../assets/IMAGEN3.avif";
import cover4 from "../../assets/IMAGEN4.avif";
import cover5 from "../../assets/IMAGEN5.avif";

const { Title, Text } = Typography;
const { Option } = Select;

// Cantidad de proyectos por página (8 para 2 filas x 4 columnas)
const PAGE_SIZE = 8;

const ProjectsSoporte = () => {
  // Estado con la lista completa de proyectos
  const [projects, setProjects] = useState([]);
  // Categoría seleccionada en el filtro
  const [filterCategory, setFilterCategory] = useState("all");
  // Control de Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Proyecto seleccionado al dar clic en "Ver"
  const [selectedProject, setSelectedProject] = useState(null);
  // Página actual de la paginación
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Simula la carga de proyectos:
    // Aquí creamos 9 proyectos de ejemplo
    // repetimos algunas imágenes para demostrar el uso
    const sampleProjects = [
      {
        id: 1,
        name: "Árboles Creativos",
        description: "Fomentar la creatividad con la naturaleza.",
        coverImage: cover1,
        meta: 15000,
        dueDate: "2025-02-12",
        category: "Educación",
        status: "Pendiente",
      },
      {
        id: 2,
        name: "Reciclaje Comunitario",
        description: "Recolección de desechos reciclables en la comunidad.",
        coverImage: cover2,
        meta: 10000,
        dueDate: "2025-05-10",
        category: "Medio Ambiente",
        status: "Pendiente",
      },
      {
        id: 3,
        name: "Educación Rural",
        description: "Mejorar la calidad de la educación en zonas rurales.",
        coverImage: cover3,
        meta: 20000,
        dueDate: "2025-03-20",
        category: "Educación",
        status: "Pendiente",
      },
      {
        id: 4,
        name: "Salud para Todos",
        description: "Programa de salud para comunidades vulnerables.",
        coverImage: cover4,
        meta: 18000,
        dueDate: "2025-06-15",
        category: "Salud",
        status: "Pendiente",
      },
      {
        id: 5,
        name: "Tecnología Inclusiva",
        description: "Capacitación en TI para jóvenes de escasos recursos.",
        coverImage: cover5,
        meta: 25000,
        dueDate: "2025-04-10",
        category: "Tecnología",
        status: "Pendiente",
      },
      {
        id: 6,
        name: "Reforestación Urbana",
        description: "Plantación de árboles para mejorar aire en la ciudad.",
        coverImage: cover1,
        meta: 12000,
        dueDate: "2025-09-01",
        category: "Medio Ambiente",
        status: "Pendiente",
      },
      {
        id: 7,
        name: "Alimentos Saludables",
        description: "Huertos urbanos para alimentación sana.",
        coverImage: cover2,
        meta: 9000,
        dueDate: "2025-08-25",
        category: "Salud",
        status: "Pendiente",
      },
      {
        id: 8,
        name: "Alfabetización Digital",
        description: "Cursos básicos de informática para adultos mayores.",
        coverImage: cover3,
        meta: 8000,
        dueDate: "2025-07-10",
        category: "Tecnología",
        status: "Pendiente",
      },
      {
        id: 9,
        name: "Clases de Arte",
        description: "Clases gratuitas de pintura y escultura para niños.",
        coverImage: cover4,
        meta: 5000,
        dueDate: "2025-10-12",
        category: "Educación",
        status: "Pendiente",
      },
    ];

    setProjects(sampleProjects);
  }, []);

  // Cambiar categoría en el filtro y resetear la página a 1
  const handleFilterChange = (value) => {
    setFilterCategory(value);
    setCurrentPage(1);
  };

  // Filtrar proyectos según la categoría elegida
  const filteredProjects =
    filterCategory === "all"
      ? projects
      : projects.filter((p) => p.category === filterCategory);

  // Paginación manual
  const totalItems = filteredProjects.length;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Al hacer clic en "Ver", se abre el modal con los detalles del proyecto
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  // Acciones simuladas de aprobación y rechazo
  const handleApprove = () => {
    message.success("Proyecto Aprobado");
    handleCloseModal();
  };

  const handleReject = () => {
    message.error("Proyecto Rechazado");
    handleCloseModal();
  };

  return (
    <div style={{ padding: 24 }}>
      {/* Encabezado con Título y Filtro */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3} style={{ marginBottom: 0 }}>
            Proyectos
          </Title>
        </Col>
        <Col>
          <Select
            value={filterCategory}
            onChange={handleFilterChange}
            style={{ width: 200 }}
          >
            <Option value="all">Todas las categorías</Option>
            <Option value="Educación">Educación</Option>
            <Option value="Medio Ambiente">Medio Ambiente</Option>
            <Option value="Salud">Salud</Option>
            <Option value="Tecnología">Tecnología</Option>
          </Select>
        </Col>
      </Row>

      {/* Grid de Tarjetas (4 columnas x 2 filas = 8 proyectos por página) */}
      <Row gutter={[16, 16]}>
        {paginatedProjects.map((project) => (
          <Col key={project.id} xs={24} sm={12} md={6}>
            <Card
              hoverable
              style={{
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              bodyStyle={{ minHeight: 130 }}
              cover={
                <div style={{ position: "relative" }}>
                  <img
                    alt={project.name}
                    src={project.coverImage}
                    style={{
                      height: 150,
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  {/* Etiqueta con la categoría en la esquina superior derecha */}
                  <div style={{ position: "absolute", top: 8, right: 8 }}>
                    <Tag color="blue">{project.category}</Tag>
                  </div>
                </div>
              }
              actions={[
                <Button
                  type="link"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetails(project)}
                >
                  Ver
                </Button>,
              ]}
            >
              <Card.Meta
                title={project.name}
                description={
                  <Text type="secondary" ellipsis>
                    {project.description}
                  </Text>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Paginación al final */}
      <Row justify="end" style={{ marginTop: 16 }}>
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={totalItems}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false} // Ocultamos el selector de 'items per page'
        />
      </Row>

      {/* Modal con Detalles del Proyecto */}
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        title={selectedProject?.name}
        footer={[
          <Button
            key="approve"
            type="primary"
            icon={<CheckOutlined />}
            onClick={handleApprove}
          >
            Aprobar
          </Button>,
          <Button
            key="reject"
            danger
            icon={<CloseOutlined />}
            onClick={handleReject}
          >
            Rechazar
          </Button>,
          <Button key="close" onClick={handleCloseModal}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedProject && (
          <>
            {/* Imagen en el modal */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <img
                src={selectedProject.coverImage}
                alt={selectedProject.name}
                style={{
                  maxHeight: 200,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            </div>

            <Title level={4}>{selectedProject.name}</Title>
            <Text>{selectedProject.description}</Text>
            <Divider />

            <p>
              <strong>Meta:</strong> ${selectedProject.meta}
            </p>
            <p>
              <strong>Fecha Límite:</strong> {selectedProject.dueDate}
            </p>
            <p>
              <strong>Categoría:</strong> {selectedProject.category}
            </p>
            <p>
              <strong>Estado:</strong> {selectedProject.status}
            </p>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ProjectsSoporte;
