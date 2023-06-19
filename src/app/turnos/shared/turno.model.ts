import { Paciente, Especialista } from "../../shared/domains/usuario.model";

export class Turno {
    paciente: string;
    especialista: string;
    especialidad: string;
    fecha: Date;
    estado: EstadoTurno;
    comentarios: string | string[];

    pacienteDetalles?: Paciente;
    especialistaDetalles?: Especialista;

    constructor(paciente: string, especialista: string, especialidad: string, fecha: Date, estado: EstadoTurno = EstadoTurno.Solicitado, comentarios: string | string[] = '') {
        this.paciente = paciente;
        this.especialista = especialista;
        this.especialidad = especialidad;
        this.fecha = fecha;
        this.estado = estado;
        this.comentarios = comentarios;
    }
}

export declare type Turnos = Turno[];

export enum EstadoTurno {
    Solicitado = 'Solicitado',
    Cancelado = 'Cancelado',
    Aceptado = 'Aceptado',
    Rechazado = 'Rechazado',
    Realizado = 'Realizado'
}