// CategoryDashboard.js
import React, { useState, useEffect } from "react";
import {Layout,Card,Row,Col,Form,Input,Select,Button,Table,Modal,Space,message} from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  TagsOutlined,
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

const CategoryDashboard = () => {
  // Estados para gestionar las categorías y modales
  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form] = Form.useForm();

  // Cargar datos desde localStorage o inicializarlos
  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      const initialCategories = [
        {
          id: 1,
          name: "Tecnología",
          description: "Proyectos tecnológicos",
          status: "Activo",
        },
        {
          id: 2,
          name: "Arte",
          description: "Proyectos de arte",
          status: "Activo",
        },
        {
          id: 3,
          name: "Educación",
          description: "Proyectos educativos",
          status: "Inactivo",
        },
      ];
      setCategories(initialCategories);
      localStorage.setItem("categories", JSON.stringify(initialCategories));
    }
  }, []);

  // Actualiza el localStorage con la información actual
  const updateLocalStorage = (data) => {
    localStorage.setItem("categories", JSON.stringify(data));
  };

  // Manejo de la búsqueda y filtrado
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterStatus = (value) => {
    setFilterStatus(value);
  };

  // Abre el modal para agregar una nueva categoría
  const openAddModal = () => {
    setEditingCategory(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Abre el modal para editar una categoría (precarga el formulario)
  const openEditModal = (record) => {
    setEditingCategory(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
      status: record.status,
    });
    setModalVisible(true);
  };

  // Abre el modal de visualización de detalles
  const openViewModal = (record) => {
    setSelectedCategory(record);
    setViewModalVisible(true);
  };

  // Elimina una categoría con confirmación
  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de eliminar esta categoría?",
      onOk: () => {
        const updatedCategories = categories.filter((cat) => cat.id !== id);
        setCategories(updatedCategories);
        updateLocalStorage(updatedCategories);
        message.success("Categoría eliminada correctamente");
      },
    });
  };

  // Maneja el guardado (agregar o editar) desde el modal
  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingCategory) {
          // Actualizar categoría existente
          const updatedCategories = categories.map((cat) =>
            cat.id === editingCategory.id ? { ...cat, ...values } : cat
          );
          setCategories(updatedCategories);
          updateLocalStorage(updatedCategories);
          message.success("Categoría actualizada correctamente");
        } else {
          // Agregar nueva categoría
          const newCategory = {
            id: categories.length
              ? Math.max(...categories.map((cat) => cat.id)) + 1
              : 1,
            ...values,
          };
          const updatedCategories = [...categories, newCategory];
          setCategories(updatedCategories);
          updateLocalStorage(updatedCategories);
          message.success("Categoría agregada correctamente");
        }
        setModalVisible(false);
        form.resetFields();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  // Cierra el modal sin guardar cambios
  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  // Filtra las categorías según búsqueda y estado
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchText.toLowerCase()) &&
      (filterStatus ? cat.status === filterStatus : true)
  );

  // Columnas para la tabla de categorías
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
            <TagsOutlined
              style={{
                fontSize: "32px",
                color: "#fff",
                marginRight: "16px",
              }}
            />
          </Col>
          <Col>
            <h1 style={headerTitleStyle}>Gestión de Categorías</h1>
          </Col>
        </Row>
      </Header>
      <Content style={contentStyle}>
        <Card title="Administrar Categorías" style={cardStyle}>
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
                placeholder="Filtrar por estado"
                allowClear
                style={{ width: "100%" }}
                value={filterStatus}
                onChange={handleFilterStatus}
              >
                <Option value="Activo">Activo</Option>
                <Option value="Inactivo">Inactivo</Option>
              </Select>
            </Col>
            <Col xs={24} md={10} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={openAddModal}
              >
                Agregar Categoría
              </Button>
            </Col>
          </Row>
          <Table
            dataSource={filteredCategories}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </Card>

        {/* Modal para agregar/editar categorías */}
        <Modal
          title={editingCategory ? "Editar Categoría" : "Agregar Categoría"}
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
              <Input placeholder="Nombre de la categoría" />
            </Form.Item>
            <Form.Item label="Descripción" name="description">
              <Input.TextArea
                placeholder="Descripción de la categoría"
                rows={3}
              />
            </Form.Item>
            <Form.Item
              label="Estado"
              name="status"
              rules={[
                { required: true, message: "Por favor selecciona el estado" },
              ]}
            >
              <Select placeholder="Selecciona el estado">
                <Option value="Activo">Activo</Option>
                <Option value="Inactivo">Inactivo</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>

        {/* Modal para ver detalle de la categoría */}
        <Modal
          title="Detalle de Categoría"
          visible={viewModalVisible}
          footer={[
            <Button key="close" onClick={() => setViewModalVisible(false)}>
              Cerrar
            </Button>,
          ]}
          onCancel={() => setViewModalVisible(false)}
        >
          {selectedCategory && (
            <div>
              <p>
                <strong>Nombre:</strong> {selectedCategory.name}
              </p>
              <p>
                <strong>Descripción:</strong> {selectedCategory.description}
              </p>
              <p>
                <strong>Estado:</strong> {selectedCategory.status}
              </p>
            </div>
          )}
        </Modal>
      </Content>
    </Layout>
  );
};

export default CategoryDashboard;
