const express = require('express');
const router = express.Router();
const documentosVerificacionController = require('../controller/documentos_verificacion.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener documentos por ID de verificación
router.get('/:id', authMiddleware, documentosVerificacionController.getByVerificationId);

// Ruta para crear un nuevo documento de verificación
router.post('/', authMiddleware, documentosVerificacionController.create);

// Ruta para eliminar un documento de verificación por su ID
router.delete('/:id', authMiddleware, documentosVerificacionController.delete);

module.exports = router;
