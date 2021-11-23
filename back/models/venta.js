var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = new Schema({
    id_cliente: {type: Schema.ObjectId, ref: 'cliente'},
    id_user: {type: Schema.ObjectId, ref: 'user'},
    fecha: {type: Date, default: Date.now},
    total: Number

});

module.exports = mongoose.model('venta', VentaSchema);