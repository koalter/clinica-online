import { Paciente, Especialista } from "../../shared/domains/usuario.model";

export class Turno {
    paciente: Paciente;
    especialista: Especialista;
    fecha: Date;

    constructor(paciente: Paciente, especialista: Especialista, fecha: Date) {
        this.paciente = paciente;
        this.especialista = especialista;
        this.fecha = fecha;
    }
}

export declare type Turnos = Turno[];