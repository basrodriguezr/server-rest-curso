const validaCampos  = require('./validar-campos');
const validaJWT = require('./validar-jwt');
const validaRol = require('./validar-roles');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRol
}