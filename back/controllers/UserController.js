var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');


function registrar(req,res){
    var params = req.body;
    
    if(req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2]; 
        var user = new User();

        User.findOne({ email: params.email }, (err, user_data)=>{
            if(err){
                res.status(500).send({ error: 'Error en el servidor'});
            }else{
                // Si encuentra el correo en la base de datos
                if(user_data){
                    res.status(403).send({ message: 'El correo ya está en uso'});
                }else{
                    // Si no lo encuentra, primero hashea la contraseña y después crea el usuario
                    // en la base de datos
                    if(params.password){
                        bcrypt.hash(params.password, null, null ,function(err,hash){
                            if(hash){
                                
                                user.password = hash;
                                user.nombres = params.nombres;
                                user.apellidos = params.apellidos;
                                user.email = params.email;
                                user.role = params.role;
                                user.imagen = imagen_name;
    
                                // Guarda el usuario en la base de datos
                                user.save((err, user_save)=>{
                                    if(err){
                                        res.status(500).send({ error: 'No se ingreso el usuario'});
                                    }else{
                                        res.status(200).send({user:user_save});
                                    }
                                });
                            }
                        });
                    }else{
                        // Si no ingresa la contraseña
                        res.status(403).send({ error: 'No ingreso la contraseña'});
                    }
    
                }
            }
        });
    }else{
        var user = new User();
        var default_img = 'null-user.jpg'

        User.findOne({ email: params.email }, (err, user_data)=>{
            if(err){
                res.status(500).send({ error: 'Error en el servidor'});
            }else{
                // Si encuentra el correo en la base de datos
                if(user_data){
                    res.status(403).send({ message: 'El correo ya está en uso'});
                }else{
                    // Si no lo encuentra, primero hashea la contraseña y después crea el usuario
                    // en la base de datos
                    if(params.password){
                        bcrypt.hash(params.password, null, null ,function(err,hash){
                            if(hash){
                                user.password = hash;
                                user.nombres = params.nombres;
                                user.apellidos = params.apellidos;
                                user.email = params.email;
                                user.role = params.role;
                                user.imagen = default_img;
    
                                // Gurada el usuario en la base de datos
                                user.save((err, user_save)=>{
                                    if(err){
                                        res.status(500).send({ error: 'No se ingreso el usuario'});
                                    }else{
                                        res.status(200).send({user:user_save});
                                    }
                                });
                            }
                        });
                    }else{
                        // Si no ingresa la contraseña
                        res.status(403).send({ error: 'No ingreso la contraseña'});
                    }
    
                }
            }
        });
    }

    // Busca en la base de datos el email
    

        
    

    
}

function login(req,res){
    var data = req.body;

    // Busca el email en la base de datos
    User.findOne({ email: data.email},( err, user_data)=>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            // Si lo encuentra, compara el Hash con la contraseña ingresada
            if(user_data){
                bcrypt.compare(data.password, user_data.password, function(err, check){
                    if(check){
                        // Login válido
                        if(data.getToken){
                            res.status(200).send({ 
                                jwt: jwt.createToken(user_data),
                                user: user_data
                                });
                        }else{
                            res.status(200).send({
                                user: user_data,
                                message: 'No token',
                                jwt: jwt.createToken(user_data),
                            });
                        }
                    }else{
                        // Login inválido
                        res.status(403).send({ message: 'Credenciales incorrectas' });
                    }
                })
            }else{
                // Si no lo encuentra, el correo no existe
                res.status(403).send({ message: 'Credenciales incorrectas' });
            }
        }
    });
    
}

module.exports = {
    registrar,
    login
}