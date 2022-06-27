const { Router } = require('express');
const { check } = require('express-validator');
const { buscar } = require('../controllers/buscar');

const router = Router();

router.get('/:coleccion/:busqueda', buscar);

router.get('/:coleccion/:busqueda', buscar);


module.exports = router;