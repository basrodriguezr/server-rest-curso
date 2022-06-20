const {response, json} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const{ generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req,res = response)=>{
    const {correo, password} = req.body;

    try {
        const usuario = await Usuario.findOne({correo})
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

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Error: ' + error        
        });        
    }
}

const googleSignIn = async (req,res = response)=>{
    const { id_token } = req.body;

    try {
        const {nombre,img,correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            usuario = new Usuario({
                nombre,
                img,
                correo,
                google:true,
                password:':p',
                role:'USER_ROLE'
            });
            
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario inactivo'
            });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no es valido'
        });
    }

}

module.exports={
    login,
    googleSignIn
}