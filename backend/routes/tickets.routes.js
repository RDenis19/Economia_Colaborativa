const express = require('express');
const router = express.Router();
const ticketsController = require('../controller/tickets.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todos los tickets
router.get('/', authMiddleware, ticketsController.getAll);

// Ruta para obtener un ticket por su ID
router.get('/:id', authMiddleware, ticketsController.getById);

// Ruta para crear un nuevo ticket
router.post('/', authMiddleware, ticketsController.create);

// Ruta para actualizar un ticket existente
router.put('/:id', authMiddleware, ticketsController.update);

// Ruta para eliminar un ticket
router.delete('/:id', authMiddleware, ticketsController.delete);

module.exports = router;
