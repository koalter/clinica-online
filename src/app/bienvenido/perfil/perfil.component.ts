import { Component, inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Especialidad, EstadoHora } from '../../shared/domains/especialidad.model';
import { EspecialidadService } from '../../shared/services/especialidad.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  private authService = inject(AuthService);
  private especialidadService = inject(EspecialidadService);
  usuario: any = this.authService.getDetalles()!;
  especialidades?: Especialidad[] | null;
  especialidad?: Especialidad;
  modulo!: any;
  modulos = [
    {
      dia: 'Lunes',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Martes',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Miércoles',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Jueves',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Viernes',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false },
        { valor: '14:00', activo: false }, { valor: '14:30', activo: false }, { valor: '15:00', activo: false }, { valor: '15:30', activo: false },
        { valor: '16:00', activo: false }, { valor: '16:30', activo: false }, { valor: '17:00', activo: false }, { valor: '17:30', activo: false },
        { valor: '18:00', activo: false }, { valor: '18:30', activo: false }
      ],
      activo: false
    },
    {
      dia: 'Sábado',
      horarios: [
        { valor: '08:00', activo: false }, { valor: '08:30', activo: false }, { valor: '09:00', activo: false }, { valor: '09:30', activo: false },
        { valor: '10:00', activo: false }, { valor: '10:30', activo: false }, { valor: '11:00', activo: false }, { valor: '11:30', activo: false },
        { valor: '12:00', activo: false }, { valor: '12:30', activo: false }, { valor: '13:00', activo: false }, { valor: '13:30', activo: false }
      ],
      activo: false
    },
  ];
  
  constructor() {
    if (this.usuario.especialidades) {
      this.especialidadService.traerItinerarios(this.usuario.mail)
      .then(res => {
        this.especialidades = res;
        this.setIndiceEspecialidad(0);
      });
    }
  }

  setIndiceEspecialidad(indice: number) {
    this.especialidad = this.especialidades![indice];
  }

  seleccionarDia(value: any) {
    this.modulo = value;
  }

  agregarOEliminarHorario(dia: string, hora: string, estado: string) {
    const nuevoEstado = estado === EstadoHora.Deshabilitado.toString() ? EstadoHora.Libre : EstadoHora.Deshabilitado;
    this.especialidad!.getHorario(dia)!.getHora(hora)!.estado = nuevoEstado;
  }

  updateHorario() {
    this.especialidadService.actualizarHorarios(this.especialidad!);
  }

}
