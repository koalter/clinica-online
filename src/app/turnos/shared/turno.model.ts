import { HistoriaClinica } from "../../bienvenido/historia-clinica/shared/historia-clinica.model";
import { Paciente, Especialista } from "../../shared/domains/usuario.model";

export class Turno {
    id?: string;
    paciente: string;
    especialista: string;
    especialidad: string;
    fecha: Date;
    estado: EstadoTurno;
    comentarios: string[];
    historiaClinica?: string;

    pacienteDetalles?: Paciente;
    especialistaDetalles?: Especialista;
    historiaClinicaDetalles?: HistoriaClinica;

    constructor(paciente: string, especialista: string, especialidad: string, fecha: Date, estado: EstadoTurno = EstadoTurno.Solicitado, comentarios: string[] = []) {
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