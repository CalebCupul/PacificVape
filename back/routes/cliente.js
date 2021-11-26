var express = require('express');
var clienteController = require('../controllers/ClienteController');

var api = express.Router();

api.post('/cliente/registrar', clienteController.registrar);
api.put('/cliente/editar/:id', clienteController.editar);
api.delete('/cliente/eliminar/:id' , clienteController.eliminar);
api.get('/cliente/:nombres?', clienteController.filtrar);
api.get('/cliente/registro/:id', clienteController.get_cliente);




module.exports = api;
