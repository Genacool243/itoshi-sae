const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getRegistros(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM tbl_registros LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

async function createRegistro(tbl_registro) {
  const result = await db.query(
    `INSERT INTO tbl_registros 
    (hora_registro, id_usuario, texto_registro) 
    VALUES 
    ('${tbl_registro.hora_registro}', ${tbl_registro.id_usuario}, '${tbl_registro.texto_registro}')`
  );

  let message = 'Error al crear registro.';

  if (result.affectedRows) {
    message = 'Registro creado con éxito.';
  }

  return { message };
}

async function updateRegistro(id_registro, tbl_registro) {
  let updateFields = '';

  // Constructing the SET clause dynamically based on the fields provided
  Object.keys(tbl_registro).forEach((key) => {
    if (tbl_registro[key] && key !== 'id_registro') {
      updateFields += typeof tbl_registro[key] === 'string' ? `${key}='${tbl_registro[key]}', ` : `${key}=${tbl_registro[key]}, `;
    }
  });

  // Removing the trailing comma and space
  updateFields = updateFields.replace(/,\s*$/, "");

  if (!updateFields) {
    return { message: 'No valid fields provided for update' };
  }

  const result = await db.query(
    `UPDATE tbl_registros 
    SET ${updateFields}
    WHERE id_registro=${id_registro}`
  );

  let message = 'Error al actualizar registro';

  if (result.affectedRows) {
    message = 'Registro actualizado correctamente';
  }

  return { message };
}

async function deleteRegistro(id_registro) {
  const result = await db.query(
    `DELETE FROM tbl_registros WHERE id_registro=${id_registro}`
  );

  let message = 'Error al eliminar registro';

  if (result.affectedRows) {
    message = 'Registro eliminado correctamente';
  }

  return { message };
}

module.exports = {
  getRegistros,
  createRegistro,
  updateRegistro,
  deleteRegistro
};
