import { Component, Input, inject } from '@angular/core';
import { Turno, EstadoTurno } from '../../shared/turno.model';
import { TurnosService } from '../../shared/turnos.service';
import { SweetAlertOptions } from 'sweetalert2';

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

  get swalRechazar(): SweetAlertOptions {
    return {
      title: 'Rechazar turno',
      input: 'text',
      showCancelButton: true,
      icon: 'warning',
      inputLabel: 'Deje el motivo del rechazo',
      inputValidator: (valor: string) => {
        if (!valor) {
          return '¡Debe ingresar el motivo del rechazo!';
        }
        return null;
      }
    }
  }

  get swalAceptar(): SweetAlertOptions {
    return {
      title: 'Aceptar turno',
      text: '¿Desea confirmar el turno?',
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    }
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

  get swalFinalizar(): SweetAlertOptions {
    return {
      title: 'Finalizar turno',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      icon: 'info',
      inputLabel: 'Deje comentarios finales y/o diagnóstico',
      inputValidator: (valor: string) => {
        if (!valor) {
          return '¡Debe ingresar los comentarios finales!';
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

  private cambiarEstado(estado: EstadoTurno, comentarios?: string) {
    const nuevoEstado: EstadoTurno = EstadoTurno[estado as keyof typeof EstadoTurno];
    this.turnoService.cambiarEstado(this.turno.id!, nuevoEstado, comentarios)
    .then(() => {
      this.turno.estado = nuevoEstado;
      debugger
      if (comentarios) {
        this.turno.comentarios.push(comentarios);
      }
    });
  }

  btn_rechazado_click(comentario: string) {
    this.cambiarEstado(EstadoTurno.Rechazado, comentario);
  }

  btn_aceptado_click() {
    this.cambiarEstado(EstadoTurno.Aceptado);
  }

  btn_cancelado_click(comentario: string) {
    this.cambiarEstado(EstadoTurno.Cancelado, comentario);
  }

  btn_realizado_click(comentario: string) {
    this.cambiarEstado(EstadoTurno.Realizado, comentario);
  }
}
