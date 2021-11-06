export class Producto{
    constructor(
        public _id: string,
        public titulo: string,
        public marca: string,
        public imagen: string,
        public descripcion: string,
        public precio_compra: number,
        public precio_venta: number,
        public stock: number,
        public id_categoria: string
    ){

    }
}