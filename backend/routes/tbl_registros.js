const express = require('express');
const router = express.Router();
const tbl_registros = require('../services/tbl_registros');

/* GET tbl_registros. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await tbl_registros.getRegistros(req.query.page));
  } catch (err) {
    console.error(`Error al solicitar lista de registros: `, err.message);
    next(err);
  }
});

/* POST tbl_registros */
router.post('/', async function(req, res, next) {
  try {
    res.json(await tbl_registros.createRegistro(req.body));
  } catch (err) {
    console.error(`Error al crear registro:`, err.message);
    next(err);
  }
});

/* PUT tbl_registros */
router.put('/:id_registro', async function(req, res, next) {
  try {
    res.json(await tbl_registros.updateRegistro(req.params.id_registro, req.body));
  } catch (err) {
    console.error(`Error al actualizar registro: `, err.message);
    next(err);
  }
});

/* DELETE tbl_registros */
router.delete('/:id_registro', async function(req, res, next) {
  try {
    res.json(await tbl_registros.deleteRegistro(req.params.id_registro));
  } catch (err) {
    console.error(`Error al eliminar registro: `, err.message);
    next(err);
  }
});

module.exports = router;
