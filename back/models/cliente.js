var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = new Schema({
    nombres: String,
    ine: String,
    correo: String,
    telefono: Number

});

module.exports = mongoose.model('cliente', ClienteSchema);