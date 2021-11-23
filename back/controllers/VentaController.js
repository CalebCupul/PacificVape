var Venta = require('../models/venta');
var DetalleVenta = require('../models/detalleventa');
const Producto = require('../models/producto');

function registrar(req, res){
    let data = req.body;
    var venta = new Venta();
    venta.id_cliente = data.id_cliente;
    venta.id_user = data.id_user;
    venta.total = data.total;

    venta.save((err, venta_save) =>{
        if(err){
            res.status(500).send({ error: 'Error en el servidor'});
        }else{
            if(venta_save){
                let detalles = data.detalles;
                detalles.forEach((element, index) => {
                    var detalleventa = new DetalleVenta();
                    detalleventa.id_producto = element.id_producto;
                    detalleventa.cantidad = element.cantidad;
                    detalleventa.venta = venta_save.id;

                    detalleventa.save((err, detalle_save) => {
                        if(detalle_save){
                            Producto.findById({ _id: element.id_producto}, (err, producto_data) =>{
                                if(producto_data){
                                    Producto.findByIdAndUpdate({ _id: producto_data._id}, 
                                        { stock: parseInt(producto_data.stock) - parseInt(element.cantidad)}, (err, producto_edit) =>{
                                            res.end();
                                        });
                                }else{
                                    res.status(403).send({ message: 'El producto no se pudo encontrar'});
                                }
                            });
                        }else{
                            res.status(403).send({ message: 'La venta no se pudo registrar'});
                        }
                    });
                });
            }else{
                res.status(403).send({ message: 'La venta no se pudo registrar'});
            }
        }
    })

}

function datos_venta(req, res){
    var id = req.params['id'];

    Venta.findById(id).populate('id_cliente').populate('id_user').exec((err, data_venta) =>{
        if(data_venta){
            DetalleVenta.find({venta: data_venta._id}).populate('id_producto').exec({ id_venta: id}, (err, data_detalle) =>{
                if(data_detalle){
                    res.status(200).send({
                            data: {
                                venta: data_venta,
                                detalles: data_detalle
                            }
                    });
                }
            });
        }
    });
}

function filtrar(req, res){
    Venta.find().populate('id_cliente').populate('id_user').exec((err, data_venta) =>{
        if(data_venta){
            res.status(200).send({ ventas: data_venta});
        }else{
            res.status(404).send({ message: "No existe esa venta"});
        }
    });
}

function detalle_venta(req, res){
    var id = req.params['id'];

    DetalleVenta.find({venta: id}).populate('id_producto').exec((err, data_detalle) =>{
        if(data_detalle){
            res.status(200).send({ detalle_venta: data_detalle});
        }else{
            res.status(404).send({ message: "No existe esa venta"});
        }
    });
}

module.exports = {
    registrar,
    datos_venta,
    filtrar,
    detalle_venta
}