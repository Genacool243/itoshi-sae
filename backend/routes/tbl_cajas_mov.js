const express = require('express');
const router = express.Router();
const tbl_cajas_mov = require('../services/tbl_cajas_mov');

/* GET tbl_cajas_mov. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await tbl_cajas_mov.getCajasMov(req.query.page));
  } catch (err) {
    console.error(`Error al solicitar lista de movimientos de cajas: `, err.message);
    next(err);
  }
});

/* POST tbl_cajas_mov */
router.post('/', async function(req, res, next) {
  try {
    res.json(await tbl_cajas_mov.createCajaMov(req.body));
  } catch (err) {
    console.error(`Error al crear movimiento de caja:`, err.message);
    next(err);
  }
});

/* PUT tbl_cajas_mov */
router.put('/:id_mov', async function(req, res, next) {
  try {
    res.json(await tbl_cajas_mov.updateCajaMov(req.params.id_mov, req.body));
  } catch (err) {
    console.error(`Error al actualizar movimiento de caja: `, err.message);
    next(err);
  }
});

/* DELETE tbl_cajas_mov */
router.delete('/:id_mov', async function(req, res, next) {
  try {
    res.json(await tbl_cajas_mov.deleteCajaMov(req.params.id_mov));
  } catch (err) {
    console.error(`Error al eliminar movimiento de caja: `, err.message);
    next(err);
  }
});

module.exports = router;
