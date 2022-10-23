export class Usuario {
    correo: string;
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    imagen: string;

    public get rol() : string {
        return this.constructor.name.toLowerCase();
    }
    

    constructor(correo: string, nombre: string, apellido: string, edad: number, dni: number, imagen: string) {
        this.correo = correo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.imagen = imagen;
    }
}
