//aqui se definen las rutas de los usuarios
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const { esRoleValido, existeCorreo, existeUsuario, existeUsuarioPorID } = require("../helpers/db-validators");
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('role').custom(esRoleValido),
    check('password', 'La contraseña debe tener como mínimo 6 caracteres.').isLength({ min: 6 }),
    validarCampos
], usuariosPut);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('nombre', 'El nombre ya existe.').custom(existeUsuario),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    check('password', 'La contraseña debe tener como mínimo 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'El correo no tiene el formato correcto.').isEmail(),
    check('correo').custom(existeCorreo),
    check('role').custom(esRoleValido),
    validarCampos
],usuariosPost);

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorID), 
    validarCampos
], usuariosDelete);

module.exports = router;