import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Spin } from 'antd';
import { fetchUserById } from '../../../utils/api';

const VistaPerfil = ({ open, onClose, userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await fetchUserById(userId);
          setUserData(data);
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userId]);

  return (
    <Modal
      title="Información del Usuario"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      {loading ? (
        <Spin tip="Cargando datos del usuario..." />
      ) : userData ? (
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{userData.id}</Descriptions.Item>
          <Descriptions.Item label="Nombres">{userData.nombres}</Descriptions.Item>
          <Descriptions.Item label="Apellido">{userData.apellido}</Descriptions.Item>
          <Descriptions.Item label="Cédula">{userData.cedula}</Descriptions.Item>
          <Descriptions.Item label="Correo Electrónico">{userData.email}</Descriptions.Item>
          <Descriptions.Item label="Rol">{userData.rol}</Descriptions.Item>
          <Descriptions.Item label="Estado">{userData.estado}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Registro">{userData.fecha_registro}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Verificación">{userData.fecha_verificacion}</Descriptions.Item>
        </Descriptions>
      ) : (
        <p>No se encontraron datos del usuario.</p>
      )}
    </Modal>
  );
};

export default VistaPerfil;
