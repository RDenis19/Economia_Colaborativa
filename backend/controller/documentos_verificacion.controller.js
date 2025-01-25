const DocumentosVerificacion = require('../models/documentos_verificacion.model');

const documentosVerificacionController = {};

// Obtener documentos por ID de verificación
documentosVerificacionController.getByVerificationId = async (req, res) => {
    try {
        const { id } = req.params;
        const documentos = await DocumentosVerificacion.getByVerificationId(id);

        if (!documentos || documentos.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron documentos para esta verificación.' });
        }

        res.status(200).json(documentos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los documentos.', error });
    }
};

// Crear un nuevo documento de verificación
documentosVerificacionController.create = async (req, res) => {
    try {
        const { id_verificacion, tipo_documento, ruta_archivo } = req.body;

        if (!id_verificacion || !tipo_documento || !ruta_archivo) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios (id_verificacion, tipo_documento, ruta_archivo).' });
        }

        const idDocumento = await DocumentosVerificacion.create({ id_verificacion, tipo_documento, ruta_archivo });
        res.status(201).json({ mensaje: 'Documento creado exitosamente.', id: idDocumento });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el documento.', error });
    }
};

// Eliminar un documento de verificación por su ID
documentosVerificacionController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await DocumentosVerificacion.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Documento no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Documento eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el documento.', error });
    }
};

module.exports = documentosVerificacionController;