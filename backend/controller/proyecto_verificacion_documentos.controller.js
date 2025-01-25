const ProyectoVerificacionDocumentos = require('../models/proyecto_verificacion_documentos.model');

const proyectoVerificacionDocumentosController = {};

// Obtener todos los documentos de verificación de un proyecto
proyectoVerificacionDocumentosController.getByVerificationId = async (req, res) => {
    try {
        const { id } = req.params;
        const documentos = await ProyectoVerificacionDocumentos.getByVerificationId(id);

        if (!documentos || documentos.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron documentos para esta verificación.' });
        }

        res.status(200).json(documentos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los documentos de verificación.', error });
    }
};

// Crear un nuevo documento de verificación de proyecto
proyectoVerificacionDocumentosController.create = async (req, res) => {
    try {
        const { id_proyecto_verificacion, tipo_documento, ruta_archivo } = req.body;

        if (!id_proyecto_verificacion || !tipo_documento || !ruta_archivo) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios (id_proyecto_verificacion, tipo_documento, ruta_archivo).' });
        }

        const idDocumento = await ProyectoVerificacionDocumentos.create({ id_proyecto_verificacion, tipo_documento, ruta_archivo });
        res.status(201).json({ mensaje: 'Documento de verificación creado exitosamente.', id: idDocumento });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el documento de verificación.', error });
    }
};

// Eliminar un documento de verificación de proyecto
proyectoVerificacionDocumentosController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await ProyectoVerificacionDocumentos.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Documento no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Documento de verificación eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el documento de verificación.', error });
    }
};

module.exports = proyectoVerificacionDocumentosController;