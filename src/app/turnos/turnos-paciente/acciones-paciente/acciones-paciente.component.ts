import { Component, Input } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { Turno, EstadoTurno } from '../../shared/turno.model';
import { TurnosService } from '../../shared/turnos.service';

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

  get swalComentarios(): SweetAlertOptions {
    const comentarios: string[] = [];

    this.turno.comentarios.forEach(com => comentarios.push(`<i>${com}</i>`));
    
    return {
      title: 'Comentarios',
      html: comentarios.join(''),
      icon: 'info'
    };
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
