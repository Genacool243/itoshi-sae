const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getCajas(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM tbl_cajas LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

async function createCaja(tbl_caja) {
  const result = await db.query(
    `INSERT INTO tbl_cajas 
    (fecha_caja, ingreso_hora_ef, ingreso_hora_dig, ingreso_estadia_ef, ingreso_estadia_dig, retiros, gastos) 
    VALUES 
    ('${tbl_caja.fecha_caja}', ${tbl_caja.ingreso_hora_ef}, ${tbl_caja.ingreso_hora_dig}, ${tbl_caja.ingreso_estadia_ef}, ${tbl_caja.ingreso_estadia_dig}, ${tbl_caja.retiros}, ${tbl_caja.gastos})`
  );

  let message = 'Error al crear caja.';

  if (result.affectedRows) {
    message = 'Caja creada con éxito.';
  }

  return { message };
}

async function updateCaja(id_caja, tbl_caja) {
  let updateFields = '';

  // Constructing the SET clause dynamically based on the fields provided
  Object.keys(tbl_caja).forEach((key) => {
    if (tbl_caja[key] && key !== 'id_caja') {
      updateFields += typeof tbl_caja[key] === 'string' ? `${key}='${tbl_caja[key]}', ` : `${key}=${tbl_caja[key]}, `;
    }
  });

  // Removing the trailing comma and space
  updateFields = updateFields.replace(/,\s*$/, "");

  if (!updateFields) {
    return { message: 'No valid fields provided for update' };
  }

  const result = await db.query(
    `UPDATE tbl_cajas 
    SET ${updateFields}
    WHERE id_caja=${id_caja}`
  );

  let message = 'Error al actualizar caja';

  if (result.affectedRows) {
    message = 'Caja actualizada correctamente';
  }

  return { message };
}

async function deleteCaja(id_caja) {
  const result = await db.query(
    `DELETE FROM tbl_cajas WHERE id_caja=${id_caja}`
  );

  let message = 'Error al eliminar caja';

  if (result.affectedRows) {
    message = 'Caja eliminada correctamente';
  }

  return { message };
}

module.exports = {
  getCajas,
  createCaja,
  updateCaja,
  deleteCaja
};
