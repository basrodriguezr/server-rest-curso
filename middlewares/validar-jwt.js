const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req,res=response,next)=>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETPK);

        const usuario = await Usuario.findById(uid);
        
        if(!usuario){
            return res.status(400).json({
                msg: "token no válido - usuario no existe"
            });
        }

        //verificar que el usuario que está eliminando esté con estado = true
        if(!usuario.estado){
            return res.status(400).json({
                msg: "token no válido - usuario inactivo"
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
};