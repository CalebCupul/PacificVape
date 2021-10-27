var Cliente = require('../models/Cliente');

function registrar(req, res){
    let data = req.body;
    var cliente = new Cliente();
    cliente.nombres = data.nombres;
    cliente.ine = data.ine;
    cliente.correo = data.correo;
    cliente.telefono = data.telefono;

    cliente.save((err, cliente_save)=>{
        if(cliente_save){
            res.status(200).send({ cliente: cliente_save});
        }else{
            res.status(500).send(err);
        }
    });
}

function editar(req,res){
    let id = req.params['id'];
    let data = req.body;

    Cliente.findByIdAndUpdate(id, {
        nombres: data.nombres,
        ine: data.ine,
        correo: data.correo,
        telefono: data.telefono
    }, (err, cliente_edit) =>{
        if(cliente_edit){
            res.status(200).send({ cliente: cliente_edit});
        }else{
            res.status(500).send(err);

        }
    });
}

function eliminar(req,res){
    var id = req.params['id'];

    Cliente.findByIdAndRemove({ _id: id }, (err, cliente_eliminado) =>{
        if(err){
            res.status(500).send({ message: 'Error en el servidor'});
        }else{
            if(cliente_eliminado){
                res.status(200).send({ cliente: cliente_eliminado });
            }else{
                res.status(403).send({ message: 'El cliente no se pudo eliminar'});

            }
        }
    })
    

}

module.exports = {
    registrar,
    editar,
    eliminar
}