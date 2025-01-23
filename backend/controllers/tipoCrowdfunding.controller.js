const TipoCrowdfunding = require('../models/tipoCrowdfunding.model');
const { validationResult } = require('express-validator');

exports.createTipoCrowdfunding = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { nombre, descripcion } = req.body;

    const tiposExistentes = await TipoCrowdfunding.findAll();
    const nombreExistente = tiposExistentes.find(tipo => tipo.nombre === nombre);
    if (nombreExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un tipo de crowdfunding con ese nombre.' });
    }

    const nuevoTipoId = await TipoCrowdfunding.create({ nombre, descripcion });
    const nuevoTipo = await TipoCrowdfunding.findById(nuevoTipoId);

    res.status(201).json({ mensaje: 'Tipo de crowdfunding creado exitosamente.', tipoCrowdfunding: nuevoTipo });
  } catch (error) {
    console.error('Error al crear tipo de crowdfunding:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

exports.getTiposCrowdfunding = async (req, res) => {
  try {
    const tipos = await TipoCrowdfunding.findAll();
    res.status(200).json(tipos);
  } catch (error) {
    console.error('Error al obtener tipos de crowdfunding:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

exports.getTipoCrowdfundingById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipo = await TipoCrowdfunding.findById(id);

    if (!tipo) {
      return res.status(404).json({ mensaje: 'Tipo de crowdfunding no encontrado.' });
    }

    res.status(200).json(tipo);
  } catch (error) {
    console.error('Error al obtener tipo de crowdfunding:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

exports.updateTipoCrowdfunding = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const tipoExistente = await TipoCrowdfunding.findById(id);
    if (!tipoExistente) {
      return res.status(404).json({ mensaje: 'Tipo de crowdfunding no encontrado.' });
    }

    const tiposExistentes = await TipoCrowdfunding.findAll();
    const nombreExistente = tiposExistentes.find(tipo => tipo.nombre === nombre && tipo.id !== parseInt(id));
    if (nombreExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un tipo de crowdfunding con ese nombre.' });
    }

    const filasAfectadas = await TipoCrowdfunding.update(id, { nombre, descripcion });

    if (filasAfectadas === 0) {
      return res.status(400).json({ mensaje: 'No se actualizó ningún campo.' });
    }

    const tipoActualizado = await TipoCrowdfunding.findById(id);
    res.status(200).json({ mensaje: 'Tipo de crowdfunding actualizado exitosamente.', tipoCrowdfunding: tipoActualizado });
  } catch (error) {
    console.error('Error al actualizar tipo de crowdfunding:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

exports.deleteTipoCrowdfunding = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoExistente = await TipoCrowdfunding.findById(id);
    if (!tipoExistente) {
      return res.status(404).json({ mensaje: 'Tipo de crowdfunding no encontrado.' });
    }

    const filasAfectadas = await TipoCrowdfunding.delete(id);

    if (filasAfectadas === 0) {
      return res.status(400).json({ mensaje: 'No se pudo eliminar el tipo de crowdfunding.' });
    }

    res.status(200).json({ mensaje: 'Tipo de crowdfunding eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar tipo de crowdfunding:', error);
    
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({ mensaje: 'No se puede eliminar el tipo de crowdfunding porque está asociado a otros registros.' });
    }
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};
