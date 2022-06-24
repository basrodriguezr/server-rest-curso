const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
            this.app = express();
            this.port = process.env.PORT;
            this.paths = {  
                usuarios: '/api/usuarios',
                auth: '/api/auth',
                categorias: '/api/categorias',
                productos: '/api/productos'
            }        

            //Conectar base de datos
            this.conectarBD();
            //middlewares
            this.middelwares();

            this.routes();
    }

    async conectarBD(){
        await dbConnection();    
    }
    
    middelwares(){
         //COORS
        this.app.use(cors());        
        //Body Parser
        this.app.use(express.json());                 
         //directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Listening at http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;