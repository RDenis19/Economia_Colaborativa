// ProjectTypes.js
import React, { useState, useEffect } from "react";
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
  message,
} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  ProjectOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;
const { Option } = Select;

// Estilos en línea para personalizar la vista
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

const ProjectTypes = () => {
  // Lista de sectores ampliada
  const sectorsList = [
    "Social",
    "Animales",
    "Tecnología",
    "Salud",
    "Educación",
    "Medio Ambiente",
    "Emprendimiento",
    "Deportes",
    "Cultura",
    "Música",
    "Comida",
  ];

  // Estados para almacenar los tipos de proyectos, búsqueda, modales, etc.
  const [projectTypes, setProjectTypes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterSector, setFilterSector] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [form] = Form.useForm();

  // Cargar datos iniciales desde localStorage o inicializarlos
  useEffect(() => {
    const storedTypes = localStorage.getItem("projectTypes");
    if (storedTypes) {
      setProjectTypes(JSON.parse(storedTypes));
    } else {
      const initialTypes = [
        {
          id: 1,
          name: "Social",
          description:
            "Proyectos de impacto social, comunitarios o de ayuda mutua.",
          sector: "Social",
        },
        {
          id: 2,
          name: "Animales",
          description: "Proyectos para el bienestar y protección animal.",
          sector: "Animales",
        },
        {
          id: 3,
          name: "Tecnología",
          description: "Proyectos innovadores y tecnológicos.",
          sector: "Tecnología",
        },
        {
          id: 4,
          name: "Salud",
          description: "Proyectos enfocados en la salud y bienestar.",
          sector: "Salud",
        },
      ];
      setProjectTypes(initialTypes);
      localStorage.setItem("projectTypes", JSON.stringify(initialTypes));
    }
  }, []);

  // Actualiza el localStorage con la información actual
  const updateLocalStorage = (data) => {
    localStorage.setItem("projectTypes", JSON.stringify(data));
  };

  // Manejo de la búsqueda y filtro
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterSector = (value) => {
    setFilterSector(value);
  };

  // Abre el modal para agregar un nuevo tipo
  const openAddModal = () => {
    setEditingType(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Abre el modal para editar un tipo (precarga el formulario)
  const openEditModal = (record) => {
    setEditingType(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      sector: record.sector,
    });
    setModalVisible(true);
  };

  // Abre el modal de visualización de detalles
  const openViewModal = (record) => {
    setSelectedType(record);
    setViewModalVisible(true);
  };

  // Elimina un tipo de proyecto con confirmación
  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de eliminar este tipo de proyecto?",
      onOk: () => {
        const updatedTypes = projectTypes.filter((type) => type.id !== id);
        setProjectTypes(updatedTypes);
        updateLocalStorage(updatedTypes);
        message.success("Tipo de proyecto eliminado correctamente");
      },
    });
  };

  // Maneja el guardado (agregar o editar) desde el modal
  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingType) {
          // Editar un tipo existente
          const updatedTypes = projectTypes.map((type) =>
            type.id === editingType.id ? { ...type, ...values } : type
          );
          setProjectTypes(updatedTypes);
          updateLocalStorage(updatedTypes);
          message.success("Tipo de proyecto actualizado correctamente");
        } else {
          // Agregar un nuevo tipo de proyecto
          const newType = {
            id: projectTypes.length
              ? Math.max(...projectTypes.map((type) => type.id)) + 1
              : 1,
            ...values,
          };
          const updatedTypes = [...projectTypes, newType];
          setProjectTypes(updatedTypes);
          updateLocalStorage(updatedTypes);
          message.success("Tipo de proyecto agregado correctamente");
        }
        setModalVisible(false);
        form.resetFields();
      })
      .catch((error) => {
        console.log("Error en la validación:", error);
      });
  };

  // Cierra el modal sin guardar cambios
  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  // Filtra los tipos según la búsqueda y el sector seleccionado
  const filteredTypes = projectTypes.filter(
    (type) =>
      type.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterSector ? type.sector === filterSector : true)
  );

  // Columnas para la tabla
  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => openViewModal(record)}
          />
          <EditOutlined
            style={{ color: "#52c41a", cursor: "pointer" }}
            onClick={() => openEditModal(record)}
          />
          <DeleteOutlined
            style={{ color: "#f5222d", cursor: "pointer" }}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
      width: 150,
    },
  ];

  return (
    <Layout style={containerStyle}>
      <Header style={headerStyle}>
        <Row align="middle">
          <Col>
            <ProjectOutlined
              style={{ fontSize: "32px", color: "#fff", marginRight: "16px" }}
            />
          </Col>
          <Col>
            <h1 style={headerTitleStyle}>Gestión de Tipos de Proyectos</h1>
          </Col>
        </Row>
      </Header>
      <Content style={contentStyle}>
        <Card title="Administrar Tipos de Proyectos" style={cardStyle}>
          <Row gutter={16} style={{ marginBottom: "16px" }}>
            <Col xs={24} md={8}>
              <Input
                placeholder="Buscar por nombre"
                value={searchText}
                onChange={handleSearch}
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col xs={24} md={6}>
              <Select
                placeholder="Filtrar por sector"
                allowClear
                style={{ width: "100%" }}
                value={filterSector}
                onChange={handleFilterSector}
              >
                {sectorsList.map((sector) => (
                  <Option key={sector} value={sector}>
                    {sector}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openAddModal}
              >
                Agregar Tipo
              </Button>
            </Col>
          </Row>
          <Table
            dataSource={filteredTypes}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>

        {/* Modal para agregar/editar un tipo de proyecto */}
        <Modal
          title={
            editingType
              ? "Editar Tipo de Proyecto"
              : "Agregar Tipo de Proyecto"
          }
          visible={modalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          okText="Guardar"
          cancelText="Cancelar"
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                { required: true, message: "Por favor ingresa el nombre" },
              ]}
            >
              <Input placeholder="Nombre del tipo de proyecto" />
            </Form.Item>
            <Form.Item label="Descripción" name="description">
              <Input.TextArea
                placeholder="Descripción del tipo de proyecto"
                rows={3}
              />
            </Form.Item>
            <Form.Item
              label="Sector"
              name="sector"
              rules={[
                { required: true, message: "Por favor selecciona un sector" },
              ]}
            >
              <Select placeholder="Selecciona el sector">
                {sectorsList.map((sector) => (
                  <Option key={sector} value={sector}>
                    {sector}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal para visualizar los detalles del tipo de proyecto */}
        <Modal
          title="Detalle del Tipo de Proyecto"
          visible={viewModalVisible}
          footer={[
            <Button
              key="close"
              onClick={() => setViewModalVisible(false)}
            >
              Cerrar
            </Button>,
          ]}
          onCancel={() => setViewModalVisible(false)}
        >
          {selectedType && (
            <div>
              <p>
                <strong>Nombre:</strong> {selectedType.name}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedType.description}
              </p>
              <p>
                <strong>Sector:</strong> {selectedType.sector}
              </p>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default ProjectTypes;
