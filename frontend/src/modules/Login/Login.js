import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Form, Input, Button, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import FotoLogin from "../../assets/FotoLogin.png";
import "./Login.css";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook de React Router

  const handleLogin = async (values) => {
    setError("");
    try {
      /* const { email, password } = values;  */

      // Simular datos del backend
      const data = {
        token: "fakeToken123", // Simulando un token
        data: { rol: "Administrador" }, // Simulando un rol
      };

      console.log("Datos simulados:", data);

      // --- SECCIÓN DEL TOKEN COMENTADA ---
      /*
      if (!data?.token) {
        throw new Error("Respuesta inválida del servidor.");
      }

      const { token, data: { rol } } = data;

      // Guardar datos en localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", rol);
      localStorage.setItem("jwt_token", token);
      */
      // -----------------------------------

      // Rutas según el rol del usuario
      const routes = {
        Administrador: "/admin/dashboard",
        Prestamista: "/prestamista/dashboard",
        Prestatario: "/prestatario/dashboard",
        Soporte: "/soporte/dashboard",
      };

      // Redirigir usando React Router
      const rol = data.data.rol; // Simular el rol
      if (routes[rol]) {
        navigate(routes[rol]);
      } else {
        throw new Error("Rol no reconocido.");
      }
    } catch (err) {
      console.error("Error en el login:", err);
      setError(err.message || "Usuario No Reconocido.");
    }
  };

  return (
    <Layout className="login-layout">
      <Content>
        <Row justify="center" align="middle" className="login-container">
          <Col xs={24} sm={12} className="login-image">
            <div className="illustration">
              <img src={FotoLogin} alt="Innovación" className="login-illustration" />
              <p className="login-caption">
                Innovación que transforma tu presente y asegura tu futuro!
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} className="login-form">
            <Title level={2}>Bienvenido a CoFinance</Title>
            <Form
              name="login"
              layout="vertical"
              className="form"
              onFinish={handleLogin} // Llama a handleLogin al enviar el formulario
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
                name="password"
                label="Contraseña"
                rules={[
                  { required: true, message: "Por favor, introduce tu contraseña" },
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
