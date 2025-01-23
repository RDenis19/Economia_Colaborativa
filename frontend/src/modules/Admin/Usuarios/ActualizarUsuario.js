import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { updateUserById, fetchUserById } from '../../../utils/api';

const { Option } = Select;

const ActualizarUsuario = ({ open, onClose, userId, onUserUpdated }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const userData = await fetchUserById(userId);
          form.setFieldsValue({
            ...userData,
            roles_id: userData.roles_id, // Asignar `roles_id` directamente al formulario
          });
        } catch (error) {
          message.error('Error al cargar los datos del usuario');
        }
      };
      fetchUserData();
    }
  }, [userId, form]);

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = {
        ...values,
      };
      setLoading(true);
      await updateUserById(userId, updatedData); // Enviar `roles_id` al backend
      message.success('Usuario actualizado exitosamente');
      onUserUpdated();
      onClose();
    } catch (error) {
      message.error(error.mensaje || 'Error al actualizar el usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Usuario"
      open={open}
      onCancel={onClose}
      onOk={handleUpdate}
      confirmLoading={loading}
      okText="Actualizar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="nombres"
          label="Nombres"
          rules={[{ required: true, message: 'Por favor, ingresa los nombres' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="apellido"
          label="Apellido"
          rules={[{ required: true, message: 'Por favor, ingresa el apellido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cedula"
          label="Cédula"
          rules={[{ required: true, message: 'Por favor, ingresa la cédula' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="estado"
          label="Estado"
          rules={[{ required: true, message: 'Selecciona un estado' }]}
        >
          <Select placeholder="Selecciona un estado">
            <Option value="Activo">Activo</Option>
            <Option value="Inactivo">Inactivo</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="roles_id"
          label="Rol"
          rules={[{ required: true, message: 'Selecciona un rol' }]}
        >
          <Select placeholder="Selecciona un rol">
            <Option value={1}>Administrador</Option>
            <Option value={2}>Prestatario</Option>
            <Option value={3}>Prestamista</Option>
            <Option value={4}>Soporte</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ActualizarUsuario;
