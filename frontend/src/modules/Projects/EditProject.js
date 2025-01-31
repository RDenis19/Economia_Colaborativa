import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, message, DatePicker } from 'antd';
import { updateProject, fetchProjectCategories, fetchProjectTypes } from '../../utils/api';
import dayjs from 'dayjs';

const { Option } = Select;

const EditProject = ({ visible, onClose, project, onProjectUpdated }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCategory, setSearchCategory] = useState(""); // Estado para búsqueda de categorías
  const [searchType, setSearchType] = useState(""); // Estado para búsqueda de tipos

  useEffect(() => {
    loadCategories();
    loadTypes();
    if (project) {
      form.setFieldsValue({
        nombre: project.nombre,
        descripcion: project.descripcion,
        meta_financiera: project.meta_financiera,
        fecha_inicio: project.fecha_inicio ? dayjs(project.fecha_inicio) : null,
        id_categoria: project.id_categoria,
        id_tipo: project.id_tipo,
      });
    }
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
        fecha_inicio: values.fecha_inicio ? values.fecha_inicio.format("YYYY-MM-DD") : null,
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

        {/* Selección de Categoría con búsqueda */}
        <Form.Item label="Categoría" name="id_categoria" rules={[{ required: true, message: 'Seleccione una categoría' }]}> 
          <Select
            showSearch
            placeholder="Seleccione la categoría"
            optionFilterProp="children"
            onSearch={value => setSearchCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {categories.filter(category => category.nombre_categoria.toLowerCase().includes(searchCategory.toLowerCase())).map(c => (
              <Option key={c.id_categoria} value={c.id_categoria}>{c.nombre_categoria}</Option>
            ))}
          </Select>
        </Form.Item>

        {/* Selección de Tipo de Proyecto con búsqueda */}
        <Form.Item label="Tipo de Proyecto" name="id_tipo" rules={[{ required: true, message: 'Seleccione un tipo de proyecto' }]}> 
          <Select
            showSearch
            placeholder="Seleccione el tipo de proyecto"
            optionFilterProp="children"
            onSearch={value => setSearchType(value)}
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
          >
            {types.filter(type => type.nombre_tipo.toLowerCase().includes(searchType.toLowerCase())).map(t => (
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
