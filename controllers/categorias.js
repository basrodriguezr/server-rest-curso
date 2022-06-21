const { response,request } = require('express');
const { Categoria } = require('../models');

//obtenemos todas las categorias - publico
const categoriasGet = async(req=request, res=response) =>{
    // res.status(200).json({
    const {limite = 5,desde = 0} = req.query; 

    const [categorias,total] = await Promise.all([
        Categoria.find({estado:true})
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite)), 
        Categoria.countDocuments({estado:true})
    ]);

    res.json({
        total,
        categorias
    });
};
//obtener una categoria por id - publico
const categoriasGetByID = async(req=request, res=response) =>{
    const {id} = req.params; 

    const categoria = await Categoria.findById(id);

    res.json({
        categoria
    });
};
//crear categoria - privado - cualquier usuario con token valido
const categoriasPost = async(req, res=response) =>{  
    const {nombre} = req.body;

    const data ={
        nombre,
        usuario: req.usuario._id
    }   

    // //guardar
    const categoria = new Categoria(data);
    await categoria.save().then(() => console.log('meow'));

    res.status(201).json({
        msg:`categoria ${nombre} creada`,
        data
    });
};
//actualizar categoria - privado - cualquier usuario con token valido
const categoriasPut = async (req, res=response) => {
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    const categoria = await Categoria.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put: categoria actualizada',
        categoria
    });
};

//borrar categoria - admin
const categoriasDelete = async(req, res=response) =>{
    const {id} = req.params;

    //borrar dato fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    //se cambia el estado a falso para no eliminiar
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});
    

    res.json({
        msg: `Categoria removida.`
    });
};

module.exports = {
    categoriasGet,
    categoriasGetByID,
    categoriasPut,
    categoriasPost,
    categoriasDelete
}