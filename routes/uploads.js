const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, cargarImagen, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { validarJWT, validarFormato, validarCampos, existeArchivo } = require('../middlewares');
const {coleccionesPermitidas} = require('../helpers');
const router = Router();

router.post('/archivo', cargarArchivo);

router.put("/:coleccion/:id",[
    validarJWT,
    existeArchivo,
    check('id','El id no es id Mongo').isMongoId(),
    check('coleccion','La colección no es valida').custom(c => coleccionesPermitidas(c ,['producto', 'usuario'])),
    validarCampos,
],actualizarImagen);

router.post('/imagen',[
    validarJWT,
    validarFormato,
    validarCampos
], cargarImagen);

router.get("/:coleccion/:id",[
    validarJWT,
    check('id','El id no es id Mongo').isMongoId(),
    check('coleccion','La colección no es valida').custom(c => coleccionesPermitidas(c ,['producto', 'usuario'])),
    validarCampos
],mostrarImagen);

module.exports = router;