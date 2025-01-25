const Proyecto = require('../models/proyecto.model');

const proyectoController = {};

// Obtener todos los proyectos
proyectoController.getAll = async (req, res) => {
    try {
        const proyectos = await Proyecto.getAll();
        res.status(200).json(proyectos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los proyectos.', error });
    }
};

// Obtener un proyecto por su ID
proyectoController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const proyecto = await Proyecto.getById(id);

        if (!proyecto) {
            return res.status(404).json({ mensaje: 'Proyecto no encontrado.' });
        }

        res.status(200).json(proyecto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el proyecto.', error });
    }
};

// Crear un nuevo proyecto
proyectoController.create = async (req, res) => {
    try {
        const { nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, id_categoria } = req.body;

        if (!nombre || !descripcion || !meta_financiera || !id_creador || !id_tipo || !id_categoria) {
            return res.status(400).json({ mensaje: 'Todos los campos obligatorios deben ser proporcionados.' });
        }

        const idProyecto = await Proyecto.create({ nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, id_categoria });
        res.status(201).json({ mensaje: 'Proyecto creado exitosamente.', id: idProyecto });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el proyecto.', error });
    }
};

// Actualizar un proyecto existente
proyectoController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, meta_financiera, fecha_inicio, id_tipo, id_categoria, estado } = req.body;

        const exito = await Proyecto.update(id, { nombre, descripcion, meta_financiera, fecha_inicio, id_tipo, id_categoria, estado });

        if (!exito) {
            return res.status(404).json({ mensaje: 'Proyecto no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Proyecto actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el proyecto.', error });
    }
};

// Eliminar un proyecto
proyectoController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await Proyecto.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Proyecto no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Proyecto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el proyecto.', error });
    }
};

module.exports = proyectoController;