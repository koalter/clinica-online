import { Usuario } from "./Usuario";

export class Paciente extends Usuario {
    private obraSocial: string;
    private imagenB: string;

    public get ObraSocial(): string {
        return this.obraSocial;
    }

    public get ImagenB(): string {
        return this.imagenB;
    }

    constructor(correo: string, nombre: string, apellido: string, edad: number, dni: number, imagen: string, rol: string,
        imagenB: string, obraSocial: string) {
        super(correo, nombre, apellido, edad, dni, imagen, rol);
        this.imagenB = imagenB;
        this.obraSocial = obraSocial;
    }
}
