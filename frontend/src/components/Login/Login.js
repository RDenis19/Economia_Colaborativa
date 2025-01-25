import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Layout, Form, Input, Button, Typography, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../../auth/AuthContext";
import { loginRequest } from "../../utils/api";
import FotoLogin from "../../assets/FotoLogin.png"; // Importa la imagen
import "./Login.css";

const { Content } = Layout;
const { Title } = Typography;

const Login = () => {
  const { setRoles } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setError("");
    try {
      const response = await loginRequest({
        correo: values.email,
        contraseña: values.contraseña,
      });
  
      const { token } = response;
      localStorage.setItem("jwt_token", token);
  
      // Decodifica el token y extrae roles
      const decoded = jwtDecode(token);
      const userRoles = decoded.rol_id ? [decoded.rol_id] : []; // Asegúrate de que el backend envíe `rol_id`
  
      setRoles(userRoles); // Configura roles en el contexto
      navigate("/dashboard"); // Redirige a MainView
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };
  
  return (
    <Layout className="login-layout">
      <Content>
        <Row justify="center" align="middle" className="login-container">
          {/* Imagen en el lado izquierdo */}
          <Col xs={24} sm={12} className="login-image">
            <div className="login-illustration">
              <img
                src={FotoLogin} // Usa la imagen importada
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

          {/* Formulario de login */}
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
                {error && (
                  <p className="login-error">{error}</p>
                )}
                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    Ingresar
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
