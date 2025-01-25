const express = require('express');
const router = express.Router();
const proyectoVerificacionDocumentosController = require('../controller/proyecto_verificacion_documentos.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener documentos por ID de verificación de proyecto
router.get('/:id', authMiddleware, proyectoVerificacionDocumentosController.getByVerificationId);

// Ruta para crear un nuevo documento de verificación de proyecto
router.post('/', authMiddleware, proyectoVerificacionDocumentosController.create);

// Ruta para eliminar un documento de verificación de proyecto
router.delete('/:id', authMiddleware, proyectoVerificacionDocumentosController.delete);

module.exports = router;
