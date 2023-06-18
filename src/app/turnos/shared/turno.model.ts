import { Paciente, Especialista } from "../../shared/domains/usuario.model";

export class Turno {
    paciente: string;
    especialista: string;
    especialidad: string;
    fecha: Date;

    pacienteDetalles?: Paciente;
    especialistaDetalles?: Especialista;

    constructor(paciente: string, especialista: string, especialidad: string, fecha: Date) {
        this.paciente = paciente;
        this.especialista = especialista;
        this.especialidad = especialidad;
        this.fecha = fecha;
    }
}

export declare type Turnos = Turno[];