import React, { useState } from 'react';
import { Modal, Form, Input, Button, Tabs, Select, message } from 'antd';
import { createUser, createUserPersonalInfo, createUserContactInfo, createUserAcademicInfo, createUserFinancialInfo, createUserVerification, assignUserRole } from '../../utils/api';

const { TabPane } = Tabs;
const { Option } = Select;

const AddUsuario = ({ closeModal, onUserAdded }) => {
  const [currentTab, setCurrentTab] = useState("1");
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      if (currentTab === "1") {
        const response = await createUser(values);
        setUserId(response.id);
        await assignUserRole({ id_usuario: response.id, rol: values.rol });
        message.success('Usuario creado exitosamente. Continúa con el registro.');
      } else if (currentTab === "2") {
        await createUserPersonalInfo({ id_usuario: userId, ...values });
      } else if (currentTab === "3") {
        await createUserContactInfo({ id_usuario: userId, ...values });
      } else if (currentTab === "4") {
        await createUserAcademicInfo({ id_usuario: userId, ...values });
      } else if (currentTab === "5") {
        await createUserFinancialInfo({ id_usuario: userId, ...values });
        await createUserVerification({ id_usuario: userId });
        message.success('Usuario registrado completamente.');
        onUserAdded();
        closeModal();
        return;
      }
      message.success('Información guardada exitosamente.');
      setCurrentTab((prev) => (parseInt(prev) + 1).toString());
    } catch (error) {
      message.error('Completa todos los campos antes de continuar.');
    }
  };

  return (
    <Modal title="Registrar Nuevo Usuario" visible={true} onCancel={closeModal} footer={null}>
      <Tabs activeKey={currentTab} onChange={setCurrentTab}>
        <TabPane tab="Usuario" key="1">
          <Form form={form} layout="vertical">
            <Form.Item name="usuario" label="Usuario" rules={[{ required: true }]}> <Input /></Form.Item>
            <Form.Item name="correo" label="Correo" rules={[{ required: true, type: 'email' }]}> <Input /></Form.Item>
            <Form.Item name="contraseña" label="Contraseña" rules={[{ required: true }]}> <Input.Password /></Form.Item>
            <Form.Item name="rol" label="Rol" rules={[{ required: true }]}> <Select>
              <Option value="1">Administrador</Option>
              <Option value="2">Creador</Option>
              <Option value="3">Usuario</Option>
              <Option value="4">Soporte</Option>
            </Select></Form.Item>
            <Button type="primary" onClick={handleNext}>Siguiente</Button>
          </Form>
        </TabPane>
        <TabPane tab="Información Personal" key="2" disabled={!userId}>
          <Form form={form} layout="vertical">
            <Form.Item name="nombres" label="Nombres" rules={[{ required: true }]}> <Input /></Form.Item>
            <Form.Item name="apellidos" label="Apellidos" rules={[{ required: true }]}> <Input /></Form.Item>
            <Form.Item name="identificacion" label="Identificación" rules={[{ required: true }]}> <Input /></Form.Item>
            <Form.Item name="fecha_nacimiento" label="Fecha de Nacimiento" rules={[{ required: true }]}> <Input type="date" /></Form.Item>
            <Form.Item name="genero" label="Género" rules={[{ required: true }]}> <Select>
              <Option value="M">Masculino</Option>
              <Option value="F">Femenino</Option>
              <Option value="O">Otro</Option>
            </Select></Form.Item>
            <Button type="primary" onClick={handleNext}>Siguiente</Button>
          </Form>
        </TabPane>
        <TabPane tab="Contacto" key="3" disabled={!userId}>
          <Form form={form} layout="vertical">
            <Form.Item name="provincia" label="Provincia" rules={[{ required: true }]}> <Input /></Form.Item>
            <Form.Item name="canton" label="Cantón" rules={[{ required: true }]}> <Input /></Form.Item>
            <Form.Item name="celularPrincipal" label="Celular" rules={[{ required: true }]}> <Input /></Form.Item>
            <Button type="primary" onClick={handleNext}>Siguiente</Button>
          </Form>
        </TabPane>
        <TabPane tab="Académico" key="4" disabled={!userId}>
          <Form form={form} layout="vertical">
            <Form.Item name="ocupacion" label="Ocupación" rules={[{ required: true }]}> <Input /></Form.Item>
            <Form.Item name="nivel_estudios" label="Nivel de Estudios" rules={[{ required: true }]}> <Input /></Form.Item>
            <Form.Item name="titulo_universitario" label="Título Universitario"> <Input /></Form.Item>
            <Button type="primary" onClick={handleNext}>Siguiente</Button>
          </Form>
        </TabPane>
        <TabPane tab="Financiero" key="5" disabled={!userId}>
          <Form form={form} layout="vertical">
            <Form.Item name="ingreso_mensual" label="Ingreso Mensual" rules={[{ required: true }]}> <Input type="number" /></Form.Item>
            <Form.Item name="gasto_mensual_promedio" label="Gasto Mensual" rules={[{ required: true }]}> <Input type="number" /></Form.Item>
            <Form.Item name="patrimonio" label="Patrimonio" rules={[{ required: true }]}> <Input type="number" /></Form.Item>
            <Button type="primary" onClick={handleNext}>Finalizar</Button>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AddUsuario;
