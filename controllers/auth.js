const {response} = require('express');
const usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const login = async (req,res = response)=>{
    const {correo, password} = req.body;

    try {
        const usuario = await usuario.findOne({correo})
        if(!usuario){   
            return res.status(400).json({
                msg: 'Correo no existe'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario inactivo'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }
        
        res.json({
            msg: 'Login ok'
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Error: ' + error        
        });        
    }
}

module.exports={
    login
}