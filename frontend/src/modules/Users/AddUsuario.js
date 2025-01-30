import React, { useState, useEffect } from 'react';
import { Modal, Input, Button, Select, message, Form } from 'antd';
import { createUser, fetchRoles } from '../../utils/api';

const { Option } = Select;

const AddUsuario = ({ closeModal, onUserAdded }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        cargarRoles();
    }, []);

    const cargarRoles = async () => {
        try {
            const data = await fetchRoles();
            setRoles(data);
        } catch (error) {
            message.error('Error al cargar los roles.');
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await createUser(values);
            message.success('Usuario creado exitosamente.');
            onUserAdded(); // Recargar la lista de usuarios
            closeModal();  // Cerrar modal
        } catch (error) {
            message.error(error.message || 'Error al crear el usuario.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Crear Nuevo Usuario"
            visible={true}
            onCancel={closeModal}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="usuario"
                    label="Nombre de usuario"
                    rules={[{ required: true, message: 'Ingrese un nombre de usuario' }]}
                >
                    <Input placeholder="Ejemplo123" />
                </Form.Item>

                <Form.Item
                    name="correo"
                    label="Correo Electrónico"
                    rules={[{ required: true, message: 'Ingrese un correo válido', type: 'email' }]}
                >
                    <Input placeholder="ejemplo@email.com" />
                </Form.Item>

                <Form.Item
                    name="contraseña"
                    label="Contraseña"
                    rules={[{ required: true, message: 'Ingrese una contraseña' }]}
                >
                    <Input.Password placeholder="********" />
                </Form.Item>

                <Form.Item
                    name="id_rol"
                    label="Rol del Usuario"
                    rules={[{ required: true, message: 'Seleccione un rol' }]}
                >
                    <Select placeholder="Seleccione un rol">
                        {roles.map((rol) => (
                            <Option key={rol.id_rol} value={rol.id_rol}>
                                {rol.nombre_rol}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Crear Usuario
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUsuario;
