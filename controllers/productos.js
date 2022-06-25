const { response,request } = require('express');
const { Producto, Categoria } = require('../models');

//obtenemos todas las categorias - publico
const productosGet = async(req=request, res=response) =>{
    // res.status(200).json({
    const {limite = 5,desde = 0} = req.query; 

    const [productos,total] = await Promise.all([
        Producto.find({estado:true})
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
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

    const producto = await Producto.findById(id)                            
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json({
        producto
    });
};
//crear categoria - privado - cualquier usuario con token valido
const productosPost = async(req, res=response) =>{  
    const { estado, usuario, ...body } = req.body;

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }  

    //guardar
    const producto = new Producto(data);
    await producto.save().then(() => console.log('meow'));

    res.status(201).json({
        msg:`Producto ${data.nombre} creado`,
        data
    });
};
//actualizar producto - privado - cualquier usuario con token valido
const productosPut = async (req, res=response) => {
    const {id} = req.params;
    const { estado, usuario, ...body } = req.body;

    const producto = await Producto.findByIdAndUpdate(id, body,{new:true});

    res.json({
        msg: 'Put: Producto actualizado.',
        producto
    });
};

//borrar producto - admin
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