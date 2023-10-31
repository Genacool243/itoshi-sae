const express = require('express');
const router = express.Router();
const tbl_usuarios = require('../services/tbl_usuarios');

/* GET tbl_usuarios. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await tbl_usuarios.getUsers(req.query.page));
  } catch (err) {
    console.error(`Error al solicitar lista de usuarios: `, err.message);
    next(err);
  }
});

/* GET tbl_usuarios by id. */
router.get('/:id_usuario', async function(req, res, next) {
  try {
    const user = await tbl_usuarios.getUserById(req.params.id_usuario);
    res.json(user);
  } catch (err) {
    console.error(`Error al solicitar usuario: `, err.message);
    next(err);
  }
});


/* POST tbl_usuarios */
router.post('/', async function(req, res, next) {
    try {
      res.json(await tbl_usuarios.createUser(req.body));
    } catch (err) {
      console.error(`Error al crear usuario:`, err.message);
      next(err);
    }
  });

/* PUT tbl_usuarios */
router.put('/:id_usuario', async function(req, res, next) {
  try {
    res.json(await tbl_usuarios.updateUser(req.params.id_usuario, req.body));
  } catch (err) {
    console.error(`Error al actualizar usuario: `, err.message);
    next(err);
  }
});

/* DELETE tbl_usuarios */
router.delete('/:id_usuario', async function(req, res, next) {
  try {
    res.json(await tbl_usuarios.deleteUser(req.params.id_usuario));
  } catch (err) {
    console.error(`Error al eliminar usuario: `, err.message);
    next(err);
  }
});

module.exports = router;