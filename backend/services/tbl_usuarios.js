const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getUsers(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id_usuario, dni, nombre, apellido, tipo_usuario 
    FROM tbl_usuarios LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  };
}

async function getUserById(id_usuario) {
  const rows = await db.query(
    `SELECT id_usuario, dni, nombre, apellido, password 
    FROM tbl_usuarios 
    WHERE id_usuario=${id_usuario}`
  );

  const data = helper.emptyOrRows(rows);
  return data;
}


async function createUser(tbl_usuarios) {
  let columns = '';
  let values = '';

  // Constructing the columns and values dynamically based on the provided fields
  Object.keys(tbl_usuarios).forEach((key) => {
    if (tbl_usuarios[key]) {
      columns += `${key}, `;
      values += typeof tbl_usuarios[key] === 'string' ? `'${tbl_usuarios[key]}', ` : `${tbl_usuarios[key]}, `;
    }
  });

  // Removing the trailing comma and space
  columns = columns.replace(/,\s*$/, "");
  values = values.replace(/,\s*$/, "");

  if (!columns || !values) {
    return { message: 'No valid columns or values provided for insertion' };
  }

  const result = await db.query(
    `INSERT INTO tbl_usuarios 
    (${columns}) 
    VALUES 
    (${values})`
  );

  let message = 'Error al crear usuario.';

  if (result.affectedRows) {
    message = 'Usuario creado con éxito.';
  }

  return { message };
}

async function updateUser(id_usuario, tbl_usuarios) {
  let updateFields = '';

  // Constructing the SET clause dynamically based on the fields provided
  Object.keys(tbl_usuarios).forEach((key) => {
    if (tbl_usuarios[key] && key !== 'id_usuario') {
      updateFields += typeof tbl_usuarios[key] === 'string' ? `${key}='${tbl_usuarios[key]}', ` : `${key}=${tbl_usuarios[key]}, `;
    }
  });

  // Removing the trailing comma and space
  updateFields = updateFields.replace(/,\s*$/, "");

  if (!updateFields) {
    return { message: 'No valid fields provided for update' };
  }

  const result = await db.query(
    `UPDATE tbl_usuarios 
    SET ${updateFields}
    WHERE id_usuario=${id_usuario}`
  );

  let message = 'Error al actualizar usuario';

  if (result.affectedRows) {
    message = 'Usuario actualizado correctamente';
  }

  return { message };
}

async function deleteUser(id_usuario){
  const result = await db.query(
    `DELETE FROM tbl_usuarios WHERE id_usuario=${id_usuario}`
  );

  let message = 'Error al eliminar usuario';

  if (result.affectedRows) {
    message = 'Usuario eliminado correctamente';
  }

  return {message};
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
