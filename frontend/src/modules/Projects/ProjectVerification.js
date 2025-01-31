import React, { useEffect, useState } from "react";
import { Modal, Form, Select, Button, message, Typography, Descriptions } from "antd";
import { fetchProjectVerification, updateProjectVerification } from "../../utils/api";
import dayjs from "dayjs";

const { Option } = Select;
const { Title } = Typography;

const ProjectVerification = ({ project, visible, onClose, onVerificationUpdated }) => {
  const [verification, setVerification] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      loadVerification();
    }
  }, [project]);

  const loadVerification = async () => {
    setLoading(true);
    try {
      const data = await fetchProjectVerification(project.id_proyecto);
      setVerification(data);
    } catch (error) {
      console.error("Error al obtener verificación del proyecto:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationChange = async (newStatus) => {
    Modal.confirm({
      title: `¿Estás seguro de cambiar el estado a "${newStatus}"?`,
      content: "Esta acción no se puede deshacer.",
      okText: "Sí, cambiar",
      okType: "primary",
      cancelText: "Cancelar",
      onOk: async () => {
        setLoading(true);
        try {
          await updateProjectVerification(verification.id_proyecto_verificacion, {
            estado_general: newStatus,
            fecha_verificacion: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          });
          message.success(`El estado del proyecto ha sido actualizado a "${newStatus}"`);
          loadVerification();
          onVerificationUpdated();
        } catch (error) {
          message.error("Error al actualizar la verificación del proyecto.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Modal
      title="Verificación del Proyecto"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {verification ? (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Estado">
              <Select
                value={verification.estado_general}
                onChange={handleVerificationChange}
                style={{ width: "100%" }}
                disabled={loading}
              >
                <Option value="Pendiente">Pendiente</Option>
                <Option value="Aprobado">Aprobado</Option>
                <Option value="Rechazado">Rechazado</Option>
              </Select>
            </Descriptions.Item>
            <Descriptions.Item label="Fecha de Solicitud">
              {dayjs(verification.fecha_solicitud).format("DD/MM/YYYY HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Fecha de Verificación">
              {verification.fecha_verificacion
                ? dayjs(verification.fecha_verificacion).format("DD/MM/YYYY HH:mm")
                : "No verificado"}
            </Descriptions.Item>
          </Descriptions>

          <Button type="primary" onClick={onClose} style={{ marginTop: "20px", width: "100%" }}>
            Cerrar
          </Button>
        </>
      ) : (
        <p>Cargando información de verificación...</p>
      )}
    </Modal>
  );
};

export default ProjectVerification;
