// Archivo Usuario.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Tooltip } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchUsers } from '../../utils/api';

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reinicia a la primera página cuando se busca
  };

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const usuariosFiltrados = usuarios
    .filter((usuario) =>
      usuario.usuario.toLowerCase().includes(searchText.toLowerCase())
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columnas = [
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
    },
    {
      title: 'Correo',
      dataIndex: 'correo',
      key: 'correo',
    },
    {
      title: 'Fecha de Registro',
      dataIndex: 'fecha_registro',
      key: 'fecha_registro',
      render: (fecha) => formatearFecha(fecha),
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
        <h2 style={{ margin: 0 }}>Lista de Usuarios</h2>
        <Input
          placeholder="Buscar por usuario"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
        <Button type="primary" icon={<PlusOutlined />}>Crear Usuario</Button>
      </div>
      <Table
        columns={columnas}
        dataSource={usuariosFiltrados}
        loading={loading}
        rowKey="idusuario"
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: usuarios.filter((usuario) =>
            usuario.usuario.toLowerCase().includes(searchText.toLowerCase())
          ).length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
};

export default Usuario;