var Categoria = require('../models/categoria');

function registrar(req,res){
    var data = req.body;

    Categoria.findOne({ titulo: data.titulo }, (err, categoria_data) =>{
        if(err){
            res.status(500).send({ error: 'Error en el servidor'});
        }else{
            if(categoria_data){
                res.status(403).send({ message: 'No se ha podido registrar la categoría porque ya ha sido registrada anteriormente, verifique si la categoría ya está registrada en el sistema'});
            }else{
                var categoria = new Categoria();
                categoria.titulo = data.titulo;
                categoria.descripcion = data.descripcion;

                categoria.save( (err, categoria_save) =>{
                    if(err){
                        // Si no llegaron los datos correctamente
                        res.status(500).send({ message: 'Error en el servidor'});
                    }else{
                        // Si llegaron los datos
                        if(categoria_save){
                            // Manda los datos de la categoria
                            res.status(200).send({ categoria: categoria_save });
                        }else{
                            // Manda un mensaje de error
                            res.status(403).send({ message: 'La categoria no se pudo registrar'});
                        }
                    }
                });
            }
        }
    });
    
}

function obtener_categoria(req, res){
    var id = req.params['id'];
    
    Categoria.findById({ _id: id }, (err, categoria_data) =>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(categoria_data){
                res.status(200).send({ categoria: categoria_data });
            }else{
                res.status(403).send({ message: 'La categoría no existe'})
            }
        }
    });
}

function editar(req,res){
    var id = req.params['id'];
    var data = req.body;

    Categoria.findByIdAndUpdate({ _id: id }, {
        titulo: data.titulo,
        descripcion: data.descripcion
    }, (err, categoria_edit) =>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(categoria_edit){
                res.status(200).send({ categoria: categoria_edit });
            }else{
                res.status(403).send({ message: 'La categoría no se pudo actualizar'})
            }
        }
    });
}

function eliminar(req, res){
    var id = req.params['id'];

    Categoria.findOneAndRemove({ _id: id }, (err, categoria_delete) =>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(categoria_delete){
                res.status(200).send({ categoria: categoria_delete });
            }else{
                res.status(403).send({ message: 'La categoría no se pudo eliminar'})
            }
        }
    })
}

function filtrar(req, res){
    var nombre = req.params['nombre'];

    Categoria.find({titulo: new RegExp(nombre, 'i')}, (err, categoria_filtrada) =>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(categoria_filtrada){
                res.status(200).send({ categorias: categoria_filtrada });
            }else{
                res.status(403).send({ message: 'No hay registros con ese nombre'})
            }
        }
    });
}

module.exports = {
    registrar,
    obtener_categoria,
    editar,
    eliminar,
    filtrar
}