const Rol = require('../models/rol.model');

exports.createRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
      return res.status(400).json({ mensaje: 'El campo "nombre" es obligatorio.' });
    }

    const rolesExistentes = await Rol.findAll();
    const nombreExistente = rolesExistentes.find(rol => rol.nombre === nombre);
    if (nombreExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un rol con ese nombre.' });
    }

    const nuevoRolId = await Rol.create({ nombre, descripcion });
    const nuevoRol = await Rol.findById(nuevoRolId);

    res.status(201).json({ mensaje: 'Rol creado exitosamente.', rol: nuevoRol });
  } catch (error) {
    console.error('Error al crear rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

exports.getRolById = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findById(id);

    if (!rol) {
      return res.status(404).json({ mensaje: 'Rol no encontrado.' });
    }

    res.status(200).json(rol);
  } catch (error) {
    console.error('Error al obtener rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const rolExistente = await Rol.findById(id);
    if (!rolExistente) {
      return res.status(404).json({ mensaje: 'Rol no encontrado.' });
    }

    if (!nombre) {
      return res.status(400).json({ mensaje: 'El campo "nombre" es obligatorio.' });
    }

    const rolesExistentes = await Rol.findAll();
    const nombreExistente = rolesExistentes.find(rol => rol.nombre === nombre && rol.id !== parseInt(id));
    if (nombreExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un rol con ese nombre.' });
    }

    const filasAfectadas = await Rol.update(id, { nombre, descripcion });

    if (filasAfectadas === 0) {
      return res.status(400).json({ mensaje: 'No se actualizó ningún campo.' });
    }

    const rolActualizado = await Rol.findById(id);
    res.status(200).json({ mensaje: 'Rol actualizado exitosamente.', rol: rolActualizado });
  } catch (error) {
    console.error('Error al actualizar rol:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};

exports.deleteRol = async (req, res) => {
  try {
    const { id } = req.params;

    const rolExistente = await Rol.findById(id);
    if (!rolExistente) {
      return res.status(404).json({ mensaje: 'Rol no encontrado.' });
    }

    const filasAfectadas = await Rol.delete(id);

    if (filasAfectadas === 0) {
      return res.status(400).json({ mensaje: 'No se pudo eliminar el rol.' });
    }

    res.status(200).json({ mensaje: 'Rol eliminado exitosamente.' });
  } catch (error) {
    console.error('Error al eliminar rol:', error);
    
    if (error.code === 'ER_ROW_IS_REFERENCED_2') {
      return res.status(400).json({ mensaje: 'No se puede eliminar el rol porque está asociado a otros registros.' });
    }
    res.status(500).json({ mensaje: 'Error interno del servidor.' });
  }
};
