const ProyectoTipo = require('../models/proyecto_tipo.model');

const proyectoTipoController = {};

// Obtener todos los tipos de proyectos
proyectoTipoController.getAll = async (req, res) => {
    try {
        const tipos = await ProyectoTipo.getAll();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los tipos de proyectos.', error });
    }
};

// Obtener un tipo de proyecto por su ID
proyectoTipoController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const tipo = await ProyectoTipo.getById(id);

        if (!tipo) {
            return res.status(404).json({ mensaje: 'Tipo de proyecto no encontrado.' });
        }

        res.status(200).json(tipo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el tipo de proyecto.', error });
    }
};

// Crear un nuevo tipo de proyecto
proyectoTipoController.create = async (req, res) => {
    try {
        const { nombre_tipo } = req.body;

        if (!nombre_tipo) {
            return res.status(400).json({ mensaje: 'El campo nombre_tipo es obligatorio.' });
        }

        const id = await ProyectoTipo.create(nombre_tipo);
        res.status(201).json({ mensaje: 'Tipo de proyecto creado exitosamente.', id });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'El tipo de proyecto ya existe.' });
        }
        res.status(500).json({ mensaje: 'Error al crear el tipo de proyecto.', error });
    }
};

// Actualizar un tipo de proyecto existente
proyectoTipoController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_tipo } = req.body;

        if (!nombre_tipo) {
            return res.status(400).json({ mensaje: 'El campo nombre_tipo es obligatorio.' });
        }

        const exito = await ProyectoTipo.update(id, nombre_tipo);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Tipo de proyecto no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Tipo de proyecto actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el tipo de proyecto.', error });
    }
};

// Eliminar un tipo de proyecto
proyectoTipoController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await ProyectoTipo.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Tipo de proyecto no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Tipo de proyecto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el tipo de proyecto.', error });
    }
};

module.exports = proyectoTipoController;