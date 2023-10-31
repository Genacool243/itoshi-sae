const express = require('express');
const router = express.Router();
const tbl_autos = require('../services/tbl_autos');

/* GET tbl_autos. */
router.get('/', async function(req, res, next) {
 try {
    res.json(await tbl_autos.getAutos(req.query.page));
 } catch (err) {
    console.error(`Error al solicitar lista de autos: `, err.message);
    next(err);
 }
});

/* POST tbl_autos */
router.post('/', async function(req, res, next) {
    try {
      res.json(await tbl_autos.createAuto(req.body));
    } catch (err) {
      console.error(`Error al crear auto:`, err.message);
    }
});

/* PUT tbl_autos */
router.put('/:id_auto', async function(req, res, next) {
    try {
      res.json(await tbl_autos.updateUser(req.params.id_auto, req.body));
    } catch (err) {
      console.error(`Error al actualizar usuario: `, err.message);
      next(err);
    }
  });
  
  /* DELETE tbl_autos */
  router.delete('/:id_auto', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.deleteUser(req.params.id_auto));
    } catch (err) {
      console.error(`Error al eliminar usuario: `, err.message);
      next(err);
    }
  });
  
  module.exports = router;