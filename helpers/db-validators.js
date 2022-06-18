const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {
    const existeRole = await Role.findOne({ rol });
    
    if(!existeRole){
        throw new Error('El rol no existe');
    }   
}

const existeCorreo = async(correo = '') => {
    const existeCorreo = await Usuario.findOne({correo});
    
    if(existeCorreo){
        throw new Error('El correo ya existe.');        
    }
}


const existeUsuario = async(nombre = '') => {
    const existeUsuario = await Usuario.findOne({nombre});

    if(existeUsuario){
        throw new Error('El Usuario ya existe, favor de intentar con otro.');  
    }
}

module.exports = {
    esRoleValido,
    existeCorreo,
    existeUsuario
}