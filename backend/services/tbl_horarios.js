const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getHorarios(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM tbl_horarios LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

async function createHorario(tbl_horario) {
  const result = await db.query(
    `INSERT INTO tbl_horarios 
    (dni, tipo_horario, inicio_horario, final_horario) 
    VALUES 
    (${tbl_horario.dni}, '${tbl_horario.tipo_horario}', '${tbl_horario.inicio_horario}', '${tbl_horario.final_horario}')`
  );

  let message = 'Error al crear horario.';

  if (result.affectedRows) {
    message = 'Horario creado con éxito.';
  }

  return { message };
}

async function updateHorario(id_horario, tbl_horario) {
  let updateFields = '';

  // Constructing the SET clause dynamically based on the fields provided
  Object.keys(tbl_horario).forEach((key) => {
    if (tbl_horario[key] && key !== 'id_horario') {
      updateFields += typeof tbl_horario[key] === 'string' ? `${key}='${tbl_horario[key]}', ` : `${key}=${tbl_horario[key]}, `;
    }
  });

  // Removing the trailing comma and space
  updateFields = updateFields.replace(/,\s*$/, "");

  if (!updateFields) {
    return { message: 'No valid fields provided for update' };
  }

  const result = await db.query(
    `UPDATE tbl_horarios 
    SET ${updateFields}
    WHERE id_horario=${id_horario}`
  );

  let message = 'Error al actualizar horario';

  if (result.affectedRows) {
    message = 'Horario actualizado correctamente';
  }

  return { message };
}

async function deleteHorario(id_horario) {
  const result = await db.query(
    `DELETE FROM tbl_horarios WHERE id_horario=${id_horario}`
  );

  let message = 'Error al eliminar horario';

  if (result.affectedRows) {
    message = 'Horario eliminado correctamente';
  }

  return { message };
}

module.exports = {
  getHorarios,
  createHorario,
  updateHorario,
  deleteHorario
};
