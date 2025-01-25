const TicketMensajes = require('../models/ticket_mensajes.model');

const ticketMensajesController = {};

// Obtener todos los mensajes de un ticket
ticketMensajesController.getByTicketId = async (req, res) => {
    try {
        const { id } = req.params;
        const mensajes = await TicketMensajes.getByTicketId(id);

        if (!mensajes || mensajes.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron mensajes para este ticket.' });
        }

        res.status(200).json(mensajes);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los mensajes del ticket.', error });
    }
};

// Crear un nuevo mensaje para un ticket
ticketMensajesController.create = async (req, res) => {
    try {
        const { id_ticket, id_usuario, mensaje } = req.body;

        if (!id_ticket || !id_usuario || !mensaje) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios (id_ticket, id_usuario, mensaje).' });
        }

        const idMensaje = await TicketMensajes.create({ id_ticket, id_usuario, mensaje });
        res.status(201).json({ mensaje: 'Mensaje creado exitosamente.', id: idMensaje });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el mensaje.', error });
    }
};

// Eliminar un mensaje de un ticket
ticketMensajesController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await TicketMensajes.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Mensaje no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Mensaje eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el mensaje.', error });
    }
};

module.exports = ticketMensajesController;
