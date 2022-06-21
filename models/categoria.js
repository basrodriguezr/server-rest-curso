const {Schema, model} = require('mongoose');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    estado:{
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es necesario']
    }
});

categoriaSchema.methods.toJSON = function() {
    const { __v, _id, estado,...categoria } = this.toObject();
    categoria.uid = _id;
    return categoria;
}

module.exports = model('Categoria', categoriaSchema);