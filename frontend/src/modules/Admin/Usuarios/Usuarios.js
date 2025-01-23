import React, { useEffect, useState, useCallback } from 'react';
import { Table, Input, Button, Space, Tag, Select, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { fetchUsers, deleteUserById } from '../../../utils/api';
import AgregarUsuario from './AgregarUsuario';
import VistaPerfil from './VistaPerfil';
import ActualizarUsuario from './ActualizarUsuario';

const { Option } = Select;
const { confirm } = Modal;

const Usuarios = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterEstado, setFilterEstado] = useState('');
  const [filterRol, setFilterRol] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchUsers();
      setAllData(response);
      setFilteredData(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let data = [...allData];

    if (searchText) {
      data = data.filter(
        (user) =>
          user.cedula.toLowerCase().includes(searchText.toLowerCase()) ||
          user.nombres.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterEstado) {
      data = data.filter((user) => user.estado === filterEstado);
    }

    if (filterRol) {
      data = data.filter((user) => user.rol === filterRol);
    }

    setFilteredData(data);
  }, [searchText, filterEstado, filterRol, allData]);

  const handleViewUser = (id) => {
    setSelectedUserId(id);
    setIsViewModalOpen(true);
  };

  const handleEditUser = (id) => {
    setSelectedUserId(id);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUserId(null);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setSelectedUserId(null);
  };

  const handleDeleteUser = (id) => {
    confirm({
      title: '¿Estás seguro de que deseas eliminar este usuario?',
      icon: <ExclamationCircleOutlined />,
      content: 'Esta acción no se puede deshacer.',
      okText: 'Sí, eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await deleteUserById(id);
          message.success('Usuario eliminado exitosamente');
          fetchData();
        } catch (error) {
          message.error(error.mensaje || 'Error al eliminar usuario');
        }
      },
    });
  };

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
          <Button icon={<EditOutlined />} onClick={() => handleEditUser(record.id)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteUser(record.id)}
          />
          <Button icon={<EyeOutlined />} onClick={() => handleViewUser(record.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Usuarios</h2>
      <Space style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <Input
          placeholder="Buscar por Cédula o Nombre"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '300px' }}
        />
        <Space>
          <Select
            placeholder="Filtrar por Estado"
            value={filterEstado}
            onChange={(value) => setFilterEstado(value)}
            style={{ width: '150px' }}
            allowClear
          >
            <Option value="Activo">Activo</Option>
            <Option value="Inactivo">Inactivo</Option>
          </Select>
          <Select
            placeholder="Filtrar por Rol"
            value={filterRol}
            onChange={(value) => setFilterRol(value)}
            style={{ width: '200px' }}
            allowClear
          >
            <Option value="Administrador">Administrador</Option>
            <Option value="Prestatario">Prestatario</Option>
            <Option value="Prestamista">Prestamista</Option>
            <Option value="Soporte">Soporte</Option>
          </Select>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
            Crear Usuario
          </Button>
        </Space>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{
          pageSize: 8,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
        }}
        rowKey="id"
      />
      <AgregarUsuario
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onUserAdded={fetchData}
      />
      <VistaPerfil
        open={isViewModalOpen}
        onClose={closeModal}
        userId={selectedUserId}
      />
      <ActualizarUsuario
        open={isEditModalOpen}
        onClose={closeEditModal}
        userId={selectedUserId}
        onUserUpdated={fetchData}
      />
    </div>
  );
};

export default Usuarios;
