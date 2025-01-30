import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, message, InputNumber, Card } from 'antd';
import { fetchProjectCategories, fetchProjectTypes, createProject } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddProject = () => {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadTypes();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchProjectCategories();
      setCategories(data);
    } catch (error) {
      message.error('Error al obtener categorías');
    }
  };

  const loadTypes = async () => {
    try {
      const data = await fetchProjectTypes();
      setTypes(data);
    } catch (error) {
      message.error('Error al obtener tipos de proyecto');
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await createProject(values);
      message.success('Proyecto creado exitosamente');
      navigate('/projects');
    } catch (error) {
      message.error('Error al crear el proyecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Crear Nuevo Proyecto" style={{ maxWidth: 600, margin: 'auto', marginTop: 20 }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="nombre"
          label="Nombre del Proyecto"
          rules={[{ required: true, message: 'Ingrese el nombre del proyecto' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: 'Ingrese la descripción del proyecto' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="meta_financiera"
          label="Meta Financiera"
          rules={[{ required: true, message: 'Ingrese la meta financiera' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="id_categoria"
          label="Categoría"
          rules={[{ required: true, message: 'Seleccione una categoría' }]}
        >
          <Select placeholder="Seleccione una categoría">
            {categories.map((cat) => (
              <Option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre_categoria}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="id_tipo"
          label="Tipo de Proyecto"
          rules={[{ required: true, message: 'Seleccione un tipo de proyecto' }]}
        >
          <Select placeholder="Seleccione un tipo de proyecto">
            {types.map((type) => (
              <Option key={type.id_tipo} value={type.id_tipo}>
                {type.nombre_tipo}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Crear Proyecto
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddProject;
