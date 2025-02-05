// C:\Users\HP\Desktop\Economia_Colaborativa\frontend\src\modules\Landing\LandingPage.js

import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Carousel,
  Card,
  Typography,
  Tag,
  Progress,
  Divider,
  Pagination,
  Modal,
  message,
} from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  HeartOutlined,
} from "@ant-design/icons";

// === IMPORTAR IMÁGENES LOCALES (AJUSTA LOS NOMBRES SEGÚN TUS ARCHIVOS) ===
import heroImage from "../../assets/anime-scenery-4k-3840-x-2160-29kk3tkooaev5nob.jpg";
import featured1 from "../../assets/IMAGEN1.avif";
import featured2 from "../../assets/IMAGEN 2.avif";
import featured3 from "../../assets/paisajes-de-anime-en-4k.jpg";
import featured4 from "../../assets/IMAGEN3.avif";
import topic1 from "../../assets/IMAGEN4.avif";
import topic2 from "../../assets/photo-1737453642091-804a18d5deaa.avif";
import topic3 from "../../assets/photo-1737587653765-94bc8fe7b541.avif";
import cover1 from "../../assets/photo-1537442949530-d90f6a1377c3.avif";
import cover2 from "../../assets/photo-1735767975829-71496633d499.avif";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

// Tamaño de página para la vista de TODOS los proyectos (4×4 = 16)
const PAGE_SIZE = 16;

