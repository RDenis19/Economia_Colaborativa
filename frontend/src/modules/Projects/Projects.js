// Projects.jsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Form,
  Input,
  Select,
  Space,
  Tag,
  Popconfirm,
  message,
  Divider,
  Row,
  Col,
  Descriptions,
  Upload,
  DatePicker,
  InputNumber
} from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  UploadOutlined,
  SmileOutlined  // Se agrega SmileOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;
const STORAGE_KEY = 'proyectos-crowlanding';

// Utilidad: convierte un archivo a Base64 (para simular la subida y obtener preview)
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Projects = () => {
  // Estados principales
  const [projects, setProjects] = useState([]);
  // currentView: 'list', 'form' o 'detail'
  const [currentView, setCurrentView] = useState('list');
  const [activeProject, setActiveProject] = useState(null);
  // Para el formulario: modo 'create' o 'edit'
  const [formMode, setFormMode] = useState('create');
  const [form] = Form.useForm();
  // Filtros de búsqueda
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  // Guardar datos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  // ---------------------------
  // Funciones para cambiar de vista
  // ---------------------------
  const handleAdd = () => {
    setFormMode('create');
    form.resetFields();
    setActiveProject(null);
    setCurrentView('form');
  };

  const handleEdit = (project) => {
    setFormMode('edit');
    setActiveProject(project);
    // Convertir fechas a moment para DatePicker
    form.setFieldsValue({
      ...project,
      fechaCreacion: moment(project.fechaCreacion, 'YYYY-MM-DD'),
      fechaInicio: moment(project.fechaInicio, 'YYYY-MM-DD')
    });
    setCurrentView('form');
  };

  const handleView = (project) => {
    setActiveProject(project);
    setCurrentView('detail');
  };

  // ---------------------------
  // Funciones de acciones
  // ---------------------------
  const handleDelete = (projectName) => {
    setProjects(projects.filter((p) => p.nombre !== projectName));
    message.success('Proyecto eliminado');
  };

  // Función para actualizar el estado del proyecto
  const updateProjectStatus = (projectName, newStatus) => {
    const updated = projects.map((p) =>
      p.nombre === projectName ? { ...p, estado: newStatus } : p
    );
    setProjects(updated);
  };

  // Función invocada por los botones de estado
  const handleUpdateStatus = (newStatus) => {
    if (activeProject) {
      updateProjectStatus(activeProject.nombre, newStatus);
      message.success(`Proyecto marcado como ${newStatus}`);
      setActiveProject({ ...activeProject, estado: newStatus });
    }
  };

  // Función para simular verificación y completar algunos campos automáticamente
  const handleVerify = () => {
    const nombre = form.getFieldValue('nombre');
    if (!nombre) {
      message.error('Ingrese el nombre del proyecto para verificar');
      return;
    }
    form.setFieldsValue({
      descripcion: `Descripción de ${nombre}`,
      metaFinanciera: 50000,
      fechaCreacion: moment(new Date(), 'YYYY-MM-DD'),
      fechaInicio: moment(new Date(), 'YYYY-MM-DD'),
      creador: `Creador de ${nombre}`
    });
    message.success('Información verificada y completada');
  };

  // ---------------------------
  // Manejo del envío del formulario
  // ---------------------------
  const onFinish = (values) => {
    const processedValues = {
      ...values,
      fechaCreacion: values.fechaCreacion.format('YYYY-MM-DD'),
      fechaInicio: values.fechaInicio.format('YYYY-MM-DD')
    };
    if (formMode === 'create') {
      const exists = projects.some((p) => p.nombre === processedValues.nombre);
      if (exists) {
        message.error('Ya existe un proyecto con ese nombre');
        return;
      }
      setProjects([...projects, processedValues]);
      message.success('Proyecto creado exitosamente');
    } else if (formMode === 'edit') {
      setProjects(
        projects.map((p) =>
          p.nombre === activeProject.nombre ? processedValues : p
        )
      );
      message.success('Proyecto actualizado exitosamente');
    }
    form.resetFields();
    setCurrentView('list');
  };

  // ---------------------------
  // Definición de columnas para la tabla
  // ---------------------------
  const columns = [
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      render: (text) => (text.length > 30 ? text.substring(0, 30) + '...' : text)
    },
    {
      title: 'Meta Financiera',
      dataIndex: 'metaFinanciera',
      key: 'metaFinanciera',
      render: (meta) => `$ ${meta}`
    },
    { title: 'Fecha Creación', dataIndex: 'fechaCreacion', key: 'fechaCreacion' },
    { title: 'Fecha Inicio', dataIndex: 'fechaInicio', key: 'fechaInicio' },
    { title: 'Creador', dataIndex: 'creador', key: 'creador' },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag
          color={
            estado === 'Aprobado'
              ? 'green'
              : estado === 'Rechazado'
              ? 'red'
              : 'orange'
          }
        >
          {estado}
        </Tag>
      )
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)} />
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Popconfirm
            title="¿Seguro que desea eliminar este proyecto?"
            onConfirm={() => handleDelete(record.nombre)}
            okText="Sí"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  // Filtrar proyectos según búsqueda y estado
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = searchFilter
      ? p.nombre.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.creador.toLowerCase().includes(searchFilter.toLowerCase())
      : true;
    const matchesStatus = statusFilter ? p.estado === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  // ---------------------------
  // Vistas (State Views)
  // ---------------------------

  // Vista de lista de proyectos
  const renderList = () => (
    <div style={{ padding: 24 }}>
      <h1>Gestión de Proyectos - Crowlanding</h1>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Buscar por nombre o creador"
          prefix={<SearchOutlined />}
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          allowClear
        />
        <Select
          placeholder="Filtrar por estado"
          style={{ width: 150 }}
          allowClear
          value={statusFilter}
          onChange={setStatusFilter}
        >
          <Option value="Aprobado">Aprobado</Option>
          <Option value="Rechazado">Rechazado</Option>
          <Option value="Pendiente">Pendiente</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Agregar Proyecto
        </Button>
      </Space>
      <Table columns={columns} dataSource={filteredProjects} rowKey="nombre" bordered />
    </div>
  );

  // Vista del formulario para agregar/editar proyecto
  const renderForm = () => (
    <div style={{ padding: 24 }}>
      <h2>{formMode === 'create' ? 'Agregar Proyecto' : 'Editar Proyecto'}</h2>
      <Button style={{ marginBottom: 16 }} onClick={() => setCurrentView('list')}>
        Regresar a la Lista
      </Button>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Fila 1: Datos básicos */}
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: 'Ingrese el nombre del proyecto' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Descripción"
              name="descripcion"
              rules={[{ required: true, message: 'Ingrese la descripción' }]}
            >
              <Input.TextArea rows={2} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Meta Financiera"
              name="metaFinanciera"
              rules={[{ required: true, message: 'Ingrese la meta financiera' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={(value) => `$ ${value}`}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Categoría"
              name="categoria"
              rules={[{ required: true, message: 'Seleccione la categoría' }]}
            >
              <Select placeholder="Seleccione la categoría">
                <Option value="Empresarial">Empresarial (Business Lending)</Option>
                <Option value="Inmobiliario">Inmobiliario (Real Estate Lending)</Option>
                <Option value="Energía y Sostenibilidad">Energía y Sostenibilidad</Option>
                <Option value="Consumo Personal">Consumo Personal (Consumer Lending)</Option>
                <Option value="Impacto Social y Comunitario">Impacto Social y Comunitario</Option>
                <Option value="Agrícola y Agroindustrial">Agrícola y Agroindustrial</Option>
                <Option value="Tecnología e Innovación">Tecnología e Innovación</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Fila 2: Fechas, creador y estado */}
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="Fecha de Creación"
              name="fechaCreacion"
              rules={[{ required: true, message: 'Ingrese la fecha de creación' }]}
            >
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Fecha de Inicio"
              name="fechaInicio"
              rules={[{ required: true, message: 'Ingrese la fecha de inicio' }]}
            >
              <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Creador"
              name="creador"
              rules={[{ required: true, message: 'Ingrese el creador del proyecto' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Estado"
              name="estado"
              rules={[{ required: true, message: 'Seleccione el estado' }]}
            >
              <Select placeholder="Seleccione el estado">
                <Option value="Aprobado">Aprobado</Option>
                <Option value="Rechazado">Rechazado</Option>
                <Option value="Pendiente">Pendiente</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Fila 3: Localización y Sector */}
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="Ciudad"
              name="ciudad"
              rules={[{ required: true, message: 'Ingrese la ciudad' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="País"
              name="pais"
              rules={[{ required: true, message: 'Ingrese el país' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Sector"
              name="sector"
              rules={[{ required: true, message: 'Ingrese el sector' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Tiempo Estimado (meses)"
              name="tiempoEstimado"
              rules={[{ required: true, message: 'Ingrese el tiempo estimado' }]}
            >
              <InputNumber style={{ width: '100%' }} min={1} />
            </Form.Item>
          </Col>
        </Row>

        {/* Fila 4: Subir imagen */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Foto del Emprendimiento" name="imagen">
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={async (file) => {
                  const base64 = await getBase64(file);
                  form.setFieldsValue({ imagen: base64 });
                  return false;
                }}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Subir Imagen</div>
                </div>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">Información Adicional</Divider>

        {/* Fila 5: Objetivos, Beneficios y Riesgos */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Objetivos" name="objetivos">
              <Input.TextArea rows={2} placeholder="Describa los objetivos" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Beneficios" name="beneficios">
              <Input.TextArea rows={2} placeholder="Describa los beneficios" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Riesgos" name="riesgos">
              <Input.TextArea rows={2} placeholder="Describa los riesgos" />
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
              <Button type="dashed" onClick={handleVerify}>
                Verificar
              </Button>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setCurrentView('list')}>Cancelar</Button>
            <Button type="primary" htmlType="submit">
              {formMode === 'create' ? 'Crear Proyecto' : 'Actualizar Proyecto'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );

  // Vista de detalle del proyecto (distribución profesional)
  const renderDetail = () => (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 24 }}>Detalle del Proyecto</h2>
      {activeProject && (
        <Descriptions
          bordered
          column={4}
          size="middle"
          title="Información del Proyecto"
          labelStyle={{ fontWeight: 'bold', backgroundColor: '#fafafa' }}
          contentStyle={{ backgroundColor: '#fff' }}
          style={{ marginBottom: 24 }}
        >
          <Descriptions.Item label="Nombre">{activeProject.nombre}</Descriptions.Item>
          <Descriptions.Item label="Descripción">{activeProject.descripcion}</Descriptions.Item>
          <Descriptions.Item label="Meta Financiera">{`$ ${activeProject.metaFinanciera}`}</Descriptions.Item>
          <Descriptions.Item label="Categoría">{activeProject.categoria}</Descriptions.Item>
          <Descriptions.Item label="Fecha Creación">{activeProject.fechaCreacion}</Descriptions.Item>
          <Descriptions.Item label="Fecha Inicio">{activeProject.fechaInicio}</Descriptions.Item>
          <Descriptions.Item label="Creador">{activeProject.creador}</Descriptions.Item>
          <Descriptions.Item label="Estado">{activeProject.estado}</Descriptions.Item>
          <Descriptions.Item label="Ciudad">{activeProject.ciudad || '-'}</Descriptions.Item>
          <Descriptions.Item label="País">{activeProject.pais || '-'}</Descriptions.Item>
          <Descriptions.Item label="Sector">{activeProject.sector || '-'}</Descriptions.Item>
          <Descriptions.Item label="Tiempo Estimado">
            {activeProject.tiempoEstimado ? `${activeProject.tiempoEstimado} meses` : '-'}
          </Descriptions.Item>
          {activeProject.imagen && (
            <Descriptions.Item label="Imagen">
              <img src={activeProject.imagen} alt="Proyecto" style={{ width: '120px', borderRadius: 4 }} />
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Objetivos">{activeProject.objetivos || '-'}</Descriptions.Item>
          <Descriptions.Item label="Beneficios">{activeProject.beneficios || '-'}</Descriptions.Item>
          <Descriptions.Item label="Riesgos">{activeProject.riesgos || '-'}</Descriptions.Item>
        </Descriptions>
      )}
      <Space size="large">
        <Button type="primary" onClick={() => setCurrentView('list')}>
          Regresar a la Lista
        </Button>
        {activeProject && (
          <>
            <Button
              type="primary"
              icon={<SmileOutlined />}
              onClick={() => handleUpdateStatus('Aprobado')}
            >
              Aprobado
            </Button>
            <Button
              type="primary"
              icon={<CloseCircleOutlined />}
              onClick={() => handleUpdateStatus('Rechazado')}
            >
              Rechazado
            </Button>
            <Button
              type="primary"
              icon={<ClockCircleOutlined />}
              onClick={() => handleUpdateStatus('Pendiente')}
            >
              Pendiente
            </Button>
          </>
        )}
      </Space>
    </div>
  );

  return (
    <div>
      {currentView === 'list' && renderList()}
      {currentView === 'form' && renderForm()}
      {currentView === 'detail' && renderDetail()}
    </div>
  );
};

export default Projects;
