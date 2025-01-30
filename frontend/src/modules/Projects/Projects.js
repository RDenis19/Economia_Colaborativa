import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Tooltip, Modal, message, Tag, Select, Input, Typography } from 'antd';
import { PlusOutlined, EyeOutlined, EditOutlined, FileProtectOutlined, FileAddOutlined, SearchOutlined } from '@ant-design/icons';
import { fetchProjects, deleteProject, fetchProjectCategories, fetchProjectTypes } from '../../utils/api';
import ViewProject from './ViewProject';
import EditProject from './EditProject';
import ProjectVerification from './ProjectVerification';
import ProjectDocuments from './ProjectDocuments';

const { Title } = Typography;
const { Option } = Select;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // 'list', 'view', 'edit', 'verification', 'documents'
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    loadProjects();
    loadCategories();
    loadTypes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, selectedType, projects]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProjects(data.map(project => ({
        ...project,
        categoria: project.nombre_categoria ?? "Sin categoría",
        tipo: project.nombre_tipo ?? "Sin tipo",
      })));
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const applyFilters = () => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(project => project.categoria === selectedCategory);
    }

    if (selectedType) {
      filtered = filtered.filter(project => project.tipo === selectedType);
    }

    setFilteredProjects(filtered);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este proyecto?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteProject(id);
          message.success('Proyecto eliminado con éxito');
          loadProjects();
        } catch (error) {
          message.error('Error al eliminar el proyecto');
        }
      },
    });
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setViewMode("view");
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setViewMode("edit");
  };

  return (
    <div style={{ padding: '20px' }}>
      {viewMode === "list" && (
        <Title level={2} style={{ textAlign: 'center' }}>Lista de Proyectos</Title>
      )}

      {viewMode === "list" ? (
        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Input
              placeholder="Buscar por nombre"
              prefix={<SearchOutlined />}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ width: '250px' }}
            />
            <Select placeholder="Filtrar por Categoría" onChange={setSelectedCategory} allowClear style={{ width: '200px' }}>
              {categories.map(c => <Option key={c.nombre_categoria} value={c.nombre_categoria}>{c.nombre_categoria}</Option>)}
            </Select>
            <Select placeholder="Filtrar por Tipo" onChange={setSelectedType} allowClear style={{ width: '200px' }}>
              {types.map(t => <Option key={t.nombre_tipo} value={t.nombre_tipo}>{t.nombre_tipo}</Option>)}
            </Select>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setViewMode("add")} style={{ marginLeft: 'auto' }}>
              Agregar Proyecto
            </Button>
          </div>

          <Table columns={[
            { title: 'ID', dataIndex: 'id_proyecto', key: 'id_proyecto' },
            { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
            { title: 'Descripción', dataIndex: 'descripcion', key: 'descripcion' },
            { title: 'Meta Financiera', dataIndex: 'meta_financiera', key: 'meta_financiera', render: value => `$${value.toLocaleString()}` },
            { title: 'Fecha Creación', dataIndex: 'fecha_creacion', key: 'fecha_creacion', render: date => new Date(date).toLocaleDateString() },
            { title: 'Fecha Inicio', dataIndex: 'fecha_inicio', key: 'fecha_inicio', render: date => date ? new Date(date).toLocaleDateString() : 'No definida' },
            { title: 'Categoría', dataIndex: 'categoria', key: 'categoria', render: categoria => <Tag color="blue">{categoria}</Tag> },
            { title: 'Tipo', dataIndex: 'tipo', key: 'tipo', render: tipo => <Tag color="green">{tipo}</Tag> },
            {
              title: 'Estado',
              dataIndex: 'estado',
              key: 'estado',
              filters: [
                { text: 'Pendiente', value: 'Pendiente' },
                { text: 'Aprobado', value: 'Aprobado' },
                { text: 'Rechazado', value: 'Rechazado' },
              ],
              onFilter: (value, record) => record.estado === value,
              render: estado => <Tag color={estado === 'Aprobado' ? 'green' : estado === 'Pendiente' ? 'gold' : 'red'}>{estado}</Tag>,
            },
            {
              title: 'Acciones',
              key: 'acciones',
              render: (_, record) => (
                <Space>
                  <Tooltip title="Ver Detalles">
                    <Button icon={<EyeOutlined />} onClick={() => handleViewProject(record)} />
                  </Tooltip>
                  <Tooltip title="Editar">
                    <Button icon={<EditOutlined />} onClick={() => handleEditProject(record)} />
                  </Tooltip>
                  <Tooltip title="Verificación">
                    <Button icon={<FileProtectOutlined />} onClick={() => { setSelectedProject(record); setViewMode("verification"); }} />
                  </Tooltip>
                  <Tooltip title="Documentos">
                    <Button icon={<FileAddOutlined />} onClick={() => { setSelectedProject(record); setViewMode("documents"); }} />
                  </Tooltip>
                </Space>
              ),
            },
          ]} dataSource={filteredProjects} loading={loading} rowKey="id_proyecto" />
        </>
      ) : viewMode === "edit" ? (
        <EditProject project={selectedProject} visible={viewMode === "edit"} onClose={() => setViewMode("list")} onProjectUpdated={loadProjects} />
      ) : (
        viewMode === "view" && <ViewProject project={selectedProject} onBack={() => setViewMode("list")} />
      )}
    </div>
  );
};

export default Projects;
