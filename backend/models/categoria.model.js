const pool = require('../config/db');

const Categoria = {};

Categoria.create = async (categoriaData) => {
    const { nombre, descripcion } = categoriaData;

    const [result] = await pool.execute(
        `INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)`,
        [nombre, descripcion]
    );

    return result.insertId;
};

Categoria.findAll = async () => {
    const [rows] = await pool.execute(`SELECT * FROM categorias`);
    return rows;
};

Categoria.findById = async (id) => {
    const [rows] = await pool.execute(`SELECT * FROM categorias WHERE id = ?`, [id]);
    return rows[0] || null;
};

Categoria.update = async (id, categoriaData) => {
    const { nombre, descripcion } = categoriaData;

    const [result] = await pool.execute(
        `UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?`,
        [nombre, descripcion, id]
    );

    return result.affectedRows;
};

Categoria.delete = async (id) => {
    const [result] = await pool.execute(`DELETE FROM categorias WHERE id = ?`, [id]);
    return result.affectedRows;
};

module.exports = Categoria;
