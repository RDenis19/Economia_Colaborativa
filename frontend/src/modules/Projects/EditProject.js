import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, message, DatePicker } from 'antd';
import { updateProject, fetchProjectCategories, fetchProjectTypes } from '../../utils/api';
import dayjs from 'dayjs';

const { Option } = Select;

const EditProject = ({ project, visible, onClose, onProjectUpdated }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      form.setFieldsValue({
        nombre: project.nombre,
        descripcion: project.descripcion,
        meta_financiera: project.meta_financiera,
        fecha_inicio: project.fecha_inicio ? dayjs(project.fecha_inicio) : null, // CORREGIDO
        id_categoria: project.id_categoria,
        id_tipo: project.id_tipo,
      });
    }
    loadCategories();
    loadTypes();
  }, [project]);  

  const loadCategories = async () => {
    try {
      const data = await fetchProjectCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const loadTypes = async () => {
    try {
      const data = await fetchProjectTypes();
      setTypes(data);
    } catch (error) {
      console.error('Error al obtener tipos de proyecto:', error);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        fecha_inicio: values.fecha_inicio ? values.fecha_inicio.format("YYYY-MM-DD") : null, // CONVERSIÓN SEGURA
      };
      await updateProject(project.id_proyecto, formattedValues);
      message.success('Proyecto actualizado correctamente');
      onProjectUpdated();
      onClose();
    } catch (error) {
      message.error('Error al actualizar el proyecto');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Modal
      title="Editar Proyecto"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'El nombre es obligatorio' }]}> 
          <Input />
        </Form.Item>

        <Form.Item label="Descripción" name="descripcion" rules={[{ required: true, message: 'La descripción es obligatoria' }]}> 
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Meta Financiera" name="meta_financiera" rules={[{ required: true, message: 'Ingrese la meta financiera' }]}> 
          <Input type="number" min={0} />
        </Form.Item>

        <Form.Item label="Fecha de Inicio" name="fecha_inicio">
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>


        <Form.Item label="Categoría" name="id_categoria" rules={[{ required: true, message: 'Seleccione una categoría' }]}> 
          <Select>
            {categories.map(c => (
              <Option key={c.id_categoria} value={c.id_categoria}>{c.nombre_categoria}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Tipo de Proyecto" name="id_tipo" rules={[{ required: true, message: 'Seleccione un tipo de proyecto' }]}> 
          <Select>
            {types.map(t => (
              <Option key={t.id_tipo} value={t.id_tipo}>{t.nombre_tipo}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProject;
