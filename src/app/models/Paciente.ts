import { Usuario } from "./Usuario";

export class Paciente extends Usuario {
    obraSocial: string;
    imagenB: string;

    constructor(correo: string, nombre: string, apellido: string, edad: number, dni: number, imagen: string,
        imagenB: string, obraSocial: string) {
        super(correo, nombre, apellido, edad, dni, imagen);
        this.imagenB = imagenB;
        this.obraSocial = obraSocial;
    }
}
