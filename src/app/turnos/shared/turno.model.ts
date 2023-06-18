import { Paciente, Especialista } from "../../shared/domains/usuario.model";

export class Turno {
    paciente: Paciente;
    especialista: Especialista;
    especialidad: string;
    fecha: Date;

    constructor(paciente: Paciente, especialista: Especialista, especialidad: string, fecha: Date) {
        this.paciente = paciente;
        this.especialista = especialista;
        this.especialidad = especialidad;
        this.fecha = fecha;
    }
}

export declare type Turnos = Turno[];