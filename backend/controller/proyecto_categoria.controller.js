const ProyectoCategoria = require('../models/proyecto_categoria.model');

const proyectoCategoriaController = {};

// Obtener todas las categorías de proyectos
proyectoCategoriaController.getAll = async (req, res) => {
    try {
        const categorias = await ProyectoCategoria.getAll();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las categorías de proyectos.', error });
    }
};

// Obtener una categoría de proyecto por su ID
proyectoCategoriaController.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await ProyectoCategoria.getById(id);

        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría de proyecto no encontrada.' });
        }

        res.status(200).json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la categoría de proyecto.', error });
    }
};

// Crear una nueva categoría de proyecto
proyectoCategoriaController.create = async (req, res) => {
    try {
        const { nombre_categoria } = req.body;

        if (!nombre_categoria) {
            return res.status(400).json({ mensaje: 'El campo nombre_categoria es obligatorio.' });
        }

        const id = await ProyectoCategoria.create(nombre_categoria);
        res.status(201).json({ mensaje: 'Categoría de proyecto creada exitosamente.', id });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'La categoría de proyecto ya existe.' });
        }
        res.status(500).json({ mensaje: 'Error al crear la categoría de proyecto.', error });
    }
};

// Actualizar una categoría de proyecto existente
proyectoCategoriaController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_categoria } = req.body;

        if (!nombre_categoria) {
            return res.status(400).json({ mensaje: 'El campo nombre_categoria es obligatorio.' });
        }

        const exito = await ProyectoCategoria.update(id, nombre_categoria);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Categoría de proyecto no encontrada o no se pudo actualizar.' });
        }

        res.status(200).json({ mensaje: 'Categoría de proyecto actualizada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la categoría de proyecto.', error });
    }
};

// Eliminar una categoría de proyecto
proyectoCategoriaController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const exito = await ProyectoCategoria.delete(id);

        if (!exito) {
            return res.status(404).json({ mensaje: 'Categoría de proyecto no encontrada o no se pudo eliminar.' });
        }

        res.status(200).json({ mensaje: 'Categoría de proyecto eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la categoría de proyecto.', error });
    }
};

module.exports = proyectoCategoriaController;