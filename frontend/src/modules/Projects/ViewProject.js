import React, { useEffect, useState } from 'react';
import { Card, Button, Descriptions, Tag, Tabs, Table, Typography } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { fetchProjectVerificationDocuments } from '../../utils/api';

const { Title } = Typography;
const { TabPane } = Tabs;

const ViewProject = ({ project, onBack }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      loadDocuments(project.id_proyecto);
    }
  }, [project]);

  const loadDocuments = async (projectId) => {
    setLoading(true);
    try {
      const data = await fetchProjectVerificationDocuments(projectId);
      setDocuments(data);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!project) return null;

  const documentColumns = [
    { title: 'ID', dataIndex: 'id_documento_proyecto', key: 'id_documento_proyecto' },
    { title: 'Tipo de Documento', dataIndex: 'tipo_documento', key: 'tipo_documento' },
    { title: 'Fecha de Subida', dataIndex: 'fecha_subida', key: 'fecha_subida', render: date => new Date(date).toLocaleDateString() },
    { title: 'Archivo', dataIndex: 'ruta_archivo', key: 'ruta_archivo', render: (ruta) => <a href={ruta} target="_blank" rel="noopener noreferrer">Ver Archivo</a> },
  ];

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
      {/* Botón de Regresar */}
      <Button type="default" icon={<ArrowLeftOutlined />} onClick={onBack} style={{ marginBottom: '20px' }}>
        Volver a la lista
      </Button>

      {/* Sección de Detalles del Proyecto */}
      <Card style={{ marginBottom: '20px' }}>
        <Title level={3} style={{ textAlign: 'center', marginBottom: '15px' }}>Detalles del Proyecto</Title>
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID">{project.id_proyecto}</Descriptions.Item>
          <Descriptions.Item label="Nombre">{project.nombre}</Descriptions.Item>
          <Descriptions.Item label="Descripción" span={2}>{project.descripcion}</Descriptions.Item>
          <Descriptions.Item label="Meta Financiera">${project.meta_financiera.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="Estado">
            <Tag color={project.estado === 'Aprobado' ? 'green' : project.estado === 'Pendiente' ? 'gold' : 'red'}>
              {project.estado}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Fecha de Creación">{new Date(project.fecha_creacion).toLocaleDateString()}</Descriptions.Item>
          <Descriptions.Item label="Fecha de Inicio">{project.fecha_inicio ? new Date(project.fecha_inicio).toLocaleDateString() : 'No definida'}</Descriptions.Item>
          <Descriptions.Item label="Categoría"><Tag color="blue">{project.categoria}</Tag></Descriptions.Item>
          <Descriptions.Item label="Tipo"><Tag color="green">{project.tipo}</Tag></Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Sección de Documentos de Verificación */}
      <Card>
        <Title level={4} style={{ marginBottom: '10px' }}>Documentos de Verificación</Title>
        <Table columns={documentColumns} dataSource={documents} loading={loading} rowKey="id_documento_proyecto" />
      </Card>
    </div>
  );
};

export default ViewProject;
