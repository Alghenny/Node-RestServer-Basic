const express = require('express');
const cors = require('cors');


class Server{
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users'

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        // Read and Parse body
        this.app.use( express.json() );

        //public directory
        this.app.use(express.static('public'));

    }

    routes() {
        
        this.app.use(this.usersPath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log( 'Server started on Port:', this.port );
        })
    }

}

module.exports = Server;