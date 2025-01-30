import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tooltip, Modal, message, Form, Input } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchProjectCategories, deleteProjectCategory, createProjectCategory, updateProjectCategory } from '../../../../utils/api';

const ProjectCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchProjectCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar esta categoría?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteProjectCategory(id);
          message.success('Categoría eliminada con éxito');
          loadCategories();
        } catch (error) {
          message.error('Error al eliminar la categoría');
        }
      },
    });
  };

  const handleView = (category) => {
    setSelectedCategory(category);
    setIsViewModalOpen(true);
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    form.setFieldsValue({ nombre_categoria: category.nombre_categoria });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateProjectCategory(selectedCategory.id_categoria, values);
      message.success('Categoría actualizada con éxito');
      setIsEditModalOpen(false);
      loadCategories();
    } catch (error) {
      message.error('Error al actualizar la categoría');
    }
  };

  const handleAddSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createProjectCategory(values);
      message.success('Categoría creada con éxito');
      setIsAddModalOpen(false);
      loadCategories();
    } catch (error) {
      message.error('Error al crear la categoría');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id_categoria', key: 'id_categoria' },
    { title: 'Nombre', dataIndex: 'nombre_categoria', key: 'nombre_categoria' },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space>
          <Tooltip title="Ver Detalles">
            <Button icon={<EyeOutlined />} onClick={() => handleView(record)} />
          </Tooltip>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id_categoria)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Categorías de Proyectos</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
          Agregar Categoría
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} loading={loading} rowKey="id_categoria" />

      {/* Modal para Ver Detalles */}
      <Modal
        title="Detalles de la Categoría"
        visible={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsViewModalOpen(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedCategory && (
          <div>
            <p><strong>ID:</strong> {selectedCategory.id_categoria}</p>
            <p><strong>Nombre:</strong> {selectedCategory.nombre_categoria}</p>
          </div>
        )}
      </Modal>

      {/* Modal para Editar Categoría */}
      <Modal
        title="Editar Categoría"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleEditSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nombre_categoria"
            label="Nombre de la Categoría"
            rules={[{ required: true, message: 'Por favor ingrese el nombre de la categoría' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para Agregar Categoría */}
      <Modal
        title="Agregar Nueva Categoría"
        visible={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={handleAddSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nombre_categoria"
            label="Nombre de la Categoría"
            rules={[{ required: true, message: 'Por favor ingrese el nombre de la categoría' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectCategories;
