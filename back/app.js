var express = require('express');
const { dbConnection } = require('./db/config');
var port = process.env.PORT || 4201;

var app = express();

// Routes
var user_routes = require('./routes/user');
var categoria_routes = require('./routes/categoria');
var producto_routes = require('./routes/producto');

// Conexion a Bd
dbConnection();

// Lectura y parseo del Body
app.use( express.json() );
app.listen(port, function(){
    console.log("Servidor conectado en " + port);
});

app.use('/api', user_routes);
app.use('/api', categoria_routes);
app.use('/api', producto_routes);

module.exports = app;


