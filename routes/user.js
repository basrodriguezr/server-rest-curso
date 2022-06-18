//aqui se definen las rutas de los usuarios
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener como mínimo 6 caracteres.').isLength({ min: 6 }),
    check('correo', 'El correo no tiene el formato correcto.').isEmail(),
],usuariosPost);

router.delete('/', usuariosDelete);

module.exports = router;