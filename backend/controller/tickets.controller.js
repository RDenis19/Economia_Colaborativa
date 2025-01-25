const Tickets = require('../models/tickets.model');

const ticketsController = {};

// Obtener todos los tickets
ticketsController.getAll = async (req, res) => {
    try {
        const tickets = await Tickets.getAll();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los tickets.', error });
    }
};

// Obtener un ticket por su ID
ticketsController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Tickets.getById(id);

        if (!ticket) {
            return res.status(404).json({ mensaje: 'Ticket no encontrado.' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el ticket.', error });
    }
};

// Crear un nuevo ticket
ticketsController.create = async (req, res) => {
    try {
        const { id_usuario_creador, asunto, descripcion, prioridad } = req.body;

        if (!id_usuario_creador || !asunto || !descripcion) {
            return res.status(400).json({ mensaje: 'Los campos id_usuario_creador, asunto y descripcion son obligatorios.' });
        }

        const idTicket = await Tickets.create({ id_usuario_creador, asunto, descripcion, prioridad });
        res.status(201).json({ mensaje: 'Ticket creado exitosamente.', id: idTicket });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el ticket.', error });
    }
};

// Actualizar un ticket existente
ticketsController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario_soporte, estado, prioridad, fecha_cierre } = req.body;

        const exito = await Tickets.update(id, { id_usuario_soporte, estado, prioridad, fecha_cierre });

        if (!exito) {
            return res.status(404).json({ mensaje: 'Ticket no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Ticket actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el ticket.', error });
    }
};

// Eliminar un ticket
ticketsController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await Tickets.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Ticket no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Ticket eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el ticket.', error });
    }
};

module.exports = ticketsController;