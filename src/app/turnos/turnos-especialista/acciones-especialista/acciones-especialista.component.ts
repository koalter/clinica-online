import { Component, Input, ViewChild, inject } from '@angular/core';
import { SweetAlertOptions } from 'sweetalert2';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { Turno, EstadoTurno } from '../../shared/turno.model';
import { TurnosService } from '../../shared/turnos.service';
import { HistoriaClinicaService } from '../../../bienvenido/historia-clinica/shared/historia-clinica.service';

@Component({
  selector: 'acciones-especialista',
  templateUrl: './acciones-especialista.component.html',
  styleUrls: ['./acciones-especialista.component.scss']
})
export class AccionesEspecialistaComponent {
  @Input() turno!: Turno;
  @ViewChild('historiaClinica') readonly historiaClinica!: SwalComponent;

  constructor(private turnoService: TurnosService,
    private historiaClinicaService: HistoriaClinicaService,
    private router: Router,
    public readonly swalTargets: SwalPortalTargets) {}

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
      inputLabel: 'Deje comentarios finales y/o diagnóstico.\nActo seguido deberá completar la historia clínica del paciente',
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
    const nuevoEstado: EstadoTurno = estado;
    this.turnoService.cambiarEstado(this.turno.id!, nuevoEstado, comentarios)
    .then(() => {
      this.turno.estado = nuevoEstado;
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
    this.router.navigate(['historia/nueva', { paciente: this.turno.paciente, especialidad: this.turno.especialidad, turno: this.turno.id! }])
    .then(res => {
      if (res) {
        this.cambiarEstado(EstadoTurno.Realizado, comentario);
      }
    });
  }

  verHistoriaClinica() {
    this.historiaClinica.fire();
  }
  
  descargarHistoriaClinica() {
    this.historiaClinicaService.generarPDF([this.turno.historiaClinicaDetalles!]);
  }
}
