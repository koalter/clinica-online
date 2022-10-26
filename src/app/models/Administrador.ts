import { Usuario } from "./Usuario";

export class Administrador extends Usuario {
    constructor(correo: string, nombre: string, apellido: string, edad: number, dni: number, imagen: string) {
        super(correo, nombre, apellido, edad, dni, imagen);
    }
}
