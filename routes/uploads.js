const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, cargarImagen } = require('../controllers/uploads');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();

router.post('/archivo', cargarArchivo);

router.post('/imagen', cargarImagen);


module.exports = router;