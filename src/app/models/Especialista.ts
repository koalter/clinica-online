import { Usuario } from "./Usuario";

export class Especialista extends Usuario {
    especialidad: string;
    activo: boolean;

    constructor(correo: string, nombre: string, apellido: string, edad: number, dni: number, imagen: string,
        especialidad: string) {
        super(correo, nombre, apellido, edad, dni, imagen);
        this.especialidad = especialidad;
        this.activo = false;
    }
}
