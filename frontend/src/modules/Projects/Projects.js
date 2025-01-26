// Archivo Proyecto.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Select, Space, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchProjects } from '../../utils/api';

const { Option } = Select;

const Proyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    cargarProyectos();
  }, []);

  const cargarProyectos = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects();
      setProyectos(data);
    } catch (error) {
      console.error('Error al cargar los proyectos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página cuando se busca
  };

  const handleEstadoChange = (value) => {
    setEstadoFiltro(value);
    setCurrentPage(1); // Reinicia a la primera página cuando se filtra
  };

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const proyectosFiltrados = proyectos
    .filter((proyecto) =>
      proyecto.nombre.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((proyecto) =>
      estadoFiltro ? proyecto.estado === estadoFiltro : true
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columnas = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Meta Financiera',
      dataIndex: 'meta_financiera',
      key: 'meta_financiera',
    },
    {
      title: 'Fecha de Creación',
      dataIndex: 'fecha_creacion',
      key: 'fecha_creacion',
      render: (fecha) => formatearFecha(fecha),
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Ver">
            <Button icon={<EyeOutlined />} type="primary" />
          </Tooltip>
          <Tooltip title="Editar">
            <Button icon={<EditOutlined />} type="default" />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button icon={<DeleteOutlined />} type="danger" />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Lista de Proyectos</h2>
        <Input
          placeholder="Buscar por nombre"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
        <Select
          placeholder="Filtrar por estado"
          onChange={handleEstadoChange}
          value={estadoFiltro}
          style={{ width: '200px' }}
        >
          <Option value="Pendiente">Pendiente</Option>
          <Option value="Aprobado">Aprobado</Option>
          <Option value="Rechazado">Rechazado</Option>
        </Select>
        <Button type="primary" icon={<PlusOutlined />}>Crear Proyecto</Button>
      </div>
      <Table
        columns={columnas}
        dataSource={proyectosFiltrados}
        loading={loading}
        rowKey="id_proyecto"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: proyectos.filter((proyecto) =>
            proyecto.nombre.toLowerCase().includes(searchText.toLowerCase()) &&
            (estadoFiltro ? proyecto.estado === estadoFiltro : true)
          ).length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default Proyecto;