const { response,request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req=request, res=response) =>{
    // res.status(200).json({
    const {limite = 5,desde = 0} = req.query; 

    // const usuarios = await Usuario.find({estado:true})
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments({estado:true});

    //const resp = await Promise.all([
    const [usuarios,total] = await Promise.all([

        Usuario.find({estado:true})
            .skip(Number(desde))
            .limit(Number(limite)), 
        Usuario.countDocuments({estado:true})
    ]);

    res.json({
        total,
        usuarios
    });
};

const usuariosPut = async (req, res=response) => {
    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password){
        const salt =  bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'Put: usuario actualizado',
        usuario
    });
};

const usuariosPost = async(req, res=response) =>{  
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    //encriptar
    const salt =  bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //guardar
    await usuario.save().then(() => console.log('meow'));

    res.json({
        msg: 'Usuario:',
        usuario,
    });
};

const usuariosDelete = (req, res=response) =>{
    res.json({
        msg: 'Delete mundo - controller'
    });
};

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}