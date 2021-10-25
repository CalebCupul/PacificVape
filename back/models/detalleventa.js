var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DetalleVentaSchema = new Schema({
    id_producto: {type: Schema.ObjectId, ref: 'producto'},
    cantidad: Number

});

module.exports = mongoose.model('detalleventa', DetalleVentaSchema);