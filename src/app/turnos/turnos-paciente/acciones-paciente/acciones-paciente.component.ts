import { Component, Input } from '@angular/core';
import { Turno, EstadoTurno } from '../../shared/turno.model';

@Component({
  selector: 'acciones-paciente',
  templateUrl: './acciones-paciente.component.html',
  styleUrls: ['./acciones-paciente.component.scss']
})
export class AccionesPacienteComponent {
  @Input() turno!: Turno;

  get aceptado(): boolean {
    return this.turno.estado == EstadoTurno.Aceptado;
  }

  get realizado(): boolean {
    return this.turno.estado == EstadoTurno.Realizado;
  }

  get cancelado(): boolean {
    return this.turno.estado == EstadoTurno.Cancelado;
  }

  get rechazado(): boolean {
    return this.turno.estado == EstadoTurno.Rechazado;
  }
}
