const express = require('express');
const router = express.Router();
const tbl_cajas = require('../services/tbl_cajas');

/* GET tbl_cajas. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await tbl_cajas.getCajas(req.query.page));
  } catch (err) {
    console.error(`Error al solicitar lista de cajas: `, err.message);
    next(err);
  }
});

/* POST tbl_cajas */
router.post('/', async function(req, res, next) {
  try {
    res.json(await tbl_cajas.createCaja(req.body));
  } catch (err) {
    console.error(`Error al crear caja:`, err.message);
    next(err);
  }
});

/* PUT tbl_cajas */
router.put('/:id_caja', async function(req, res, next) {
  try {
    res.json(await tbl_cajas.updateCaja(req.params.id_caja, req.body));
  } catch (err) {
    console.error(`Error al actualizar caja: `, err.message);
    next(err);
  }
});

/* DELETE tbl_cajas */
router.delete('/:id_caja', async function(req, res, next) {
  try {
    res.json(await tbl_cajas.deleteCaja(req.params.id_caja));
  } catch (err) {
    console.error(`Error al eliminar caja: `, err.message);
    next(err);
  }
});

module.exports = router;
