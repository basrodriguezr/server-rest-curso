const {Schema, model} = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario'],
        unique: true
    },
    valor: {
        type: Number,
        required: [true, 'El valor es necesario'],
        min: [0, 'El valor no puede ser menor a 0']
    },
    estado:{
        type: Boolean,
        default: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es necesario']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es necesaria']
    }
});

productoSchema.methods.toJSON = function() {
    const { __v, _id, estado, usuario, ...producto } = this.toObject();
    producto.uid = _id;
    return producto;
}

module.exports = model('Producto', productoSchema);