import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message, Modal } from "antd";
import { createProject, fetchProjectCategories, fetchProjectTypes } from "../../utils/api";
import { AuthContext } from "../../auth/AuthContext"; // ✅ Importar el contexto de autenticación

const { Option } = Select;

const AddProject = ({ visible, onClose, onProjectAdded }) => {
  const { usuario } = useContext(AuthContext); // ✅ Obtener el usuario autenticado
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // Estado para categorías
  const [types, setTypes] = useState([]); // Estado para tipos
  const [searchCategory, setSearchCategory] = useState(""); // Estado para buscar categoría
  const [searchType, setSearchType] = useState(""); // Estado para buscar tipo

  // Cargar categorías y tipos de proyectos
  useEffect(() => {
    loadCategories();
    loadTypes();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await fetchProjectCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTypes = async () => {
    setLoading(true);
    try {
      const data = await fetchProjectTypes();
      setTypes(data);
    } catch (error) {
      console.error("Error al cargar tipos de proyectos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    if (!usuario || !usuario.id) {
      message.error("Error: Usuario no autenticado");
      return;
    }

    setLoading(true);
    try {
      const newProject = {
        ...values,
        id_creador: usuario.id, // Asignar automáticamente el usuario autenticado
        fecha_inicio: values.fecha_inicio ? values.fecha_inicio.format("YYYY-MM-DD") : null,
        estado: "Pendiente",
      };

      console.log("Datos enviados al backend:", newProject); // Verificar los datos antes de enviarlos

      await createProject(newProject);
      message.success("Proyecto agregado correctamente");
      form.resetFields();
      onProjectAdded(); // Callback para indicar que se ha agregado el proyecto
      onClose(); // Cerrar el modal
    } catch (error) {
      console.error("Error al agregar el proyecto:", error.response?.data || error);
      message.error("Error al agregar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Agregar Proyecto" visible={visible} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="nombre" label="Nombre del Proyecto" rules={[{ required: true, message: "Ingrese el nombre" }]}>
          <Input placeholder="Ingrese el nombre del proyecto" />
        </Form.Item>

        <Form.Item name="descripcion" label="Descripción" rules={[{ required: true, message: "Ingrese una descripción" }]}>
          <Input.TextArea placeholder="Ingrese una breve descripción" />
        </Form.Item>

        <Form.Item name="meta_financiera" label="Meta Financiera" rules={[{ required: true, message: "Ingrese la meta financiera" }]}>
          <Input type="number" placeholder="Ingrese la meta financiera" />
        </Form.Item>

        <Form.Item name="fecha_inicio" label="Fecha de Inicio">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Selección de Categoría con búsqueda */}
        <Form.Item name="id_categoria" label="Categoría" rules={[{ required: true, message: "Seleccione una categoría" }]}>
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
        <Form.Item name="id_tipo" label="Tipo de Proyecto" rules={[{ required: true, message: "Seleccione un tipo de proyecto" }]}>
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

        <Button type="primary" htmlType="submit" loading={loading} block>
          Agregar Proyecto
        </Button>
      </Form>
    </Modal>
  );
};

export default AddProject;
