const pool = require('../config/db');

const Rol = {};

Rol.create = async (rolData) => {
  const { nombre, descripcion } = rolData;

  const [result] = await pool.execute(
    `INSERT INTO roles (nombre, descripcion) VALUES (?, ?)`,
    [nombre, descripcion]
  );

  return result.insertId;
};

Rol.findAll = async () => {
  const [rows] = await pool.execute(`SELECT * FROM roles`);
  return rows;
};

Rol.findById = async (id) => {
  const [rows] = await pool.execute(`SELECT * FROM roles WHERE id = ?`, [id]);
  return rows[0] || null;
};

Rol.update = async (id, rolData) => {
  const { nombre, descripcion } = rolData;

  const [result] = await pool.execute(
    `UPDATE roles SET nombre = ?, descripcion = ? WHERE id = ?`,
    [nombre, descripcion, id]
  );

  return result.affectedRows;
};

Rol.delete = async (id) => {
  const [result] = await pool.execute(`DELETE FROM roles WHERE id = ?`, [id]);
  return result.affectedRows;
};

Rol.findNombreById = async (id) => {
  const [rows] = await pool.execute(`SELECT nombre FROM roles WHERE id = ?`, [id]);
  return rows[0] ? rows[0].nombre : null;
};

module.exports = Rol;
