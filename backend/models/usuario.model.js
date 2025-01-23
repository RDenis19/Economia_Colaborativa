const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = {};

// Crear un nuevo usuario
Usuario.create = async (usuarioData) => {
  const { nombres, apellido, cedula, email, contraseña, rol_id, fecha_nacimiento, usuarioscol, estado } = usuarioData;
  
  // Encriptacion de la contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(contraseña, salt);
  
  const [result] = await pool.execute(
    `INSERT INTO usuarios 
      (nombres, apellido, cedula, email, contraseña, rol_id, fecha_nacimiento, usuarioscol, estado) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nombres, apellido, cedula, email, hashedPassword, rol_id, fecha_nacimiento, usuarioscol, estado || 'Activo']
  );
  
  return result.insertId;
};

// Obtener todos los usuarios
Usuario.findAll = async () => {
  const [rows] = await pool.execute(
    `SELECT u.id, u.nombres, u.apellido, u.cedula, u.email, u.verificado, u.fecha_nacimiento, 
            u.fecha_registro, u.fecha_verificacion, u.usuarioscol, u.estado, r.nombre AS rol
     FROM usuarios u
     JOIN roles r ON u.roles_id = r.id`
  );
  return rows;
};

// Obtener un usuario por ID
Usuario.findById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT u.id, u.nombres, u.apellido, u.cedula, u.email, u.verificado, u.fecha_nacimiento, 
            u.fecha_registro, u.fecha_verificacion, u.usuarioscol, u.estado, r.nombre AS rol
     FROM usuarios u
     JOIN roles r ON u.roles_id = r.id
     WHERE u.id = ?`,
    [id]
  );
  
  return rows[0];
};

// Obtener un usuario por email (login)
Usuario.findByEmail = async (email) => {
  const [rows] = await pool.execute(
    `SELECT * FROM usuarios WHERE email = ?`,
    [email]
  );
  
  return rows[0];
};

// Actualizar un usuario
Usuario.update = async (id, usuarioData) => {
  const fields = [];
  const values = [];
  
  for (let key in usuarioData) {
    if (key === 'contraseña') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(usuarioData[key], salt);
      fields.push(`contraseña = ?`);
      values.push(hashedPassword);
    } else {
      fields.push(`${key} = ?`);
      values.push(usuarioData[key]);
    }
  }
  
  values.push(id);
  
  const [result] = await pool.execute(
    `UPDATE usuarios SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
  
  return result.affectedRows;
};

// Eliminar un usuario
Usuario.delete = async (id) => {
  const [result] = await pool.execute(
    `DELETE FROM usuarios WHERE id = ?`,
    [id]
  );
  
  return result.affectedRows;
};

// Verificar contraseña (login)
Usuario.verifyPassword = async (inputPassword, storedPassword) => {
  return await bcrypt.compare(inputPassword, storedPassword);
};

module.exports = Usuario;
