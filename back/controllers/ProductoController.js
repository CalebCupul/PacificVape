var Producto = require('../models/producto');
var fs = require('fs');

function registrar(req, res){

    var data = req.body;

    //TODO: VERIFICAR SI EL TITULO YA 
    //EXISTE PARA NO REGISTRARLO NUEVAMENTE

    if(req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        var producto = new Producto();
        producto.marca = data.marca;
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.id_categoria = data.id_categoria;

        producto.save((err, producto_save) =>{
            if(err){
                res.status(500).send({ message: 'Error en el servidor'});
            }else{
                if(producto_save){
                    res.status(200).send({ producto: producto_save});
                }else{
                    res.status(403).send({ message: 'No se pudo registrar el producto'});

                }
            }
        });
        
    }else{
        var producto = new Producto();
        producto.marca = data.marca;
        producto.titulo = data.titulo;
        producto.descripcion = data.descripcion;
        producto.imagen = null;
        producto.precio_compra = data.precio_compra;
        producto.precio_venta = data.precio_venta;
        producto.stock = data.stock;
        producto.id_categoria = data.id_categoria;

        producto.save((err, producto_save) =>{
            if(err){
                res.status(500).send({ message: 'Error en el servidor'});
            }else{
                if(producto_save){
                    res.status(200).send({ producto: producto_save});
                }else{
                    res.status(403).send({ message: 'No se pudo registrar el producto'});

                }
            }
        });
    }

}

function filtrar(req, res){
    var titulo = req.params['titulo'];

    Producto.find({ titulo: new RegExp(titulo, 'i')}, (err, productos_filtrados) =>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(productos_filtrados){
                res.status(200).send({ productos: productos_filtrados});
            }else{
                res.status(403).send({ message: 'No existe ningún registro con ese nombre'});

            }
        }
    });

}

function editar(req, res){
    var id = req.params['id'];
    var data = req.body;
    var img = req.params['img'];

    if(req.files){
        // Se borra la imagen anterior
        fs.unlink('./uploads/productos/' + img, (err) =>{
            if(err) throw err;
        });


        // Se extrae la ubicacion de la imagen,
        // con el split se parte la cadena en 3: uploads/productos/imagen
        // y se toma unicamente el nombre de la imagen
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        Producto.findByIdAndUpdate({ _id: id }, {
            marca: data.marca,
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            id_categoria: data.id_categoria
        }, (err, producto_edit) =>{
            if(err){
                res.status(500).send({ message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({ producto: producto_edit});
                }else{
                    res.status(403).send({ message: 'El producto no se pudo actualizar'})
    
                }
            }
        });
    }else{
        Producto.findByIdAndUpdate({ _id: id }, {
            marca: data.marca,
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: null,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            stock: data.stock,
            id_categoria: data.id_categoria
        }, (err, producto_edit) =>{
            if(err){
                res.status(500).send({ message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({ producto: producto_edit});
                }else{
                    res.status(403).send({ message: 'El producto no se pudo actualizar'});
    
                }
            }
        });
    }

    
}

function obtener_producto(req,res){
    var id = req.params['id'];

    Producto.findOne({ _id: id }, (err, producto_data)=>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(producto_data){
                res.status(200).send({ producto: producto_data });
            }else{
                res.status(403).send({ message: 'El producto no existe'});

            }
        }
    });

}

function eliminar(req, res){
    var id = req.params['id'];

    Producto.findOneAndRemove({ _id: id }, (err, producto_eliminado) =>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(producto_eliminado){
                fs.unlink('./uploads/productos/' + producto_eliminado.imagen, (err) =>{
                    if(err) throw err;
                });
                res.status(200).send({ producto: producto_eliminado});
            }else{
                res.status(403).send({ message: 'El producto no se pudo eliminar'});
            }
        }
    })
}

function actualizar_stock(req, res){
    var id = req.params['id'];
    var data = req.body;

    Producto.findById(id, (err, producto_data) =>{
        if(producto_data){
            Producto.findByIdAndUpdate(id, { stock: parseInt(producto_data.stock) + parseInt(data.stock)}, (err, producto_edit) =>{
                if(producto_edit){
                    res.status(200).send({ producto: producto_edit});
                }
            });
        }else{
            res.status(500).send({ message: 'Error en el servidor'});
        }
    })
}

module.exports = {
    registrar,
    filtrar,
    editar,
    obtener_producto,
    eliminar,
    actualizar_stock
}