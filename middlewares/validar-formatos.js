const { response } = require('express');

const validarFormato = async (req, res=response, next) =>{
    const archivo = req.files.archivo;

    if (!req.files || Object.keys(req.files).length === 0 || !archivo) {
        return res.status(400).json({msg: 'No hay archivos para subir.'});
    }  

    if(!archivo.mimetype.includes('image')){
        return res.status(400).json({msg: 'El archivo debe tener formato de imagen.'});
    }
    
    const extension = archivo.name.split('.').pop();
    
    if(!['jpg', 'jpeg', 'png', 'gif'].includes(extension)){
        return res.status(400).json({msg:  `El formato de la imagen debe ser en jpg, jpeg, png o gif.`});
    }     
    
    next();
}

const validarCarpeta = async (req, res=response, next) =>{    
    const carpeta = req.body.carpeta;
    const carpetasPermitidas = ['producto', 'usuario'];
    
    if(!carpetasPermitidas.includes(carpeta)){
        return res.status(400).json({msg: `La carpeta ${carpeta} no está en el listado ${carpetasPermitidas}.`});
    }

    next();
}
module.exports = {
    validarFormato,
    validarCarpeta
}