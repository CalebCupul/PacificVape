var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    nombres: String,
    apellidos: String,
    email: String,
    password: String,
    role: String,

});

module.exports = mongoose.model('user', UserSchema);