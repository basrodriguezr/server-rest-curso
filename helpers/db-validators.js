const {Role,Usuario,Producto,Categoria} = require('../models');

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

const existeUsuarioPorID = async(id) => {
    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error('El Usuario no existe.');  
    }
}

const existeCategoria = async(nombre = '') => {
    const existeCategoria = await Categoria.findOne({nombre});

    if(existeCategoria){
        throw new Error('La categoria ya existe, favor de intentar con otro.');  
    }
}

const existeCategoriaPorID = async(id) => {
    const existeCategoria = await Categoria.findById(id);

    if(!existeCategoria){
        throw new Error('La categoria no existe.');  
    }
}

const existeProducto = async(nombre = '') => {
    const existeProducto = await Producto.findOne({nombre});

    if(existeProducto){
        throw new Error('El producto ya existe, favor de intentar con otro.');  
    }
}

const existeProductoPorID = async(id) => {
    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error('El producto no existe.');  
    }
}

const coleccionesPermitidas=(coleccion='',colecciones=[]) => {
    if(!colecciones.includes(coleccion)){
        throw new Error('La colección no es valida.');
    }

    return true;
}
    
module.exports = {
    esRoleValido,
    existeCorreo,
    existeUsuario,
    existeUsuarioPorID,
    existeCategoria,
    existeCategoriaPorID,
    existeProducto,
    existeProductoPorID,
    coleccionesPermitidas
}