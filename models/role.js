const {Schema, model} = require('mongoose');

const roleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es necesario']
    }
});

module.exports = model('Role', roleSchema);