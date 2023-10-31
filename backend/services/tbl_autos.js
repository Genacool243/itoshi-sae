const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getAutos(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM tbl_autos LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function createAuto(tbl_autos) {
    let columns = '';
    let values = '';
  
    // Constructing the columns and values dynamically based on the provided fields
    Object.keys(tbl_autos).forEach((key) => {
      if (tbl_autos[key]) {
        columns += `${key}, `;
        if (typeof tbl_autos[key] === 'string') {
          values += `'${tbl_autos[key]}', `;
        } else {
          values += `${tbl_autos[key]}, `;
        }
      }
    });
  
    // Removing the trailing comma and space
    columns = columns.replace(/,\s*$/, "");
    values = values.replace(/,\s*$/, "");
  
    if (!columns || !values) {
      return { message: 'No valid columns or values provided for insertion' };
    }
  
    const result = await db.query(
      `INSERT INTO tbl_autos 
      (${columns}) 
      VALUES 
      (${values})`
    );
  
    let message = 'Error al crear auto.';
  
    if (result.affectedRows) {
      message = 'Auto creado con éxito.';
    }
  
    return { message };
  }  

  async function updateAuto(id_auto, tbl_autos) {
    let updateFields = '';
  
    // Constructing the SET clause dynamically based on the fields provided
    Object.keys(tbl_autos).forEach((key) => {
      if (tbl_autos[key] && key !== 'id_auto') {
        updateFields += typeof tbl_autos[key] === 'string' ? `${key}='${tbl_autos[key]}', ` : `${key}=${tbl_autos[key]}, `;
      }
    });
  
    // Removing the trailing comma and space
    updateFields = updateFields.replace(/,\s*$/, "");
  
    if (!updateFields) {
      return { message: 'No valid fields provided for update' };
    }
  
    const result = await db.query(
      `UPDATE tbl_autos 
      SET ${updateFields}
      WHERE id_auto=${id_auto}`
    );
  
    let message = 'Error al actualizar auto';
  
    if (result.affectedRows) {
      message = 'Auto actualizado correctamente';
    }
  
    return { message };
  }  

async function deleteAuto(id_auto) {
  const result = await db.query(
    `DELETE FROM tbl_autos WHERE id_auto=${id_auto}`
  );

  let message = 'Error al eliminar auto';

  if (result.affectedRows) {
    message = 'Auto eliminado correctamente';
  }

  return { message };
}

module.exports = {
  getAutos,
  createAuto,
  updateAuto,
  deleteAuto,
};
