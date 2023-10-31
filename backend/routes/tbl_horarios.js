const express = require('express');
const router = express.Router();
const tbl_horarios = require('../services/tbl_horarios');

/* GET tbl_horarios. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await tbl_horarios.getHorarios(req.query.page));
  } catch (err) {
    console.error(`Error al solicitar lista de horarios: `, err.message);
    next(err);
  }
});

/* POST tbl_horarios */
router.post('/', async function(req, res, next) {
  try {
    res.json(await tbl_horarios.createHorario(req.body));
  } catch (err) {
    console.error(`Error al crear horario:`, err.message);
    next(err);
  }
});

/* PUT tbl_horarios */
router.put('/:id_horario', async function(req, res, next) {
  try {
    res.json(await tbl_horarios.updateHorario(req.params.id_horario, req.body));
  } catch (err) {
    console.error(`Error al actualizar horario: `, err.message);
    next(err);
  }
});

/* DELETE tbl_horarios */
router.delete('/:id_horario', async function(req, res, next) {
  try {
    res.json(await tbl_horarios.deleteHorario(req.params.id_horario));
  } catch (err) {
    console.error(`Error al eliminar horario: `, err.message);
    next(err);
  }
});

module.exports = router;
