const { response,request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const usuariosGet = (req=request, res=response) =>{
    // res.status(200).json({

    const {nombre,apikey} = req.query;

    res.json({
        msg: 'Get mundo - controllerr',
        nombre,
        apikey
    });
};

const usuariosPut = (req, res=response) => {
    const {id} = req.params;

    res.json({
        msg: 'Put mundo - controller',
        id
    });
};

const usuariosPost = async(req, res=response) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    //verificar existencia de atributos unicos
    const existeCorreo = await Usuario.findOne({correo});
    const existeUsuario = await Usuario.findOne({nombre});

    if(existeUsuario){
        return res.status(400).json({
            msg: "El Usuario ya existe, favor de intentar con otro"
        });
    }

    if(existeCorreo){
        return res.status(400).json({
            msg: "El correo ya existe, favor de intentar con otro"
        });
    }
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