import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Tabs, message, DatePicker } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { updateUserDetails } from '../../utils/api';

const { Option } = Select;
const { TabPane } = Tabs;

const GENDER_OPTIONS = ['M', 'F', 'O'];
const STATUS_OPTIONS = ['Pendiente', 'Aprobado', 'Rechazado'];

const EditUsuario = ({ user, onCancel, onUserUpdated }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                usuario: user.usuario.usuario,
                correo: user.usuario.correo,
                id_rol: user.roles[0] || null,
                ...user.informacion_personal,
                ...user.informacion_contacto,
                ...user.informacion_academica,
                ...user.informacion_financiera,
                ...user.verificacion
            });
        }
    }, [user, form]);

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            console.log("Datos a enviar:", values);
    
            if (!user || !user.usuario || !user.usuario.idusuario) {
                console.error("Error: ID de usuario no definido.");
                message.error("No se puede actualizar porque falta el ID del usuario.");
                return;
            }
    
            setLoading(true);
            await updateUserDetails(user.usuario.idusuario, values);
            message.success("Usuario actualizado exitosamente.");
            onUserUpdated();
            onCancel();
        } catch (error) {
            console.error("Error en la actualización del usuario:", error);
            message.error("Error al actualizar el usuario.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div style={{ padding: '20px' }}>
            <Button icon={<ArrowLeftOutlined />} type="link" onClick={onCancel}>
                Volver a la lista
            </Button>

            <h2>Editar Usuario</h2>

            <Tabs defaultActiveKey="1">
                <TabPane tab="Datos Básicos" key="1">
                    <Form form={form} layout="vertical" onFinish={handleUpdate}>
                        <Form.Item name="usuario" label="Nombre de Usuario">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item name="correo" label="Correo Electrónico">
                            <Input />
                        </Form.Item>
                        <Form.Item name="id_rol" label="Rol">
                            <Select>
                                <Option value={1}>Administrador</Option>
                                <Option value={2}>Creador</Option>
                                <Option value={3}>Usuario</Option>
                                <Option value={4}>Soporte</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </TabPane>

                <TabPane tab="Información Personal" key="2">
                    <Form form={form} layout="vertical">
                        <Form.Item name="nombres" label="Nombres"><Input /></Form.Item>
                        <Form.Item name="apellidos" label="Apellidos"><Input /></Form.Item>
                        <Form.Item name="fecha_nacimiento" label="Fecha de Nacimiento">
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                        <Form.Item name="identificacion" label="Identificación"><Input /></Form.Item>
                        <Form.Item name="genero" label="Género">
                            <Select>
                                {GENDER_OPTIONS.map((g) => <Option key={g} value={g}>{g}</Option>)}
                            </Select>
                        </Form.Item>
                    </Form>
                </TabPane>

                <TabPane tab="Información de Contacto" key="3">
                    <Form form={form} layout="vertical">
                        <Form.Item name="provincia" label="Provincia"><Input /></Form.Item>
                        <Form.Item name="canton" label="Cantón"><Input /></Form.Item>
                        <Form.Item name="parroquia" label="Parroquia"><Input /></Form.Item>
                        <Form.Item name="callePrincipal" label="Calle Principal"><Input /></Form.Item>
                        <Form.Item name="celularPrincipal" label="Celular Principal"><Input /></Form.Item>
                    </Form>
                </TabPane>

                <TabPane tab="Información Académica" key="4">
                    <Form form={form} layout="vertical">
                        <Form.Item name="ocupacion" label="Ocupación"><Input /></Form.Item>
                        <Form.Item name="nivel_estudios" label="Nivel de Estudios"><Input /></Form.Item>
                        <Form.Item name="titulo_universitario" label="Título Universitario"><Input /></Form.Item>
                    </Form>
                </TabPane>

                <TabPane tab="Información Financiera" key="5">
                    <Form form={form} layout="vertical">
                        <Form.Item name="ingreso_mensual" label="Ingreso Mensual"><Input type="number" /></Form.Item>
                        <Form.Item name="gasto_mensual_promedio" label="Gasto Mensual"><Input type="number" /></Form.Item>
                        <Form.Item name="patrimonio" label="Patrimonio"><Input type="number" /></Form.Item>
                    </Form>
                </TabPane>

                <TabPane tab="Verificación" key="6">
                    <Form form={form} layout="vertical">
                        <Form.Item name="estado_identidad" label="Estado Identidad">
                            <Select>
                                {STATUS_OPTIONS.map((s) => <Option key={s} value={s}>{s}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="estado_domicilio" label="Estado Domicilio">
                            <Select>
                                {STATUS_OPTIONS.map((s) => <Option key={s} value={s}>{s}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="estado_ingresos" label="Estado Ingresos">
                            <Select>
                                {STATUS_OPTIONS.map((s) => <Option key={s} value={s}>{s}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item name="estado_antecedentes" label="Estado Antecedentes">
                            <Select>
                                {STATUS_OPTIONS.map((s) => <Option key={s} value={s}>{s}</Option>)}
                            </Select>
                        </Form.Item>
                    </Form>
                </TabPane>
            </Tabs>

            <div style={{ marginTop: '20px' }}>
                <Button type="primary" loading={loading} onClick={() => form.submit()}>
                    Guardar Cambios
                </Button>
            </div>
        </div>
    );
};

export default EditUsuario;
