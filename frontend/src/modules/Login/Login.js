import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Layout, Form, Input, Button, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { loginRequest } from "../../utils/api";
import "./Login.css";
import FotoLogin from "../../assets/FotoLogin.png";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Objeto que define las rutas según los roles
  const routes = {
    Administrador: "/admin/dashboard",
    Prestamista: "/prestamista/dashboard",
    Prestatario: "/prestatario/dashboard",
    Soporte: "/soporte/dashboard",
  };

  const handleLogin = async (values) => {
    setError("");
    try {
      const response = await loginRequest({
        correo: values.email,
        contraseña: values.contraseña, // El backend espera "contraseña"
      });

      // Guardar el token en localStorage
      const { token } = response;
      localStorage.setItem("jwt_token", token);

      // Decodificar el token para obtener el rol del usuario
      const decoded = jwtDecode(token);
      const userRole = decoded.rol; // Obtenemos el rol del usuario desde el token

      console.log("Rol decodificado desde el token:", userRole);

      // Verificar si el rol tiene una ruta asignada
      if (routes[userRole]) {
        localStorage.setItem("userRole", userRole); // Guardar rol en localStorage
        navigate(routes[userRole]); // Redirigir al usuario a su dashboard
      } else {
        throw new Error("Rol no reconocido.");
      }
    } catch (err) {
      // Manejo de errores: Mostrar mensaje del backend o error genérico
      try {
        const parsedError = JSON.parse(err.message);
        setError(parsedError.mensaje || "Error desconocido al iniciar sesión.");
      } catch (parseError) {
        setError(err.message || "Error desconocido.");
      }
    }
  };

  return (
    <Layout className="login-layout">
      <Content>
        <Row justify="center" align="middle" className="login-container">
          <Col xs={24} sm={12} className="login-image">
            <div className="illustration">
              <img
                src={FotoLogin}
                alt="Innovación"
                className="login-illustration"
              />
              <p className="login-caption">
                Innovación que transforma tu presente y asegura tu futuro.
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} className="login-form">
            <Title level={2}>Bienvenido a CoFinance</Title>
            <Form
              name="login"
              layout="vertical"
              className="form"
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                label="Correo"
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
                  placeholder="Correo"
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
              {error && <p className="error">{error}</p>}
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
