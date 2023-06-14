import { Component } from '@angular/core';
import { EspecialidadService } from '../../shared/services/especialidad.service';
import { Especialista } from '../../shared/domains/usuario.model';

@Component({
  selector: 'solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent {
  especialidades!: Promise<string[]>;
  especialistas!: Promise<Especialista[]>;
  fechas: Date[] = [];
  especialidad!: string;
  especialista!: Especialista;
  fecha!: Date;
  step: number = 1;
  
  get dias(): number {
    return 15;
  }

  constructor(private especialidadService: EspecialidadService) {
    this.especialidades = especialidadService.traerTodos();
    for (let i = 0; i < this.dias; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      this.fechas.push(date);
    }
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
}
