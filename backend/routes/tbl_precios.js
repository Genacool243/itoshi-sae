const express = require('express');
const router = express.Router();
const tbl_precios = require('../services/tbl_precios');

/* GET tbl_precios. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await tbl_precios.getPrecios(req.query.page));
  } catch (err) {
    console.error(`Error al solicitar lista de precios: `, err.message);
    next(err);
  }
});

/* POST tbl_precios */
router.post('/', async function(req, res, next) {
  try {
    res.json(await tbl_precios.createPrecio(req.body));
  } catch (err) {
    console.error(`Error al crear precio:`, err.message);
    next(err);
  }
});

/* PUT tbl_precios */
router.put('/:id_precio', async function(req, res, next) {
  try {
    res.json(await tbl_precios.updatePrecio(req.params.id_precio, req.body));
  } catch (err) {
    console.error(`Error al actualizar precio: `, err.message);
    next(err);
  }
});

/* DELETE tbl_precios */
router.delete('/:id_precio', async function(req, res, next) {
  try {
    res.json(await tbl_precios.deletePrecio(req.params.id_precio));
  } catch (err) {
    console.error(`Error al eliminar precio: `, err.message);
    next(err);
  }
});

module.exports = router;
