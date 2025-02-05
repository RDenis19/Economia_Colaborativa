// C:\Users\HP\Desktop\Economia_Colaborativa\frontend\src\modules\Landing\LandingPage.js

import React from "react";
// (NUEVO) Importamos Progress para la barra de meta
import { Row, Col, Button, Carousel, Card, Typography, Tag, Progress } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Meta } = Card;

/**
 * Ejemplo de Landing Page inspirada en GoFundMe.
 * Incluye:
 * - Hero Section con imagen y llamada a la acción
 * - Slider/Carousel de "recaudaciones destacadas"
 * - Sección de "Temas destacados"
 * - (OPCIONAL) Bloque "Cómo funciona"
 */
const LandingPage = () => {
  // (NUEVO) Puedes cambiar esta URL por otra imagen que quieras en tu Hero
  const heroImageUrl =
    "https://img.freepik.com/foto-gratis/pintura-lago-montana-montana-al-fondo_188544-9126.jpg?t=st=1738715047~exp=1738718647~hmac=9221c11a82ca9cb60da7312e349f49c3084ffc81b1a62496b3a806de8f91ff58&w=1060";

  // Mock de proyectos destacados para el slider
  // (NUEVO) Agregamos "goal" (meta) y cambiamos las imágenes por algo más “tranquilo”
  const featuredProjects = [
    {
      id: 1,
      title: "Help Daniel Fight for His Life",
      raised: 117739,
      goal: 200000, // (NUEVO) Meta
      currency: "€",
      image:
        "https://images.unsplash.com/photo-1491429472539-07f5f2827cdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      donorsLabel: "2,1 mil. donativos",
    },
    {
      id: 2,
      title: "Making Millie Mobile",
      raised: 53835,
      goal: 100000,
      currency: "£",
      image:
        "https://images.unsplash.com/photo-1492354462521-f205b3efe5eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      donorsLabel: "1,3 mil. donativos",
    },
    {
      id: 3,
      title: "Support The Shaffer Family",
      raised: 374707,
      goal: 500000,
      currency: "$",
      image:
        "https://images.unsplash.com/photo-1526362098511-44b2eafa631e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      donorsLabel: "2,8 mil. donativos",
    },
    {
      id: 4,
      title: "Cancer Treatment for Anna",
      raised: 58561,
      goal: 80000,
      currency: "€",
      image:
        "https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      donorsLabel: "1 mil. donativos",
    },
  ];

  // Mock de temas destacados
  const featuredTopics = [
    {
      id: 1,
      title: "La Solidaridad en el Día Mundial Contra el Cáncer",
      description:
        "Únete para concienciar sobre la prevención y el tratamiento del cáncer. Salvemos millones de vidas.",
      image:
        "https://images.unsplash.com/photo-1595433562696-3d969efbc027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "Urgente",
      cta: "Donar ahora",
    },
    {
      id: 2,
      title: "Educación para Niños en Zonas Rurales",
      description:
        "Apoya campañas que impulsan la alfabetización y la construcción de escuelas en áreas vulnerables.",
      image:
        "https://images.unsplash.com/photo-1603234628366-037c3f5b7792?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "Destacado",
      cta: "Conoce más",
    },
    {
      id: 3,
      title: "Ayuda a Refugiados",
      description:
        "Historias de familias que necesitan un nuevo comienzo. Colabora con proyectos de acogida y bienestar.",
      image:
        "https://images.unsplash.com/photo-1567740749101-444aaf480d25?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tag: "Humanitario",
      cta: "Ver causas",
    },
  ];

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* =========================
          HERO SECTION
      ========================= */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "600px",
          // (NUEVO) Tomamos la URL de la variable heroImageUrl
          background: `url('${heroImageUrl}') center/cover no-repeat`,
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
          <Paragraph style={{ fontSize: 18, marginBottom: 32, color: "#fff"}}>
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

      {/* =========================
          SECCIÓN "DESCUBRE RECAUDACIONES"
      ========================= */}
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
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
          ]}
          // Nota: El Carousel de Ant Design no soporta nativamente "responsive" como react-slick. 
          // Podrías usar "react-slick" si deseas un carrusel más personalizable.
        >
          {featuredProjects.map((proj) => {
            // (NUEVO) Cálculo de progreso
            const percent = Math.min(
              Math.round((proj.raised / proj.goal) * 100),
              100
            );
            return (
              <div key={proj.id} style={{ padding: 10 }}>
                <Card
                  cover={
                    <div style={{ position: "relative" }}>
                      <img
                        src={proj.image}
                        alt={proj.title}
                        style={{ width: "100%", height: 200, objectFit: "cover" }}
                      />
                      {/* Capa para el label de donativos */}
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
                  hoverable
                >
                  <Meta
                    title={proj.title}
                    description={
                      <div style={{ marginTop: 8 }}>
                        {/* (NUEVO) Barra de progreso animada */}
                        <Progress
                          percent={percent}
                          status="active"
                          showInfo={false}
                          strokeWidth={12}
                          style={{ marginBottom: 4 }}
                        />
                        {/* (NUEVO) Muestra recaudado vs meta */}
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

      {/* =========================
          SECCIÓN TEMAS DESTACADOS
      ========================= */}
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

      {/* =========================
          (OPCIONAL) SECCIÓN "CÓMO FUNCIONA"
      ========================= */}
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
                Difunde tu proyecto en redes sociales y con amigos para alcanzar
                más rápido tu meta.
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
    </div>
  );
};

export default LandingPage;
