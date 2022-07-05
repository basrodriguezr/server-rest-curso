const validarCampos  = require('./validar-campos');
const ValidarFormatos = require('./validar-formatos');
const ValidarJWT = require('./validar-jwt');
const ValidarRol = require('./validar-roles');
const ValidaArchivo = require('./validar-archivos');


module.exports = {
    ...validarCampos,
    ...ValidarFormatos,
    ...ValidarJWT,
    ...ValidarRol,
    ...ValidaArchivo
}