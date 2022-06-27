const { response } = require("express");
const {ObjectId} = require('mongoose').Types;
const {Usuario, Categoria, Producto} = require('../models');

const coleccionesPermitidas=[
    'usuarios',
    'categorias',
    'productos',
    'buscarProductoPorCategoria',
    'roles'
];

const buscarUsuario = async(termino,res=response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino,'i');

    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    });

    res.json({
        results: usuarios
    });
}

const buscarCategoria = async(termino,res=response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp(termino,'i');

    const categorias = await Categoria.find({
        $or:[{nombre:regex}],
        $and:[{estado:true}]
    });

    res.json({
        results: categorias
    });
}

const buscarProducto = async(termino,res=response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const producto = await Producto.findById(termino)
                                        .populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(termino,'i');

    const productos = await Producto.find({$or:[{nombre:regex}],$and:[{estado:true}]})
                                    .populate('categoria','nombre');

    res.json({
        results: productos
    });
}

const buscarProductoPorCategoria = async(req ,res=response) => {
    const esMongoId = ObjectId.isValid(req);

    if(esMongoId){
        const categoria = await Categoria.findById(req);
        const productos = await Producto.find({categoria});
        return res.json({
            results: productos
        });
    }

    
    const categoria = await Categoria.findOne({nombre:req});

    console.log(categoria);

    const productos = await Producto.find({$or:[{categoria}],$and:[{estado:true}]});

    res.json({
        results: productos
    });
}

const buscar = (req,res=response) => {
    const {coleccion,busqueda} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionesPermitidas}`
        });
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuario(busqueda,res);
        break;
            
        case 'categorias':
            buscarCategoria(busqueda,res);
        break;

        case 'productos':
            buscarProducto(busqueda,res);
        break;

        case 'buscarProductoPorCategoria':
            buscarProductoPorCategoria(busqueda,res);
        break;
        default:
            return res.status(500).json({
                msg:`Para el Developer: Hay que agregar el case para la colección ${coleccion}`
            });
    }
}

module.exports = {
    buscar
};