const { response } = require('express');
const role = require('../models/role');

const esAdminRole = (req, res=response, next) => {
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        });
    }

    const {role,nombre} = req.usuario

    if(role !== 'ADMIN_ROLE'){
        return res.status(400).json({
            msg: `El usuario ${nombre} no tiene el rol de administrador`
        })
    }
    next();
}

const tieneRol = (...roles ) => {
    return (req, res=response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token'
            });
        }

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: 'No tiene el rol necesario'
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
};