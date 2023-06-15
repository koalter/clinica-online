import { Component } from '@angular/core';
import { EspecialidadService } from '../../shared/services/especialidad.service';
import { Especialista, Paciente } from '../../shared/domains/usuario.model';
import { AuthService } from '../../shared/services/auth.service';
import { Turno } from '../shared/turno.model';

@Component({
  selector: 'solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {
  pacientes!: Promise<Paciente[]>;
  especialidades!: Promise<string[]>;
  especialistas!: Promise<Especialista[]>;
  fechas: Date[] = [];
  horas: Date[] = [];
  especialidad!: string;
  especialista!: Especialista;
  paciente!: Paciente;
  fecha!: Date;
  hora!: Date;
  step: number = 1;
  esAdmin: boolean;
  
  get dias(): number {
    return 15;
  }

  get modulos(): number {
    return (19 - 8) * 2;
  }

  constructor(private especialidadService: EspecialidadService, private authService: AuthService) {
    if (this.esAdmin = (this.authService.getDetalles()!.rol === 'administrador')) {
      this.step = 0;
      this.pacientes = this.authService.getPacientes();
    } else {
      this.seleccionarPaciente(this.authService.getDetalles() as Paciente);
    }

    this.especialidades = especialidadService.traerTodos();
    for (let i = 1; i <= this.dias; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      this.fechas.push(date);
    }

    for (let i = 0; i < this.modulos; i++) {
      const hora = new Date();
      hora.setHours(8 + i / 2);
      if (i % 2) {
        hora.setMinutes(30);
      } else {
        hora.setMinutes(0);
      }
      this.horas.push(hora);
    }
  }

  seleccionarPaciente(paciente: Paciente): void {
    this.paciente = paciente;
    this.step = 1;
  }
  
  seleccionarEspecialidad(especialidad: string): void {
    this.especialidad = especialidad;
    this.especialistas = this.especialidadService.traerEspecialistas(especialidad);
    this.step = 2;
  }

  seleccionarEspecialista(especialista: Especialista): void {
    this.especialista = especialista;
    this.step = 3;
  }

  seleccionarFecha(fecha: Date): void {
    this.fecha = fecha;
    this.step = 4;
  }

  seleccionarHora(hora: Date): void {
    this.hora = hora;
    this.step = 5;
  }

  crearTurno(): void {
    const fecha = this.fecha;
    fecha.setTime(this.hora.getTime());
    const turno = new Turno(this.paciente, this.especialista, this.fecha);
    console.log(turno);
  }
}
