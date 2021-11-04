var express = require('express');
var productoController = require('../controllers/ProductoController');

// Modulo necesario para mandar imagenes desde el formulario
var multipart = require('connect-multiparty');
var path = multipart({ uploadDir: './uploads/productos' });

var api = express.Router();

api.post('/producto/registrar', path, productoController.registrar);
api.get('/productos/:titulo?', productoController.filtrar);
api.put('/producto/editar/:id/:img', path, productoController.editar);
api.get('/producto/registro/:id', productoController.obtener_producto);
api.delete('/producto/:id', productoController.eliminar);
api.put('/producto/stock/:id', productoController.actualizar_stock);
api.get('/producto/img/:img', productoController.obtener_imagen);



module.exports = api;
