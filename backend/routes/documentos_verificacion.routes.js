const express = require('express');
const router = express.Router();
const documentosVerificacionController = require('../controller/documentos_verificacion.controller');

// Ruta para obtener documentos por ID de verificación
router.get('/:id', documentosVerificacionController.getByVerificationId);

// Ruta para crear un nuevo documento de verificación
router.post('/', documentosVerificacionController.create);

// Ruta para eliminar un documento de verificación por su ID
router.delete('/:id', documentosVerificacionController.delete);

module.exports = router;