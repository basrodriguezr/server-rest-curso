const { v4: uuidv4 } = require('uuid');
const {response} = require('express');
const path = require('path');

const subirImagen = (archivo,carpeta='') => {
    return new Promise((resolve, reject) => {
        const fileName = uuidv4() + '.' + archivo.name.split('.').pop();
        const uploadPath = path.join(`uploads/${carpeta}/images`, fileName);

        archivo.mv(uploadPath, (err) => {
            if (err) {    
                reject(err);     
            }

            resolve(fileName);
        });
    });
}

module.exports = {
    subirImagen
}