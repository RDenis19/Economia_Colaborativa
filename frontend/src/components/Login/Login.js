// src/components/Login/Login.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Form, Input, Button, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../../auth/AuthContext";
import FotoLogin from "../../assets/FotoLogin.png"; // Asegúrate de tener esta imagen
import "./Login.css";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const { setRoles } = useContext(AuthContext); // Obtenemos la función para actualizar roles
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Datos de usuario hardcodeados
  const usuariosHardcodeados = [
    { email: "admin@example.com", contraseña: "1234", rol_id: 1 },
    { email: "creador@example.com", contraseña: "1234", rol_id: 2 },
    { email: "usuario@example.com", contraseña: "1234", rol_id: 3 },
    { email: "soporte@example.com", contraseña: "1234", rol_id: 4 },
  ];

  const handleLogin = (values) => {
    setError("");
    // Buscar el usuario en los datos hardcodeados
    const usuarioEncontrado = usuariosHardcodeados.find(
      (user) =>
        user.email.toLowerCase() === values.email.toLowerCase() &&
        user.contraseña === values.contraseña
    );

    if (!usuarioEncontrado) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
      return;
    }

    // Mapeo de rol_id a nombre del rol
    const roleMap = {
      1: "administrador",
      2: "creador",
      3: "usuario",
      4: "soporte",
    };

    const userRoles = [roleMap[usuarioEncontrado.rol_id]];
    setRoles(userRoles); // Actualizamos el contexto con los roles

    navigate("/dashboard"); // Redirigimos al dashboard
  };

  return (
    <Layout className="login-layout">
      <Content>
        <Row justify="center" align="middle" className="login-container">
          {/* Lado izquierdo con imagen */}
          <Col xs={24} sm={12} className="login-image">
            <div className="login-illustration">
              <img
                src={FotoLogin}
                alt="Login"
                className="login-img"
              />
              <div className="login-caption">
                <p>
                  Bienvenido a <strong>CoFinance</strong>, donde tus finanzas
                  encuentran soluciones.
                </p>
              </div>
            </div>
          </Col>

          {/* Formulario de Login */}
          <Col xs={24} sm={12} className="login-form-container">
            <div className="login-form-box">
              <Title level={2}>Iniciar Sesión</Title>
              <Form
                name="login"
                layout="vertical"
                onFinish={handleLogin}
                className="login-form"
              >
                <Form.Item
                  name="email"
                  label="Correo Electrónico"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, introduce tu correo",
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Correo Electrónico"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="contraseña"
                  label="Contraseña"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, introduce tu contraseña",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Contraseña"
                    size="large"
                  />
                </Form.Item>
                {error && <p className="login-error">{error}</p>}
                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Ingresar
                  </Button>
                </Form.Item>
              </Form>
              <div className="login-info">
                <p>
                  <strong>Usuarios de prueba:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Administrador:</strong> admin@example.com / 1234
                  </li>
                  <li>
                    <strong>Creador:</strong> creador@example.com / 1234
                  </li>
                  <li>
                    <strong>Usuario:</strong> usuario@example.com / 1234
                  </li>
                  <li>
                    <strong>Soporte:</strong> soporte@example.com / 1234
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
