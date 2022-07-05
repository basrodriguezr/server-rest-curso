const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { subirImagen } = require('../helpers');
const { Usuario, Producto } = require('../models/');

const cargarArchivo = async (req, res = response) => {  

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'No hay archivos para subir.'});
        return;
    }
    
    const { archivo } = req.files;
    
    const uploadPath = path.join('uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            res.status(500).json({err});
            return;
        }

        res.json({
            msg: 'El archivo ha sido subido a ' + uploadPath
        });
    });
}

const cargarImagen = async (req, res = response) => { 
    const archivo = req.files.archivo;
    const carpeta = req.body.carpeta;

    const filename = await subirImagen(archivo, carpeta);     

    res.json({
        filename
    });
}     

const actualizarImagen = async (req, res = response) => {
    const { id,coleccion } = req.params;

    let model;

    switch (coleccion) {
        case 'producto':
            model = await Producto.findById(id);
            if(!model){
                return  res.status(400).json({msg: 'No existe el producto'});
            }
            break;

        case 'usuario':
            model = await Usuario.findById(id);
            if(!model){
                return  res.status(400).json({msg: 'No existe el usuario'});
            }
            break;

        default:
            return res.status(400).json({msg: 'La colección no es valida'});
    }   

    //limpiar imagenes previas
    if(model.img){
        const pathImagen = path.join(__dirname ,'../uploads', coleccion, 'images' ,model.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }     

    const imagen =  await subirImagen(req.files.archivo, coleccion); 

    model.img = imagen;

    await model.save();

    return res.json(model);
}

module.exports = { 
    cargarArchivo,
    cargarImagen,
    actualizarImagen
};