const Categoria = require('../models/categoria.model');

exports.createCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({ mensaje: 'El campo "nombre" es obligatorio.' });
        }

        const categoriasExistentes = await Categoria.findAll();
        const nombreExistente = categoriasExistentes.find(cat => cat.nombre === nombre);
        if (nombreExistente) {
            return res.status(400).json({ mensaje: 'Ya existe una categoría con ese nombre.' });
        }

        const nuevoCategoriaId = await Categoria.create({ nombre, descripcion });
        const nuevaCategoria = await Categoria.findById(nuevoCategoriaId);

        res.status(201).json({ mensaje: 'Categoría creada exitosamente.', categoria: nuevaCategoria });
    } catch (error) {
        console.error('Error al crear categoría:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

exports.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

exports.getCategoriaById = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
        }

        res.status(200).json(categoria);
    } catch (error) {
        console.error('Error al obtener categoría:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

exports.updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        const categoriaExistente = await Categoria.findById(id);
        if (!categoriaExistente) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
        }

        if (!nombre) {
            return res.status(400).json({ mensaje: 'El campo "nombre" es obligatorio.' });
        }

        const categoriasExistentes = await Categoria.findAll();
        const nombreExistente = categoriasExistentes.find(cat => cat.nombre === nombre && cat.id !== parseInt(id));
        if (nombreExistente) {
            return res.status(400).json({ mensaje: 'Ya existe una categoría con ese nombre.' });
        }

        const filasAfectadas = await Categoria.update(id, { nombre, descripcion });

        if (filasAfectadas === 0) {
            return res.status(400).json({ mensaje: 'No se actualizó ningún campo.' });
        }

        const categoriaActualizada = await Categoria.findById(id);
        res.status(200).json({ mensaje: 'Categoría actualizada exitosamente.', categoria: categoriaActualizada });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};

exports.deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;

        const categoriaExistente = await Categoria.findById(id);
        if (!categoriaExistente) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada.' });
        }

        const filasAfectadas = await Categoria.delete(id);

        if (filasAfectadas === 0) {
            return res.status(400).json({ mensaje: 'No se pudo eliminar la categoría.' });
        }

        res.status(200).json({ mensaje: 'Categoría eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);

        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(400).json({ mensaje: 'No se puede eliminar la categoría porque está asociada a otros registros.' });
        }
        res.status(500).json({ mensaje: 'Error interno del servidor.' });
    }
};
