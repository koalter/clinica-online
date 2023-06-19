import { Component, Input } from '@angular/core';
import { Turno, EstadoTurno } from '../../shared/turno.model';

@Component({
  selector: 'acciones-administrador',
  templateUrl: './acciones-administrador.component.html',
  styleUrls: ['./acciones-administrador.component.scss']
})
export class AccionesAdministradorComponent {
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
