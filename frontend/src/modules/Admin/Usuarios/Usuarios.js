import React, { useEffect, useState, useCallback } from 'react';
import { Table, Input, Button, Space, Tag, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, FilterOutlined } from '@ant-design/icons';
import { fetchUsers} from '../../../utils/api';

const Usuarios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchText, setSearchText] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchUsers(currentPage, searchText); // Usa fetchUsers correctamente
      setData(response); // Aquí actualizas con la respuesta
      setTotalRecords(response.length); // El total es el tamaño de los usuarios retornados
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchText]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = [
    {
      title: 'Cédula',
      dataIndex: 'cedula',
      key: 'cedula',
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
    },
    {
      title: 'Apellido',
      dataIndex: 'apellido',
      key: 'apellido',
    },
    {
      title: 'Correo Electrónico',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
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
      <h2>Lista de Usuarios</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar usuarios"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Space>
          <Button icon={<FilterOutlined />}>Filtrar</Button>
          <Button type="primary" icon={<PlusOutlined />}>Crear Usuario</Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
        rowKey="id"
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

export default Usuarios;
