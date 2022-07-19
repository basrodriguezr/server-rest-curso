const { response } = require('express');

const existeArchivo = async (req, res=response, next) =>{
    console.log(req.body);
    if(!req.files){
        console.log(req.files)
        return res.status(400).json({msg: 'No hay archivos para subir.'});
    }
    
    next();
}

module.exports={
    existeArchivo
}