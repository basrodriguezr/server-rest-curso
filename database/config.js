/*
    const mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/test');

    const Cat = mongoose.model('Cat', { name: String });

    const kitty = new Cat({ name: 'Zildjian' });
    kitty.save().then(() => console.log('meow'));
*/
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS);

        console.log('Conexión establecida con la DB');
    }catch(err){
        console.log(err);
        throw new Error('Error al conectar con la base de datos');
    }
        
}

module.exports={
    dbConnection
}