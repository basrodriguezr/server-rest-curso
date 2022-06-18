const {Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    }
});

module.exports = model('Usuario', usuarioSchema);