const pool = require('../config/db');

const TipoCrowdfunding = {};

TipoCrowdfunding.create = async (tipoData) => {
  const { nombre, descripcion } = tipoData;

  const [result] = await pool.execute(
    `INSERT INTO tipos_crowdfunding (nombre, descripcion) VALUES (?, ?)`,
    [nombre, descripcion]
  );

  return result.insertId;
};

TipoCrowdfunding.findAll = async () => {
  const [rows] = await pool.execute(`SELECT * FROM tipos_crowdfunding`);
  return rows;
};

TipoCrowdfunding.findById = async (id) => {
  const [rows] = await pool.execute(`SELECT * FROM tipos_crowdfunding WHERE id = ?`, [id]);
  return rows[0] || null;
};


TipoCrowdfunding.update = async (id, tipoData) => {
  const { nombre, descripcion } = tipoData;

  const [result] = await pool.execute(
    `UPDATE tipos_crowdfunding SET nombre = ?, descripcion = ? WHERE id = ?`,
    [nombre, descripcion, id]
  );

  return result.affectedRows;
};

TipoCrowdfunding.delete = async (id) => {
  const [result] = await pool.execute(`DELETE FROM tipos_crowdfunding WHERE id = ?`, [id]);
  return result.affectedRows;
};

module.exports = TipoCrowdfunding;
