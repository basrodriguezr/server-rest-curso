const { response,request } = require('express');
const { Producto, Categoria } = require('../models');

//obtenemos todas las categorias - publico
const productosGet = async(req=request, res=response) =>{
    // res.status(200).json({
    const {limite = 5,desde = 0} = req.query; 

    const [productos,total] = await Promise.all([
        Producto.find({estado:true})
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite)), 
        Producto.countDocuments({estado:true})
    ]);

    res.json({
        total,
        productos
    });
};
//obtener una categoria por id - publico
const productosGetByID = async(req=request, res=response) =>{
    const {id} = req.params; 

    const producto = await Producto.findById(id);

    res.json({
        producto
    });
};
//crear categoria - privado - cualquier usuario con token valido
const productosPost = async(req, res=response) =>{  
    const { nombre, valor, idCategoria } = req.body;

    const categoria = await Categoria.findById(idCategoria);

    const data = {
        nombre,
        valor,
        categoria,
        usuario: req.usuario._id
    }  

    //guardar
    const producto = new Producto(data);
    await producto.save().then(() => console.log('meow'));

    res.status(201).json({
        msg:`Producto ${nombre} creado`,
        data
    });
};
//actualizar categoria - privado - cualquier usuario con token valido
const productosPut = async (req, res=response) => {
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const producto = await Producto.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put: Producto actualizado.',
        producto
    });
};

//borrar categoria - admin
const productosDelete = async(req, res=response) =>{
    const {id} = req.params;

    //borrar dato fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    //se cambia el estado a falso para no eliminiar
    const producto = await Producto.findByIdAndUpdate(id, {estado:false});
    

    res.json({
        msg: `Producto removido.`
    });
};

module.exports = {
    productosGet,
    productosGetByID,
    productosPut,
    productosPost,
    productosDelete
}