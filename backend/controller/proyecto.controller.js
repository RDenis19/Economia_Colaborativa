const Proyecto = require('../models/proyecto.model');

const projectController = {};

// Obtener todos los proyectos
projectController.getAllProjects = async (req, res) => {
    try {
        const proyectos = await Proyecto.getAllProjects();
        res.status(200).json(proyectos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los proyectos.', error });
    }
};

// Obtener un proyecto por su ID
projectController.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const proyecto = await Proyecto.getProjectById(id);

        if (!proyecto) {
            return res.status(404).json({ mensaje: 'Proyecto no encontrado.' });
        }

        res.status(200).json(proyecto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el proyecto.', error });
    }
};

// Crear un nuevo proyecto
projectController.createProject = async (req, res) => {
    try {
        const nuevoProyecto = req.body;
        const idProyecto = await Proyecto.createProject(nuevoProyecto);
        res.status(201).json({ mensaje: 'Proyecto creado exitosamente.', id: idProyecto });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el proyecto.', error });
    }
};

// Actualizar un proyecto existente
projectController.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const exito = await Proyecto.updateProject(id, datosActualizados);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Proyecto no encontrado o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Proyecto actualizado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el proyecto.', error });
    }
};

// Eliminar un proyecto
projectController.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await Proyecto.deleteProject(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Proyecto no encontrado o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Proyecto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el proyecto.', error });
    }
};

module.exports = projectController;
