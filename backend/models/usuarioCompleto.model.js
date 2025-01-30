const pool = require('../config/db');

const UsuarioCompleto = {};

// Obtener todos los detalles del usuario
UsuarioCompleto.getUserDetails = async (id) => {
    const [usuario] = await pool.query(`SELECT * FROM usuario WHERE idusuario = ?`, [id]);
    if (!usuario.length) return null;

    const [roles] = await pool.query(`SELECT id_rol FROM usuario_roles WHERE id_usuario = ?`, [id]);
    const [personal] = await pool.query(`SELECT * FROM usuario_informacion_personal WHERE id_usuario = ?`, [id]);
    const [contacto] = await pool.query(`SELECT * FROM usuario_informacion_contacto WHERE id_usuario = ?`, [id]);
    const [financiera] = await pool.query(`SELECT * FROM usuario_informacion_financiera WHERE id_usuario = ?`, [id]);
    const [verificacion] = await pool.query(`SELECT * FROM usuario_verificacion WHERE id_usuario = ?`, [id]);
    const [documentos] = await pool.query(`
        SELECT * FROM documentos_verificacion 
        WHERE id_verificacion IN (SELECT id_verificacion FROM usuario_verificacion WHERE id_usuario = ?)
    `, [id]);

    return {
        usuario: usuario[0],
        roles: roles.map(r => r.id_rol),
        informacion_personal: personal[0] || null,
        informacion_contacto: contacto[0] || null,
        informacion_financiera: financiera[0] || null,
        verificacion: verificacion[0] || null,
        documentos: documentos.length ? documentos : [],
    };
};

// Actualizar usuario completo
UsuarioCompleto.updateUserDetails = async (id, data) => {
    const { usuario, correo, id_rol, informacion_personal, informacion_contacto, informacion_financiera } = data;

    await pool.query(`UPDATE usuario SET usuario = ?, correo = ? WHERE idusuario = ?`, [usuario, correo, id]);

    await pool.query(`DELETE FROM usuario_roles WHERE id_usuario = ?`, [id]);
    await pool.query(`INSERT INTO usuario_roles (id_usuario, id_rol) VALUES (?, ?)`, [id, id_rol]);

    if (informacion_personal) {
        await pool.query(`
            INSERT INTO usuario_informacion_personal (id_usuario, nombres, apellidos, fecha_nacimiento, identificacion)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE nombres = VALUES(nombres), apellidos = VALUES(apellidos), fecha_nacimiento = VALUES(fecha_nacimiento), identificacion = VALUES(identificacion)
        `, [id, informacion_personal.nombres, informacion_personal.apellidos, informacion_personal.fecha_nacimiento, informacion_personal.identificacion]);
    }

    if (informacion_contacto) {
        await pool.query(`
            INSERT INTO usuario_informacion_contacto (id_usuario, provincia, canton, parroquia, celularPrincipal)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE provincia = VALUES(provincia), canton = VALUES(canton), parroquia = VALUES(parroquia), celularPrincipal = VALUES(celularPrincipal)
        `, [id, informacion_contacto.provincia, informacion_contacto.canton, informacion_contacto.parroquia, informacion_contacto.celularPrincipal]);
    }

    if (informacion_financiera) {
        await pool.query(`
            INSERT INTO usuario_informacion_financiera (id_usuario, ingreso_mensual, gasto_mensual_promedio, patrimonio)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE ingreso_mensual = VALUES(ingreso_mensual), gasto_mensual_promedio = VALUES(gasto_mensual_promedio), patrimonio = VALUES(patrimonio)
        `, [id, informacion_financiera.ingreso_mensual, informacion_financiera.gasto_mensual_promedio, informacion_financiera.patrimonio]);
    }

    return true;
};

module.exports = UsuarioCompleto;
