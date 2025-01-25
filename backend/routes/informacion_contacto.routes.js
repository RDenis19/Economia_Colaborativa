const express = require('express');
const router = express.Router();
const informacionContactoController = require('../controller/informacion_contacto.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener la información de contacto de un usuario por su ID
router.get('/:id', authMiddleware, informacionContactoController.getByUserId);

// Ruta para crear nueva información de contacto
router.post('/', authMiddleware, informacionContactoController.create);

// Ruta para actualizar la información de contacto de un usuario
router.put('/:id', authMiddleware, informacionContactoController.update);

// Ruta para eliminar la información de contacto de un usuario
router.delete('/:id', authMiddleware, informacionContactoController.delete);

module.exports = router;
