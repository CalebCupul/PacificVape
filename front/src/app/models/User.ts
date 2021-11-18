export class User{
    constructor(
        public _id: string,
        public nombre: string,
        public email: string,
        public telefono: number,
        public password: string,
        public role: string,
        public imagen: string
    ){

    }
}