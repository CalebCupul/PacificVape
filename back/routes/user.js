var express = require('express');
var userController = require('../controllers/UserController');

// Modulo necesario para mandar imagenes desde el formulario
var multipart = require('connect-multiparty');
var path = multipart({ uploadDir: './uploads/users' });

var api = express.Router();

api.post('/registrar', path, userController.registrar);
api.post('/login', userController.login);
api.get('/user/img/:img', userController.obtener_imagen);
api.get('/usuarios', userController.filtrar);
api.put('/usuarios/editar/:id/:img', path, userController.editar);
api.get('/user/:id', userController.get_user);
api.delete('/user/eliminar/:id', userController.eliminar);


module.exports = api;
