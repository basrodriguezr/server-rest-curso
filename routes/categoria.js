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
        existeUsuarioPorID} = require("../helpers/db-validators");

const { categoriasGet, categoriasPost, categoriasPut, categoriasDelete, categoriasGetByID } = require('../controllers/categorias');
const router = Router();

//obtener categorias
router.get('/',categoriasGet);

router.get('/:id',[
        check('id', 'No es un ID válido').isMongoId(),        
        check('id').custom(existeCategoriaPorID), 
],categoriasGetByID);

//crear categoria - privado - cualquier usuario con token valido
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(), 
        check('nombre').custom(existeCategoria), 
        validarCampos
],categoriasPost);

//actualizar categoria - privado - cualquier usuario con token valido
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(), 
        check('id', 'No es un ID válido').isMongoId(),        
        check('id').custom(existeCategoriaPorID), 
        validarCampos
], categoriasPut);

//borrar categoria - admin
router.delete('/:id',[
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeCategoriaPorID), 
        validarCampos
], categoriasDelete);



module.exports = router;