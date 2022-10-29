import { Usuario } from "./Usuario";

export class Especialista extends Usuario {
    private especialidad: string;
    private activo: boolean;

    public get Especialidad(): string {
        return this.especialidad;
    }

    public get Activo(): boolean {
        return this.activo;
    }

    public set Activo(value: boolean) {
        this.activo = value;
    }

    constructor(correo: string, nombre: string, apellido: string, edad: number, dni: number, imagen: string, rol: string,
        especialidad: string) {
        super(correo, nombre, apellido, edad, dni, imagen, rol);
        this.especialidad = especialidad;
        this.activo = false;
    }
}
