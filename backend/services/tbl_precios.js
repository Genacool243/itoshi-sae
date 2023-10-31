const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getPrecios(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM tbl_precios LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  };
}

async function createPrecio(tbl_precio) {
  const result = await db.query(
    `INSERT INTO tbl_precios 
    (nombre_precio, valor_precio, tipo_precio) 
    VALUES 
    ('${tbl_precio.nombre_precio}', ${tbl_precio.valor_precio}, '${tbl_precio.tipo_precio}')`
  );

  let message = 'Error al crear precio.';

  if (result.affectedRows) {
    message = 'Precio creado con éxito.';
  }

  return { message };
}

async function updatePrecio(id_precio, tbl_precio) {
  let updateFields = '';

  // Constructing the SET clause dynamically based on the fields provided
  Object.keys(tbl_precio).forEach((key) => {
    if (tbl_precio[key] && key !== 'id_precio') {
      updateFields += typeof tbl_precio[key] === 'string' ? `${key}='${tbl_precio[key]}', ` : `${key}=${tbl_precio[key]}, `;
    }
  });

  // Removing the trailing comma and space
  updateFields = updateFields.replace(/,\s*$/, "");

  if (!updateFields) {
    return { message: 'No valid fields provided for update' };
  }

  const result = await db.query(
    `UPDATE tbl_precios 
    SET ${updateFields}
    WHERE id_precio=${id_precio}`
  );

  let message = 'Error al actualizar precio';

  if (result.affectedRows) {
    message = 'Precio actualizado correctamente';
  }

  return { message };
}

async function deletePrecio(id_precio) {
  const result = await db.query(
    `DELETE FROM tbl_precios WHERE id_precio=${id_precio}`
  );

  let message = 'Error al eliminar precio';

  if (result.affectedRows) {
    message = 'Precio eliminado correctamente';
  }

  return { message };
}

module.exports = {
  getPrecios,
  createPrecio,
  updatePrecio,
  deletePrecio
};
