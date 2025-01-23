import React, { useEffect, useState, useCallback } from 'react';
import { Table, Input, Button, Space, Tag, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { fetchProjects } from '../../../utils/api'; 

const Proyectos = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchText, setSearchText] = useState('');

  // Función para obtener proyectos
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchProjects();
      const filteredData = result.projects.filter(project =>
        project.nombre.toLowerCase().includes(searchText.toLowerCase())
      );
      setData(filteredData);
      setTotalRecords(result.total);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, [searchText]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = [
    {
      title: 'ID Proyecto',
      dataIndex: 'idProyecto',
      key: 'idProyecto',
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Autor',
      dataIndex: 'autor',
      key: 'autor',
    },
    {
      title: 'Categoría',
      dataIndex: 'categoria',
      key: 'categoria',
    },
    {
      title: 'Impacto',
      dataIndex: 'impacto',
      key: 'impacto',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: (estado) => (
        <Tag color={estado === 'Activo' ? 'green' : 'red'}>{estado}</Tag>
      ),
    },
    {
      title: 'Acción',
      key: 'accion',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} />
          <Button icon={<DeleteOutlined />} />
          <Button icon={<EyeOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Proyectos</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar proyectos"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Space>
          <Button icon={<FilterOutlined />}>Filtrar</Button>
          <Button type="primary" icon={<PlusOutlined />}>Agregar Proyecto</Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="idProyecto"
      />
      <Pagination
        style={{ marginTop: '20px', textAlign: 'center' }}
        current={currentPage}
        total={totalRecords}
        pageSize={8}
        onChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Proyectos;
