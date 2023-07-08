import { Component, Input } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { Turno, EstadoTurno } from '../../shared/turno.model';
import { TurnosService } from '../../shared/turnos.service';

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

  get swalCancelar(): SweetAlertOptions {
    return {
      title: 'Cancelar turno',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      icon: 'warning',
      inputLabel: 'Deje el motivo de la cancelación',
      inputValidator: (valor: string) => {
        if (!valor) {
          return '¡Debe ingresar el motivo de la cancelación!';
        }
        return null;
      }
    }
  }

  constructor(private turnoService: TurnosService) {}

  btn_cancelado_click(comentario: string) {
    this.cambiarEstado(EstadoTurno.Cancelado, comentario);
  }

  private cambiarEstado(estado: EstadoTurno, comentarios?: string) {
    const nuevoEstado: EstadoTurno = estado;
    this.turnoService.cambiarEstado(this.turno.id!, nuevoEstado, comentarios)
    .then(() => {
      this.turno.estado = nuevoEstado;
      if (comentarios) {
        this.turno.comentarios.push(comentarios);
      }
    });
  }
}
