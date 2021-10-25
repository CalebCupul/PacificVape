const mongoose = require("mongoose")

const dbConnection = async() => {

    try {
        // Esperar conexion a base de datos
        await mongoose.connect( 'mongodb+srv://Caleb:123@cluster0.nfetn.mongodb.net/sistema-inventario' );

        console.log('DB Online');
    } catch ( error ){
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');
    }

}

module.exports = {
    dbConnection
}