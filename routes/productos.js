const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos,
        validarJWT, 
        tieneRol,
        esAdminRole} = require('../middlewares');

const { esRoleValido, 
        existeCorreo, 
        existeCategoria, 
        existeCategoriaPorID, 
        existeUsuarioPorID,
        existeProducto,
        existeProductoPorID} = require("../helpers/db-validators");    

const { productosGet, productosPost, productosPut, productosDelete, productosGetByID } = require('../controllers/productos');

const router = Router();

//obtener productos
router.get('/',productosGet);

router.get('/:id',[
        check('id', 'No es un ID válido').isMongoId(),        
        check('id').custom(existeProductoPorID), 
        validarCampos
],productosGetByID);

//crear producto - privado - cualquier usuario con token valido
router.post('/', [
        validarJWT,
        check('nombre').custom(existeProducto),
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(), 
        check('valor', 'El valor es obligatorio.').not().isEmpty(), 
        check('idCategoria', 'La categoria es obligatoria.').not().isEmpty(),
        check('idCategoria', 'no es un id válido').isMongoId(),
        validarCampos
],productosPost);

//actualizar producto - privado - cualquier usuario con token valido
router.put('/:id', [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),        
        check('id').custom(existeProductoPorID), 
        validarCampos
], productosPut);

//borrar producto - admin
router.delete('/:id',[
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeProductoPorID), 
        validarCampos
], productosDelete);

module.exports = router;
