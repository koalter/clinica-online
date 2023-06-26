import { Component, Input, inject } from '@angular/core';
import { Turno, EstadoTurno } from '../../shared/turno.model';
import { TurnosService } from '../../shared/turnos.service';

@Component({
  selector: 'acciones-especialista',
  templateUrl: './acciones-especialista.component.html',
  styleUrls: ['./acciones-especialista.component.scss']
})
export class AccionesEspecialistaComponent {
  @Input() turno!: Turno;
  private turnoService: TurnosService = inject(TurnosService);

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

  cambiarEstado(estado: string) {
    const nuevoEstado: EstadoTurno = EstadoTurno[estado as keyof typeof EstadoTurno];
    this.turnoService.cambiarEstado(this.turno.id!, nuevoEstado)
    .then(() => {
      this.turno.estado = nuevoEstado;
    });
  }

  verComentarios() {
    console.log(this.turno.comentarios);
  }
}
