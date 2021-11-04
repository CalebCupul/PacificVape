var express = require('express');
var userController = require('../controllers/UserController');

// Modulo necesario para mandar imagenes desde el formulario
var multipart = require('connect-multiparty');
var path = multipart({ uploadDir: './uploads/users' });

var api = express.Router();

api.post('/registrar', path, userController.registrar);
api.post('/login', userController.login);
api.get('/user/img/:img', userController.obtener_imagen);


module.exports = api;
