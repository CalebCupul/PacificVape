var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
    titulo: String,
    descripcion: String,
    imagen: String,
    precio_compra: Number,
    precio_venta: Number,
    stock: Number,
    id_categoria: {type: Schema.ObjectId, ref: 'categoria'},

});

module.exports = mongoose.model('producto', ProductoSchema);