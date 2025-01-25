const express = require('express');
const router = express.Router();
const ticketsController = require('../controller/tickets.controller');

// Ruta para obtener todos los tickets
router.get('/', ticketsController.getAll);

// Ruta para obtener un ticket por su ID
router.get('/:id', ticketsController.getById);

// Ruta para crear un nuevo ticket
router.post('/', ticketsController.create);

// Ruta para actualizar un ticket existente
router.put('/:id', ticketsController.update);

// Ruta para eliminar un ticket
router.delete('/:id', ticketsController.delete);

module.exports = router;