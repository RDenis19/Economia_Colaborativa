const express = require('express');
const router = express.Router();
const informacionAcademicaController = require('../controller/informacion_academica.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener la información académica de un usuario por su ID
router.get('/:id', authMiddleware, informacionAcademicaController.getByUserId);

// Ruta para crear nueva información académica
router.post('/', authMiddleware, informacionAcademicaController.create);

// Ruta para actualizar la información académica de un usuario
router.put('/:id', authMiddleware, informacionAcademicaController.update);

// Ruta para eliminar la información académica de un usuario
router.delete('/:id', authMiddleware, informacionAcademicaController.delete);

module.exports = router;
