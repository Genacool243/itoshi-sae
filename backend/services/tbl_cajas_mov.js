const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getCajasMov(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM tbl_cajas_mov LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

async function createCajaMov(tbl_caja_mov) {
  const result = await db.query(
    `INSERT INTO tbl_cajas_mov 
    (tipo_mov, id_caja, fecha_mov, hora_mov) 
    VALUES 
    ('${tbl_caja_mov.tipo_mov}', ${tbl_caja_mov.id_caja}, '${tbl_caja_mov.fecha_mov}', '${tbl_caja_mov.hora_mov}')`
  );

  let message = 'Error al crear movimiento de caja.';

  if (result.affectedRows) {
    message = 'Movimiento de caja creado con éxito.';
  }

  return { message };
}

async function updateCajaMov(id_mov, tbl_caja_mov) {
  let updateFields = '';

  // Constructing the SET clause dynamically based on the fields provided
  Object.keys(tbl_caja_mov).forEach((key) => {
    if (tbl_caja_mov[key] && key !== 'id_mov') {
      updateFields += typeof tbl_caja_mov[key] === 'string' ? `${key}='${tbl_caja_mov[key]}', ` : `${key}=${tbl_caja_mov[key]}, `;
    }
  });

  // Removing the trailing comma and space
  updateFields = updateFields.replace(/,\s*$/, "");

  if (!updateFields) {
    return { message: 'No valid fields provided for update' };
  }

  const result = await db.query(
    `UPDATE tbl_cajas_mov 
    SET ${updateFields}
    WHERE id_mov=${id_mov}`
  );

  let message = 'Error al actualizar movimiento de caja';

  if (result.affectedRows) {
    message = 'Movimiento de caja actualizado correctamente';
  }

  return { message };
}

async function deleteCajaMov(id_mov) {
  const result = await db.query(
    `DELETE FROM tbl_cajas_mov WHERE id_mov=${id_mov}`
  );

  let message = 'Error al eliminar movimiento de caja';

  if (result.affectedRows) {
    message = 'Movimiento de caja eliminado correctamente';
  }

  return { message };
}

module.exports = {
  getCajasMov,
  createCajaMov,
  updateCajaMov,
  deleteCajaMov
};
