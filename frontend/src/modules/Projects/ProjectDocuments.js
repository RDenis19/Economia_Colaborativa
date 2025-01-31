import React, { useEffect, useState } from "react";
import { Modal, Table, Button, Upload, message, Select, Tooltip, Space } from "antd";
import { UploadOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { fetchProjectVerificationDocuments, uploadProjectVerificationDocument, deleteProjectVerificationDocument } from "../../utils/api";

const { Option } = Select;

const ProjectDocuments = ({ project, visible, onClose }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState(null);

  useEffect(() => {
    if (project) {
      loadDocuments();
    }
  }, [project]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const data = await fetchProjectVerificationDocuments(project.id_proyecto);
      setDocuments(data);
    } catch (error) {
      console.error("Error al obtener documentos del proyecto:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async ({ file }) => {
    if (!selectedDocType) {
      message.warning("Seleccione un tipo de documento antes de subir.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("id_proyecto", project.id_proyecto);
    formData.append("tipo_documento", selectedDocType);

    try {
      await uploadProjectVerificationDocument(formData);
      message.success("Documento subido con éxito");
      loadDocuments();
    } catch (error) {
      message.error("Error al subir el documento");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id_documento_proyecto) => {
    Modal.confirm({
      title: "¿Eliminar este documento?",
      content: "Esta acción no se puede deshacer.",
      okText: "Sí, eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await deleteProjectVerificationDocument(id_documento_proyecto);
          message.success("Documento eliminado");
          loadDocuments();
        } catch (error) {
          message.error("Error al eliminar el documento");
        }
      },
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id_documento_proyecto", key: "id_documento_proyecto" },
    { title: "Tipo", dataIndex: "tipo_documento", key: "tipo_documento" },
    { title: "Fecha de Subida", dataIndex: "fecha_subida", key: "fecha_subida" },
    {
      title: "Acciones",
      key: "acciones",
      render: (_, record) => (
        <Space>
          <Tooltip title="Ver Documento">
            <Button icon={<EyeOutlined />} onClick={() => window.open(record.ruta_archivo, "_blank")} />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id_documento_proyecto)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Modal title="Documentos de Verificación" visible={visible} onCancel={onClose} footer={null}>
      <Upload customRequest={handleUpload} showUploadList={false} disabled={uploading}>
        <Select placeholder="Seleccione tipo de documento" onChange={setSelectedDocType} style={{ width: "100%", marginBottom: 10 }}>
          <Option value="PLAN_NEGOCIO">Plan de Negocio</Option>
          <Option value="DOCUMENTO_LEGAL">Documento Legal</Option>
          <Option value="OTRO">Otro</Option>
        </Select>
        <Button icon={<UploadOutlined />} type="primary" loading={uploading} block>
          Subir Documento
        </Button>
      </Upload>

      <Table columns={columns} dataSource={documents} loading={loading} rowKey="id_documento_proyecto" style={{ marginTop: 20 }} />
    </Modal>
  );
};

export default ProjectDocuments;
