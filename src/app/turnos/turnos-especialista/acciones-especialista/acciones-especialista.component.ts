import { Component, Input } from '@angular/core';
import { Turno, EstadoTurno } from '../../shared/turno.model';

@Component({
  selector: 'acciones-especialista',
  templateUrl: './acciones-especialista.component.html',
  styleUrls: ['./acciones-especialista.component.scss']
})
export class AccionesEspecialistaComponent {
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
