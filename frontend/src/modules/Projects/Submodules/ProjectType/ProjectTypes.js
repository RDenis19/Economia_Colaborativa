import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tooltip, Modal, message, Form, Input } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchProjectTypes, deleteProjectType, createProjectType, updateProjectType } from '../../../../utils/api';

const ProjectTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    setLoading(true);
    try {
      const data = await fetchProjectTypes();
      setTypes(data);
    } catch (error) {
      console.error('Error al obtener tipos de proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este tipo de proyecto?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteProjectType(id);
          message.success('Tipo de proyecto eliminado con éxito');
          loadTypes();
        } catch (error) {
          message.error('Error al eliminar el tipo de proyecto');
        }
      },
    });
  };

  const handleView = (type) => {
    setSelectedType(type);
    setIsViewModalOpen(true);
  };

  const handleEdit = (type) => {
    setSelectedType(type);
    form.setFieldsValue({ nombre_tipo: type.nombre_tipo });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateProjectType(selectedType.id_tipo, values);
      message.success('Tipo de proyecto actualizado con éxito');
      setIsEditModalOpen(false);
      loadTypes();
    } catch (error) {
      message.error('Error al actualizar el tipo de proyecto');
    }
  };

  const handleAddSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createProjectType(values);
      message.success('Tipo de proyecto creado con éxito');
      setIsAddModalOpen(false);
      loadTypes();
    } catch (error) {
      message.error('Error al crear el tipo de proyecto');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id_tipo', key: 'id_tipo' },
    { title: 'Nombre', dataIndex: 'nombre_tipo', key: 'nombre_tipo' },
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
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id_tipo)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Tipos de Proyectos</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
          Agregar Tipo de Proyecto
        </Button>
      </div>
      <Table columns={columns} dataSource={types} loading={loading} rowKey="id_tipo" />

      {/* Modal para Ver Detalles */}
      <Modal
        title="Detalles del Tipo de Proyecto"
        visible={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsViewModalOpen(false)}>
            Cerrar
          </Button>,
        ]}
      >
        {selectedType && (
          <div>
            <p><strong>ID:</strong> {selectedType.id_tipo}</p>
            <p><strong>Nombre:</strong> {selectedType.nombre_tipo}</p>
          </div>
        )}
      </Modal>

      {/* Modal para Editar Tipo de Proyecto */}
      <Modal
        title="Editar Tipo de Proyecto"
        visible={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleEditSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nombre_tipo"
            label="Nombre del Tipo de Proyecto"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del tipo de proyecto' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para Agregar Tipo de Proyecto */}
      <Modal
        title="Agregar Nuevo Tipo de Proyecto"
        visible={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={handleAddSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="nombre_tipo"
            label="Nombre del Tipo de Proyecto"
            rules={[{ required: true, message: 'Por favor ingrese el nombre del tipo de proyecto' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectTypes;
