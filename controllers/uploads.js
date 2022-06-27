const path = require('path');
const {response} = require('express');

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
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json({msg: 'No hay archivos para subir.'});
        return;
    }

    if(req.files.archivo.mimetype.includes('image')){    
        const { archivo } = req.files;
        
        const uploadPath = path.join('uploads/images', archivo.name);
        
        archivo.mv(uploadPath, (err) => {
            if (err) {
                res.status(500).json({err});
                return;
            }
            
            res.json({msg: 'El archivo ha sido subido a ' + uploadPath});
        });
    } else{
        res.status(400).json({msg: 'El archivo debe tener formato de imagen.'});
    }  
}

module.exports = { 
    cargarArchivo,
    cargarImagen
};