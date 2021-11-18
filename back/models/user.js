var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nombre: String,
    email: String,
    telefono: Number,
    password: String,
    role: String,
    imagen: String
});

module.exports = mongoose.model('user', UserSchema);