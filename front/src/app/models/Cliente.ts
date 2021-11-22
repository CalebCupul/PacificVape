export class Cliente{
    constructor(
        public _id: string,
        public nombres: string,
        public identificacion: string,
        public correo: string,
        public telefono: number | null
    ){

    }
}