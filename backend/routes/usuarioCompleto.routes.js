const express = require('express');
const router = express.Router();
const usuarioCompletoController = require('../controller/usuarioCompleto.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los detalles de un usuario en un solo endpoint
router.get('/:id', authMiddleware, usuarioCompletoController.getUserDetails);

// Actualizar la información completa de un usuario
router.put('/:id', authMiddleware, usuarioCompletoController.updateUserDetails);

module.exports = router;
