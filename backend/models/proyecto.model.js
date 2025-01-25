const pool = require('../config/db');

const Proyecto = {};

// Obtener todos los proyectos
Proyecto.getAllProjects = async () => {
    const [rows] = await pool.query('SELECT * FROM proyecto');
    return rows;
};

// Obtener un proyecto por su ID
Proyecto.getProjectById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM proyecto WHERE id_proyecto = ?', [id]);
    return rows[0];
};

// Crear un nuevo proyecto
Proyecto.createProject = async (data) => {
    const { nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, id_categoria, estado } = data;
    const [result] = await pool.query(
        'INSERT INTO proyecto (nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, id_categoria, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, meta_financiera, fecha_inicio, id_creador, id_tipo, id_categoria, estado || 'Pendiente']
    );
    return result.insertId;
};

// Actualizar un proyecto existente
Proyecto.updateProject = async (id, data) => {
    const { nombre, descripcion, meta_financiera, fecha_inicio, id_tipo, id_categoria, estado } = data;
    const [result] = await pool.query(
        'UPDATE proyecto SET nombre = ?, descripcion = ?, meta_financiera = ?, fecha_inicio = ?, id_tipo = ?, id_categoria = ?, estado = ? WHERE id_proyecto = ?',
        [nombre, descripcion, meta_financiera, fecha_inicio, id_tipo, id_categoria, estado, id]
    );
    return result.affectedRows > 0;
};

// Eliminar un proyecto
Proyecto.deleteProject = async (id) => {
    const [result] = await pool.query('DELETE FROM proyecto WHERE id_proyecto = ?', [id]);
    return result.affectedRows > 0;
};

module.exports = Proyecto;