const LandingPage = () => {
  // Estado para alternar entre la Landing principal y la “Página” de todos los proyectos
  const [showAllProjects, setShowAllProjects] = useState(false);
  // Estado de paginación para la vista de todos los proyectos
  const [currentPage, setCurrentPage] = useState(1);

  // === MODAL PARA VER DETALLES DE CUALQUIER PROYECTO (FEATURED O DE “TODOS”) ===
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProject(null);
  };

  // Botón "Colaborar"
  const handleCollaborate = () => {
    const projectName = selectedProject?.title || selectedProject?.name || "el proyecto";
    message.info(`Te has postulado para ${projectName}.`);
    handleCloseModal();
  };

  // Botón "Like"
  const handleLike = () => {
    const projectName = selectedProject?.title || selectedProject?.name || "este proyecto";
    message.success(`Te ha gustado ${projectName}.`);
  };

  // ===============================
  // 1) PROYECTOS DEL CARRUSEL (FEATURED)
  // ===============================
  // Cambiamos todas las divisas a dólares
  const featuredProjects = [
    {
      id: 1,
      title: "Help Daniel Fight for His Life",
      raised: 117739,
      goal: 200000,
      currency: "$",
      image: featured1,
      donorsLabel: "2,1 mil. donativos",
    },
    {
      id: 2,
      title: "Making Millie Mobile",
      raised: 53835,
      goal: 100000,
      currency: "$",
      image: featured2,
      donorsLabel: "1,3 mil. donativos",
    },
    {
      id: 3,
      title: "Support The Shaffer Family",
      raised: 374707,
      goal: 500000,
      currency: "$",
      image: featured3,
      donorsLabel: "2,8 mil. donativos",
    },
    {
      id: 4,
      title: "Cancer Treatment for Anna",
      raised: 58561,
      goal: 80000,
      currency: "$",
      image: featured4,
      donorsLabel: "1 mil. donativos",
    },
  ];

  // 2) TEMAS DESTACADOS (No cambian currency, pues no usan recaudaciones)
  const featuredTopics = [
    {
      id: 1,
      title: "La Solidaridad en el Día Mundial Contra el Cáncer",
      description:
        "Únete para concienciar sobre la prevención y el tratamiento del cáncer.",
      image: topic1,
      tag: "Urgente",
      cta: "Donar ahora",
    },
    {
      id: 2,
      title: "Educación para Niños en Zonas Rurales",
      description:
        "Apoya campañas que impulsan la alfabetización y la construcción de escuelas.",
      image: topic2,
      tag: "Destacado",
      cta: "Conoce más",
    },
    {
      id: 3,
      title: "Ayuda a Refugiados",
      description:
        "Historias de familias que necesitan un nuevo comienzo. Colabora con proyectos de acogida.",
      image: topic3,
      tag: "Humanitario",
      cta: "Ver causas",
    },
  ];

  // 3) PROYECTOS COMPLETOS (para la sección “Más Proyectos”)
  const allProjects = [
    {
      id: 1,
      name: "Proyecto 1",
      description: "Descripción breve del proyecto 1",
      coverImage: cover1,
      category: "Educación",
    },
    {
      id: 2,
      name: "Proyecto 2",
      description: "Descripción breve del proyecto 2",
      coverImage: cover2,
      category: "Salud",
    },
    {
      id: 3,
      name: "Proyecto 3",
      description: "Descripción breve del proyecto 3",
      coverImage: cover1,
      category: "Tecnología",
    },
    {
      id: 4,
      name: "Proyecto 4",
      description: "Descripción breve del proyecto 4",
      coverImage: cover2,
      category: "Medio Ambiente",
    },
    {
      id: 5,
      name: "Proyecto 5",
      description: "Descripción breve del proyecto 5",
      coverImage: cover1,
      category: "Educación",
    },
    {
      id: 6,
      name: "Proyecto 6",
      description: "Descripción breve del proyecto 6",
      coverImage: cover2,
      category: "Salud",
    },
    {
      id: 7,
      name: "Proyecto 7",
      description: "Descripción breve del proyecto 7",
      coverImage: cover1,
      category: "Educación",
    },
    {
      id: 8,
      name: "Proyecto 8",
      description: "Descripción breve del proyecto 8",
      coverImage: cover2,
      category: "Salud",
    },
    {
      id: 9,
      name: "Proyecto 9",
      description: "Descripción breve del proyecto 9",
      coverImage: cover1,
      category: "Tecnología",
    },
    {
      id: 10,
      name: "Proyecto 10",
      description: "Descripción breve del proyecto 10",
      coverImage: cover2,
      category: "Salud",
    },
    {
      id: 11,
      name: "Proyecto 11",
      description: "Descripción breve del proyecto 11",
      coverImage: cover1,
      category: "Tecnología",
    },
    {
      id: 12,
      name: "Proyecto 12",
      description: "Descripción breve del proyecto 12",
      coverImage: cover2,
      category: "Salud",
    },
  ];

  // ===============================
  // VISTA “LANDING” (Página principal)
  // ===============================
  const renderLanding = () => {
    return (
      <div style={{ width: "100%", overflow: "hidden" }}>
        {/* === HERO SECTION === */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "600px",
            background: `url('${heroImage}') center/cover no-repeat`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div style={{ maxWidth: 800, padding: 20 }}>
            <Title level={1} style={{ color: "#fff", fontWeight: "bold" }}>
              Tu lugar para ayudar
            </Title>
            <Paragraph style={{ fontSize: 18, marginBottom: 32, color: "#fff" }}>
              Únete a miles de personas que recaudan fondos y hacen realidad
              proyectos solidarios.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              style={{ borderRadius: 6, fontSize: 16 }}
            >
              Iniciar una recaudación
            </Button>
          </div>
        </div>

        {/* === SECCIÓN DESCUBRE RECAUDACIONES === */}
        <div style={{ padding: "50px 20px", textAlign: "center" }}>
          <Title level={2} style={{ marginBottom: 20 }}>
            Descubre recaudaciones que se inspiran en las causas que te importan
          </Title>
          <Paragraph style={{ marginBottom: 40 }}>
            Seleccionadas especialmente para ti
          </Paragraph>

          <Carousel
            arrows
            slidesToShow={3}
            slidesToScroll={1}
            // El Carousel de Ant Design no soporta "responsive" nativo al 100%.
            // Si deseas más control, puedes usar react-slick.
          >
            {featuredProjects.map((proj) => {
              const percent = Math.min(
                Math.round((proj.raised / proj.goal) * 100),
                100
              );
              return (
                <div key={proj.id} style={{ padding: 10 }}>
                  <Card
                    hoverable
                    cover={
                      <div style={{ position: "relative" }}>
                        <img
                          src={proj.image}
                          alt={proj.title}
                          style={{ width: "100%", height: 200, objectFit: "cover" }}
                        />
                        {/* Etiqueta con donativos */}
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            left: 10,
                            background: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            padding: "3px 6px",
                            borderRadius: 4,
                          }}
                        >
                          {proj.donorsLabel}
                        </div>
                      </div>
                    }
                    actions={[
                      <Button
                        type="link"
                        onClick={() => handleViewProject(proj)}
                        style={{ fontWeight: "bold" }}
                      >
                        Ver
                      </Button>,
                    ]}
                  >
                    <Meta
                      title={proj.title}
                      description={
                        <div style={{ marginTop: 8 }}>
                          <Progress
                            percent={percent}
                            status="active"
                            showInfo={false}
                            strokeWidth={12}
                            style={{ marginBottom: 4 }}
                          />
                          <div style={{ fontWeight: "bold", fontSize: 14 }}>
                            {proj.raised.toLocaleString()} {proj.currency} recaudados
                            <span style={{ color: "#999", marginLeft: 8 }}>
                              (meta: {proj.goal.toLocaleString()} {proj.currency})
                            </span>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </div>
              );
            })}
          </Carousel>
        </div>

        {/* === TEMAS DESTACADOS === */}
        <div style={{ padding: "50px 20px" }}>
          <Title level={3} style={{ marginBottom: 30 }}>
            Temas destacados
          </Title>
          <Row gutter={24}>
            {featuredTopics.map((topic) => (
              <Col xs={24} md={8} key={topic.id} style={{ marginBottom: 20 }}>
                <Card
                  hoverable
                  cover={
                    <div style={{ position: "relative" }}>
                      <img
                        src={topic.image}
                        alt={topic.title}
                        style={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          borderRadius: 4,
                        }}
                      />
                      <Tag
                        color="magenta"
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {topic.tag}
                      </Tag>
                    </div>
                  }
                >
                  <Meta
                    title={topic.title}
                    description={
                      <Paragraph style={{ marginTop: 8, fontSize: 14 }}>
                        {topic.description}
                      </Paragraph>
                    }
                  />
                  <Button
                    type="link"
                    style={{ marginTop: 8, paddingLeft: 0 }}
                    icon={<ArrowRightOutlined />}
                  >
                    {topic.cta}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* === SECCIÓN "CÓMO FUNCIONA" (OPCIONAL) === */}
        <div style={{ padding: "50px 20px", background: "#fafafa" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 40 }}>
            ¿Cómo funciona?
          </Title>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: "center" }} hoverable>
                <Title level={4}>1. Crea tu campaña</Title>
                <Paragraph>
                  Configura tu recaudación en pocos pasos. Añade tu historia,
                  imágenes, meta y recompensas.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: "center" }} hoverable>
                <Title level={4}>2. Comparte con otros</Title>
                <Paragraph>
                  Difunde tu proyecto en redes sociales y con amigos para
                  alcanzar más rápido tu meta.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: "center" }} hoverable>
                <Title level={4}>3. Recibe aportes</Title>
                <Paragraph>
                  De donaciones puntuales a préstamos o acciones. Elige el modelo
                  que más te convenga.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: "center" }} hoverable>
                <Title level={4}>4. Cumple tus metas</Title>
                <Paragraph>
                  Consigue el financiamiento que necesitas y haz realidad tu
                  proyecto.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* === BOTÓN "MÁS PROYECTOS" === */}
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => setShowAllProjects(true)}
          >
            Más Proyectos
          </Button>
        </div>
      </div>
    );
  };

  // ===============================
  // VISTA “TODOS LOS PROYECTOS”
  // ===============================
  const renderAllProjects = () => {
    const totalItems = allProjects.length;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedData = allProjects.slice(startIndex, endIndex);

    return (
      <div style={{ padding: 24 }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          Todos los Proyectos Publicados
        </Title>

        <Row gutter={[16, 16]}>
          {paginatedData.map((project) => (
            <Col key={project.id} xs={24} sm={12} md={6}>
              <Card
                hoverable
                style={{
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
                bodyStyle={{ minHeight: 120 }}
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
                    {/* Etiqueta con la categoría en la esquina superior */}
                    <div style={{ position: "absolute", top: 8, right: 8 }}>
                      <Tag color="blue">{project.category}</Tag>
                    </div>
                  </div>
                }
                onClick={() => handleViewProject(project)} // Al hacer clic en la tarjeta
              >
                <Meta
                  title={project.name}
                  description={
                    <Paragraph type="secondary" ellipsis>
                      {project.description}
                    </Paragraph>
                  }
                />
              </Card>
            </Col>
          ))}
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

        <Divider />

        {/* Botón para volver a la Landing */}
        <Button
          type="default"
          icon={<ArrowLeftOutlined />}
          onClick={() => setShowAllProjects(false)}
        >
          Volver
        </Button>
      </div>
    );
  };

  // ===============================
  // MODAL DE DETALLES (COMPARTIDO)
  // ===============================
  // Muestra datos distintos según si es un "featuredProject" o uno de "allProjects"
  const renderProjectModal = () => {
    if (!selectedProject) return null;

    // Si el proyecto viene del carrusel, tendrá `title` y `raised`.
    // Si viene de "allProjects", tendrá `name`, `description`, etc.
    const title = selectedProject.title || selectedProject.name || "Proyecto";
    const image = selectedProject.image || selectedProject.coverImage;
    const hasFunds = selectedProject.raised !== undefined; // ver si existe raised/goal

    const percent = hasFunds
      ? Math.min(Math.round((selectedProject.raised / selectedProject.goal) * 100), 100)
      : 0;

    return (
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        title={title}
        footer={[
          <Button key="collaborate" type="primary" onClick={handleCollaborate}>
            Colaborar
          </Button>,
          <Button
            key="like"
            icon={<HeartOutlined style={{ color: "hotpink" }} />}
            onClick={handleLike}
          >
            Me gusta
          </Button>,
          <Button key="close" onClick={handleCloseModal}>
            Cerrar
          </Button>,
        ]}
      >
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <img
            src={image}
            alt={title}
            style={{
              maxHeight: 200,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        </div>
        {/* Si es un proyecto con recaudaciones, mostramos la barra y cifras */}
        {hasFunds && (
          <>
            <Progress
              percent={percent}
              status="active"
              showInfo={false}
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
            {selectedProject.donorsLabel && (
              <Tag color="geekblue" style={{ marginBottom: 8 }}>
                {selectedProject.donorsLabel}
              </Tag>
            )}
            <Divider />
          </>
        )}
        {/* Descripción si existe */}
        <Paragraph>
          {selectedProject.description
            ? selectedProject.description
            : "Sin descripción adicional"}
        </Paragraph>
        {/* Si existe categoría, la mostramos */}
        {selectedProject.category && (
          <Paragraph>
            <strong>Categoría:</strong> {selectedProject.category}
          </Paragraph>
        )}
      </Modal>
    );
  };

  // ===============================
  // RENDER FINAL CONDICIONAL
  // ===============================
  return (
    <>
      {showAllProjects ? renderAllProjects() : renderLanding()}
      {renderProjectModal()}
    </>
  );
};

export default LandingPage;
