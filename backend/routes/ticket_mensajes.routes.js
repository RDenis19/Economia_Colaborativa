const express = require('express');
const router = express.Router();
const ticketMensajesController = require('../controller/ticket_mensajes.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta para obtener todos los mensajes de un ticket
router.get('/:id', authMiddleware, ticketMensajesController.getByTicketId);

// Ruta para crear un nuevo mensaje para un ticket
router.post('/', authMiddleware, ticketMensajesController.create);

// Ruta para eliminar un mensaje de un ticket
router.delete('/:id', authMiddleware, ticketMensajesController.delete);

module.exports = router;
