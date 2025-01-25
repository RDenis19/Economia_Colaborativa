const express = require('express');
const router = express.Router();
const ticketMensajesController = require('../controller/ticket_mensajes.controller');

// Ruta para obtener todos los mensajes de un ticket
router.get('/:id', ticketMensajesController.getByTicketId);

// Ruta para crear un nuevo mensaje para un ticket
router.post('/', ticketMensajesController.create);

// Ruta para eliminar un mensaje de un ticket
router.delete('/:id', ticketMensajesController.delete);

module.exports = router;