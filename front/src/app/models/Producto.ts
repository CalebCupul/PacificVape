export class Producto{
    constructor(
        public _id: string,
        public titulo: string,
        public marca: string,
        public imagen: string,
        public descripcion: string,
        public precio_compra: number | null,
        public precio_venta: number | null,
        public stock: number | null,
        public id_categoria: string
    ){

    }
}