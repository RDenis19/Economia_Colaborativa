// Usuario.jsx
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Button,
  Table,
  Modal,
  Space,
  Tag,
  Popconfirm,
  message,
  Divider,
  Descriptions,
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Option } = Select;
const STORAGE_KEY = 'usuarios-crowlanding';

const Usuario = () => {
  // Estados principales
  const [usuarios, setUsuarios] = useState([]);
  // Filtros de búsqueda
  const [filtroBusqueda, setFiltroBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState(null);
  // Usuario activo para edición o detalle
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  // Modo del formulario: 'crear' o 'editar'
  const [modoFormulario, setModoFormulario] = useState('crear');
  // Estado de visibilidad de los modales
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  // Referencia al formulario
  const [form] = Form.useForm();

  // Cargar usuarios desde localStorage al iniciar el componente
  useEffect(() => {
    const datosGuardados = localStorage.getItem(STORAGE_KEY);
    if (datosGuardados) {
      setUsuarios(JSON.parse(datosGuardados));
    }
  }, []);

  // Guardar en localStorage cada vez que se actualicen los usuarios
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
  }, [usuarios]);

  // Función para filtrar usuarios
  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda = filtroBusqueda
      ? u.cedula.toString().includes(filtroBusqueda) ||
        u.usuario.toLowerCase().includes(filtroBusqueda.toLowerCase())
      : true;
    const coincideEstado = filtroEstado ? u.estado === filtroEstado : true;
    return coincideBusqueda && coincideEstado;
  });

  // Función para iniciar la vista de agregar usuario
  const iniciarAgregar = () => {
    setModoFormulario('crear');
    form.resetFields();
    setUsuarioActivo(null);
    setFormModalVisible(true);
  };

  // Función para iniciar la vista de editar usuario
  const iniciarEditar = (usuario) => {
    setModoFormulario('editar');
    setUsuarioActivo(usuario);
    form.setFieldsValue(usuario);
    setFormModalVisible(true);
  };

  // Función para ver el detalle del usuario
  const verDetalleUsuario = (usuario) => {
    setUsuarioActivo(usuario);
    setViewModalVisible(true);
  };

  // Función para eliminar usuario
  const eliminarUsuario = (cedula) => {
    setUsuarios(usuarios.filter((u) => u.cedula !== cedula));
    message.success('Usuario eliminado');
  };

  // Simular verificación para completar campos adicionales
  const verificarUsuario = () => {
    const cedula = form.getFieldValue('cedula');
    if (!cedula) {
      message.error('Ingrese la cédula para verificar');
      return;
    }
    form.setFieldsValue({
      nombre: `Nombre ${cedula}`,
      apellido: `Apellido ${cedula}`,
      ocupacion: `Ocupación ${cedula}`,
      nivel_estudios: `Nivel de Estudios ${cedula}`,
      titulo_universitario: `Título Universitario ${cedula}`,
      provincia: 'Provincia X',
      canton: 'Cantón Y',
      parroquia: 'Parroquia Z',
      callePrincipal: `Calle Principal ${cedula}`,
      calleSecundaria: `Calle Secundaria ${cedula}`,
      nroCasa: '123',
      lugar_referencia: `Lugar Referencia ${cedula}`,
      celularPrincipal: '0999999999',
      celularReferencia: '0888888888',
      telefonoFijo: '022222222',
      ingreso_mensual: '1000',
      gasto_mensual_promedio: '500',
      gasto_endeudamiento: '200',
      patrimonio: '1500',
      estado_identidad: 'Verificado',
      estado_domicilio: 'Verificado',
      estado_ingresos: 'Pendiente',
      estado_antecedentes: 'Aprobado',
      fecha_solicitud: new Date().toISOString().split('T')[0]
    });
    message.success('Información verificada y campos completados');
  };

  // Manejo del envío del formulario (crear o editar)
  const onFinish = (values) => {
    if (modoFormulario === 'crear') {
      // Verificar que no exista la cédula
      const existe = usuarios.some((u) => u.cedula === values.cedula);
      if (existe) {
        message.error('Ya existe un usuario con esa cédula');
        return;
      }
      setUsuarios([...usuarios, values]);
      message.success('Usuario creado exitosamente');
    } else if (modoFormulario === 'editar') {
      setUsuarios(usuarios.map((u) => (u.cedula === usuarioActivo.cedula ? values : u)));
      message.success('Usuario actualizado exitosamente');
    }
    form.resetFields();
    setFormModalVisible(false);
  };

  // Definición de las columnas de la tabla
  const columns = [
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula'
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario'
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo'
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      render: (rol) => {
        let color = '';
        switch (rol) {
          case 'Administrador':
            color = 'volcano';
            break;
          case 'Creador':
            color = 'geekblue';
            break;
          case 'Soporte':
            color = 'purple';
            break;
          default:
            color = 'green';
        }
        return <Tag color={color}>{rol}</Tag>;
      }
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => <Tag color={estado === 'Activo' ? 'green' : 'red'}>{estado}</Tag>
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => verDetalleUsuario(record)} />
          <Button type="link" icon={<EditOutlined />} onClick={() => iniciarEditar(record)} />
          <Popconfirm
            title="¿Seguro que desea eliminar este usuario?"
            onConfirm={() => eliminarUsuario(record.cedula)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  // Estilos (idénticos a CategoryDashboard.js)
  const containerStyle = {
    minHeight: "100vh",
    background: "#f0f2f5",
  };

  const headerStyle = {
    background: "#001529",
    padding: "0 24px",
  };

  const headerTitleStyle = {
    color: "#fff",
    fontSize: "24px",
    lineHeight: "64px",
    margin: 0,
  };

  const contentStyle = {
    margin: "24px",
  };

  const cardStyle = {
    marginBottom: "24px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <Layout style={containerStyle}>
      <Header style={headerStyle}>
        <Row align="middle">
          <Col>
            <UserOutlined style={{ fontSize: "32px", color: "#fff", marginRight: "16px" }} />
          </Col>
          <Col>
            <h1 style={headerTitleStyle}>Gestión de Usuarios - Crowlanding</h1>
          </Col>
        </Row>
      </Header>
      <Content style={contentStyle}>
        <Card title="Administrar Usuarios" style={cardStyle}>
          <Row gutter={16} style={{ marginBottom: "16px" }}>
            <Col xs={24} md={8}>
              <Input.Search
                placeholder="Buscar por cédula o usuario"
                prefix={<SearchOutlined />}
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} md={6}>
              <Select
                placeholder="Filtrar por estado"
                style={{ width: "100%" }}
                allowClear
                value={filtroEstado}
                onChange={setFiltroEstado}
              >
                <Option value="Activo">Activo</Option>
                <Option value="Inactivo">Inactivo</Option>
              </Select>
            </Col>
            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={iniciarAgregar}>
                Agregar Usuario
              </Button>
            </Col>
          </Row>
          <Table
            columns={columns}
            dataSource={usuariosFiltrados}
            rowKey="cedula"
            bordered
          />
        </Card>

        {/* Modal para Agregar / Editar Usuario */}
        <Modal
          title={modoFormulario === 'crear' ? 'Agregar Usuario' : 'Editar Usuario'}
          visible={formModalVisible}
          onCancel={() => { form.resetFields(); setFormModalVisible(false); }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="Cédula"
                  name="cedula"
                  rules={[{ required: true, message: 'Ingrese la cédula' }]}
                >
                  <Input disabled={modoFormulario === 'editar'} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Usuario"
                  name="usuario"
                  rules={[{ required: true, message: 'Ingrese el nombre de usuario' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Correo"
                  name="correo"
                  rules={[
                    { required: true, message: 'Ingrese el correo' },
                    { type: 'email', message: 'Ingrese un correo válido' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Género"
                  name="genero"
                  rules={[{ required: true, message: 'Seleccione el género' }]}
                >
                  <Select placeholder="Seleccione género">
                    <Option value="Masculino">Masculino</Option>
                    <Option value="Femenino">Femenino</Option>
                    <Option value="Otro">Otro</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="Rol"
                  name="rol"
                  rules={[{ required: true, message: 'Seleccione el rol' }]}
                >
                  <Select placeholder="Seleccione un rol">
                    <Option value="Administrador">Administrador</Option>
                    <Option value="Creador">Creador</Option>
                    <Option value="Usuario">Usuario</Option>
                    <Option value="Soporte">Soporte</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Estado"
                  name="estado"
                  rules={[{ required: true, message: 'Seleccione el estado' }]}
                >
                  <Select placeholder="Seleccione estado">
                    <Option value="Activo">Activo</Option>
                    <Option value="Inactivo">Inactivo</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[{ required: true, message: 'Ingrese el nombre' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Apellido"
                  name="apellido"
                  rules={[{ required: true, message: 'Ingrese el apellido' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  label="Contraseña"
                  name="contrasena"
                  rules={[{ required: true, message: 'Ingrese la contraseña' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item>
                  <Button type="dashed" onClick={verificarUsuario}>
                    Verificar
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left">Información Adicional</Divider>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Ocupación" name="ocupacion">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Nivel de Estudios" name="nivel_estudios">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Título Universitario" name="titulo_universitario">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Provincia" name="provincia">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Cantón" name="canton">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Parroquia" name="parroquia">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Calle Principal" name="callePrincipal">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Calle Secundaria" name="calleSecundaria">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Nro Casa" name="nroCasa">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Lugar Referencia" name="lugar_referencia">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Celular Principal" name="celularPrincipal">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Celular Referencia" name="celularReferencia">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Teléfono Fijo" name="telefonoFijo">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Ingreso Mensual" name="ingreso_mensual">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Gasto Mensual Promedio" name="gasto_mensual_promedio">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Gasto Endeudamiento" name="gasto_endeudamiento">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Patrimonio" name="patrimonio">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Estado Identidad" name="estado_identidad">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Estado Domicilio" name="estado_domicilio">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Estado Ingresos" name="estado_ingresos">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Estado Antecedentes" name="estado_antecedentes">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Fecha Solicitud" name="fecha_solicitud">
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => { form.resetFields(); setFormModalVisible(false); }}>
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit">
                  {modoFormulario === 'crear' ? 'Crear Usuario' : 'Actualizar Usuario'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal para visualizar el detalle del usuario */}
        <Modal
          visible={viewModalVisible}
          title="Detalle del Usuario"
          footer={[
            <Button key="close" type="primary" onClick={() => setViewModalVisible(false)}>
              Cerrar
            </Button>
          ]}
          onCancel={() => setViewModalVisible(false)}
        >
          {usuarioActivo && (
            <Descriptions title="Información del Usuario" bordered column={1}>
              <Descriptions.Item label="Cédula">{usuarioActivo.cedula}</Descriptions.Item>
              <Descriptions.Item label="Usuario">{usuarioActivo.usuario}</Descriptions.Item>
              <Descriptions.Item label="Correo">{usuarioActivo.correo}</Descriptions.Item>
              <Descriptions.Item label="Género">{usuarioActivo.genero || '-'}</Descriptions.Item>
              <Descriptions.Item label="Rol">{usuarioActivo.rol}</Descriptions.Item>
              <Descriptions.Item label="Estado">{usuarioActivo.estado}</Descriptions.Item>
              <Descriptions.Item label="Nombre">{usuarioActivo.nombre || '-'}</Descriptions.Item>
              <Descriptions.Item label="Apellido">{usuarioActivo.apellido || '-'}</Descriptions.Item>
              <Descriptions.Item label="Ocupación">{usuarioActivo.ocupacion || '-'}</Descriptions.Item>
              <Descriptions.Item label="Nivel de Estudios">{usuarioActivo.nivel_estudios || '-'}</Descriptions.Item>
              <Descriptions.Item label="Título Universitario">{usuarioActivo.titulo_universitario || '-'}</Descriptions.Item>
              <Descriptions.Item label="Provincia">{usuarioActivo.provincia || '-'}</Descriptions.Item>
              <Descriptions.Item label="Cantón">{usuarioActivo.canton || '-'}</Descriptions.Item>
              <Descriptions.Item label="Parroquia">{usuarioActivo.parroquia || '-'}</Descriptions.Item>
              <Descriptions.Item label="Calle Principal">{usuarioActivo.callePrincipal || '-'}</Descriptions.Item>
              <Descriptions.Item label="Calle Secundaria">{usuarioActivo.calleSecundaria || '-'}</Descriptions.Item>
              <Descriptions.Item label="Nro Casa">{usuarioActivo.nroCasa || '-'}</Descriptions.Item>
              <Descriptions.Item label="Lugar Referencia">{usuarioActivo.lugar_referencia || '-'}</Descriptions.Item>
              <Descriptions.Item label="Celular Principal">{usuarioActivo.celularPrincipal || '-'}</Descriptions.Item>
              <Descriptions.Item label="Celular Referencia">{usuarioActivo.celularReferencia || '-'}</Descriptions.Item>
              <Descriptions.Item label="Teléfono Fijo">{usuarioActivo.telefonoFijo || '-'}</Descriptions.Item>
              <Descriptions.Item label="Ingreso Mensual">{usuarioActivo.ingreso_mensual || '-'}</Descriptions.Item>
              <Descriptions.Item label="Gasto Mensual Promedio">{usuarioActivo.gasto_mensual_promedio || '-'}</Descriptions.Item>
              <Descriptions.Item label="Gasto Endeudamiento">{usuarioActivo.gasto_endeudamiento || '-'}</Descriptions.Item>
              <Descriptions.Item label="Patrimonio">{usuarioActivo.patrimonio || '-'}</Descriptions.Item>
              <Descriptions.Item label="Estado Identidad">{usuarioActivo.estado_identidad || '-'}</Descriptions.Item>
              <Descriptions.Item label="Estado Domicilio">{usuarioActivo.estado_domicilio || '-'}</Descriptions.Item>
              <Descriptions.Item label="Estado Ingresos">{usuarioActivo.estado_ingresos || '-'}</Descriptions.Item>
              <Descriptions.Item label="Estado Antecedentes">{usuarioActivo.estado_antecedentes || '-'}</Descriptions.Item>
              <Descriptions.Item label="Fecha Solicitud">{usuarioActivo.fecha_solicitud || '-'}</Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default Usuario;
