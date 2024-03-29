import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../shared/services/especialidad.service';
import { Especialista, Paciente } from '../../shared/domains/usuario.model';
import { AuthService } from '../../shared/services/auth.service';
import { Turno } from '../shared/turno.model';
import { TurnosService } from '../shared/turnos.service';
import { Router } from '@angular/router';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {
  pacientes!: Promise<Paciente[]>;
  especialidades!: Promise<string[]>;
  especialistas!: Promise<Especialista[]>;
  fechas: Date[] = [];
  horas: Date[] = [];
  especialidad!: string;
  especialista!: Especialista;
  paciente!: Paciente;
  fecha!: Date;
  hora!: Date;
  step: number = 1;
  esAdmin!: boolean;
  imagenesEspecialista: KeyValue<string, string>[] = [];
  
  get dias(): number {
    return 15;
  }

  get modulos(): number {
    return (19 - 8) * 2;
  }

  constructor(private especialidadService: EspecialidadService,
    private authService: AuthService,
    private turnoService: TurnosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioDetalles = this.authService.getDetalles();
    if (this.esAdmin = (usuarioDetalles!.rol === 'administrador')) {
      this.step = 0;
      this.pacientes = this.authService.getPacientes();
    } else {
      if (usuarioDetalles!.rol === 'paciente') {
        this.seleccionarPaciente(usuarioDetalles as Paciente);
      } else {
        this.router.navigateByUrl('');
      }
    }

    this.especialistas = this.authService.getEspecialistas();

    for (let i = 1; i <= this.dias; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (date.toLocaleDateString('es-AR', { weekday: 'long' }) !== 'domingo') {
        this.fechas.push(date);
      }
    }

    for (let i = 0; i < this.modulos; i++) {
      const hora = new Date();
      hora.setHours(8 + i / 2);
      if (i % 2) {
        hora.setMinutes(30);
      } else {
        hora.setMinutes(0);
      }
      this.horas.push(hora);
    }
  }

  seleccionarPaciente(paciente: Paciente): void {
    this.paciente = paciente;
    this.step = 1;
  }
  
  seleccionarEspecialidad(especialidad: string): void {
    this.especialidad = especialidad;
    this.step = 3;
  }

  seleccionarEspecialista(especialista: Especialista): void {
    this.especialista = especialista;
    this.especialidadService.traerImagenes(this.especialista.especialidades)
      .then(e => {
        this.imagenesEspecialista = e;
        this.step = 2;
      });
  }

  seleccionarFecha(fecha: Date): void {
    this.fecha = fecha;
    this.step = 4;
  }

  seleccionarHora(hora: Date): void {
    this.hora = hora;
    this.step = 5;
  }

  obtenerImagenEspecialidad(especialidad: string) {
    const res = this.imagenesEspecialista.find(item => item.key === especialidad);
    return res?.value;
  }

  crearTurno(): void {
    const fecha = this.fecha;

    fecha.setHours(this.hora.getHours());
    fecha.setMinutes(this.hora.getMinutes());
    fecha.setSeconds(0);
    
    const turno = new Turno(this.paciente.mail, this.especialista.mail, this.especialidad, this.fecha);
    this.turnoService.alta(turno)
    .then(() => {
      this.router.navigateByUrl('');
    });
  }

}
