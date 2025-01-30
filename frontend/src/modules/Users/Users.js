import React, { useEffect, useState } from 'react';
import { Table, Button, Input, Space, Tooltip, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { fetchUsers, deleteUserById, fetchUserDetails } from '../../utils/api';
import AddUsuario from './AddUsuario';
import EditUsuario from './EditUsuario';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null); // Estado para edición

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

    const handleDelete = async (id) => {
        try {
            await deleteUserById(id);
            message.success('Usuario eliminado exitosamente.');
            cargarUsuarios();
        } catch (error) {
            message.error('Error al eliminar usuario.');
        }
    };

    const handleEdit = async (id) => {
      if (!id) {
          message.error("ID de usuario inválido.");
          return;
      }
  
      setLoading(true);
      try {
          const userData = await fetchUserDetails(id);
          if (!userData) {
              message.error("Usuario no encontrado.");
              return;
          }
          setEditingUser(userData);
      } catch (error) {
          message.error("Error al cargar datos del usuario.");
      } finally {
          setLoading(false);
      }
  };
  
  

    const handleCancelEdit = () => {
        setEditingUser(null); // Vuelve a la lista de usuarios
    };

    if (editingUser) {
        return <EditUsuario user={editingUser} onCancel={handleCancelEdit} onUserUpdated={cargarUsuarios} />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Lista de Usuarios</h2>
                <Input
                    placeholder="Buscar por usuario"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: '300px' }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowAddUserModal(true)}>
                    Crear Usuario
                </Button>
            </div>

            <Table
                columns={[
                    { title: 'Usuario', dataIndex: 'usuario', key: 'usuario' },
                    { title: 'Correo', dataIndex: 'correo', key: 'correo' },
                    { title: 'Rol', dataIndex: 'nombre_rol', key: 'nombre_rol' },
                    { title: 'Fecha de Registro', dataIndex: 'fecha_registro', key: 'fecha_registro' },
                    {
                        title: 'Acción',
                        key: 'accion',
                        render: (text, record) => (
                            <Space size="middle">
                                <Tooltip title="Ver"><Button icon={<EyeOutlined />} type="primary" /></Tooltip>
                                <Tooltip title="Editar">
                                    <Button icon={<EditOutlined />} type="default" onClick={() => handleEdit(record.idusuario)} />
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <Button icon={<DeleteOutlined />} type="danger" onClick={() => handleDelete(record.idusuario)} />
                                </Tooltip>
                            </Space>
                        ),
                    }
                ]}
                dataSource={usuarios}
                loading={loading}
                rowKey="idusuario"
                pagination={{
                    current: currentPage,
                    pageSize: itemsPerPage,
                    total: usuarios.length,
                    onChange: (page) => setCurrentPage(page),
                }}
            />

            {showAddUserModal && <AddUsuario closeModal={() => setShowAddUserModal(false)} onUserAdded={cargarUsuarios} />}
        </div>
    );
};

export default Usuario;
