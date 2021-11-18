var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
var path = require('path');

var fs = require('fs');


function registrar(req,res){
    var params = req.body;
    
    if(req.files){
        
        

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
                                
                                var imagen_path = req.files.imagen.path;
                                var name = imagen_path.split('\\');
                                var imagen_name = name[2]; 

                                var user = new User();

                                user.password = hash;
                                user.nombre = params.nombre;
                                user.email = params.email;
                                user.telefono = params.telefono;
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
                                user.nombre = params.nombre;
                                user.email = params.email;
                                user.telefono = params.telefono;
                                user.role = params.role;
                                user.imagen = null;
    
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

function editar(req, res){
    var id = req.params['id'];
    var data = req.body;
    var img = req.params['img'];

    if(req.files.imagen){
        // Se borra la imagen anterior
        if(img || img != null || img != undefined){
            fs.unlink('./uploads/users/' + img, (err) =>{
                if(err) throw err;
            });
        }

        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        if(data.passsword){
            // Encripta nuevamente la contraseña
            bcrypt.hash(data.password, null, null ,function(err,hash){
                if(hash){

                    User.findByIdAndUpdate(id, {
                        nombre: data.nombre,
                        password: hash,
                        email: data.email,
                        telefono: data.telefono,
                        role: data.role,
                        imagen: imagen_name
                    }, (err, user_edit)=>{
                        if(user_edit){
                            res.status(200).send({user: user_edit});
                        }else{
                            res.status(500).send({message: 'El usuario no se pudo editar'});
                        }
                    })
                }
            });
        }else{
            User.findByIdAndUpdate(id, {
                nombre: data.nombre,
                email: data.email,
                telefono: data.telefono,
                role: data.role,
                imagen: imagen_name
            }, (err, user_edit)=>{
                if(user_edit){
                    res.status(200).send({user: user_edit});
                }else{
                    res.status(500).send({message: 'El usuario no se pudo editar'});
                }
            })
        }
    }
}

function filtrar(req, res){
    User.find((err, users_data)=>{
        if (users_data){
            res.status(200).send({usuarios: users_data});
        }
    })
}

function obtener_imagen(req, res){
    var img = req.params['img'];

    if( img != "null" ){
        let path_img = './uploads/users/' + img;
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/users/null-user.jpg';
        res.status(200).sendFile(path.resolve(path_img));

    }
}

function get_user(req, res){
    var id = req.params['id'];

    User.findById(id,(err, user_data)=>{
        if(user_data){
            res.status(200).send({user: user_data});
        }else{
            res.tatus(403).send({message: 'No se encontró el usuario'});
        }
    })
}

function eliminar(req, res){
    var id = req.params['id'];

    User.findByIdAndRemove({ _id: id }, (err, user_eliminado) =>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(user_eliminado){
                fs.unlink('./uploads/users/' + user_eliminado.imagen, (err) =>{
                    if(err) throw err;
                });
                res.status(200).send({ user: user_eliminado });
            }else{
                res.status(403).send({ message: 'El usuario no se pudo eliminar'});

            }
        }
    })

}

module.exports = {
    registrar,
    login,
    obtener_imagen,
    filtrar,
    editar,
    get_user,
    eliminar
}