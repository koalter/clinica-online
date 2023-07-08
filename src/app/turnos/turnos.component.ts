import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { TurnosService } from './shared/turnos.service';
import { Paciente, Especialista } from '../shared/domains/usuario.model';
import { Turno } from './shared/turno.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HistoriaClinicaService } from '../bienvenido/historia-clinica/shared/historia-clinica.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {
  usuario = this.authService.getDetalles();

  turnos!: Turno[];
  pacientes!: Paciente[];
  especialistas!: Especialista[];

  backupTurnos?: Turno[];

  filtroEspecialidad = {
    criterio: 'especialidad',
    valor: ''
  };
  filtroEspecialista = {
    criterio: 'especialista',
    valor: ''
  };
  filtroPaciente = {
    criterio: 'paciente',
    valor: ''
  };
  filtroHistoria: { criterio: string, valor: string }[] = [];
  form: FormGroup = this.fb.group({
    busqueda: [null, Validators.required],
    criterio: [null, Validators.required]
  });
  
  get busqueda() { return this.form.get('busqueda') }
  get criterio() { return this.form.get('criterio') }

  constructor(private authService: AuthService,
    private turnoService: TurnosService,
    private historiaClinicaService: HistoriaClinicaService,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.turnos = await this.turnoService.traerTodos();
    this.pacientes = await this.authService.getPacientes();
    this.especialistas = await this.authService.getEspecialistas();
    
    for (let turno of this.turnos) {
      turno.pacienteDetalles = this.pacientes.find(p => p.mail === turno.paciente);
      turno.especialistaDetalles = this.especialistas.find(e => e.mail === turno.especialista);
      debugger
      if (turno.historiaClinica)
        turno.historiaClinicaDetalles = await this.historiaClinicaService.getPorId(turno.historiaClinica);
    }

    this.backupTurnos = this.turnos.slice();
  }

  turnosPaciente() {
    if (this.turnos) {
      return this.turnos.filter(t => t.paciente == this.usuario?.mail);
    }

    return null;
  }

  turnosEspecialista() {
    if (this.turnos) {
      return this.turnos.filter(t => t.especialista == this.usuario?.mail);
    }

    return null;
  }

  buscar() {
    if (this.form.valid) {
      switch (this.criterio?.value) {
        case 'especialidad':
          this.filtroEspecialidad.valor = this.busqueda?.value.toLowerCase();
          break;
        case 'especialista':
          this.filtroEspecialista.valor = this.busqueda?.value.toLowerCase();
          break;
        case 'paciente':
          this.filtroPaciente.valor = this.busqueda?.value.toLowerCase();
          break;
        case 'historia':
          debugger
          const filtro = (this.busqueda?.value as string).split(':');
          if (filtro.length !== 2) return;
          this.filtroHistoria.push({ criterio: filtro[0].trim(), valor: filtro[1].trim() });
      }

      this.filtrarTurnos();
    }
  }

  limpiar(filtro: any) {
    filtro.valor = '';
    this.filtrarTurnos();
  }

  limpiarFiltroHistoria() {
    this.filtroHistoria = [];
    this.filtrarTurnos();
  }

  filtrarTurnos() {
    this.turnos = this.backupTurnos!;
    if (this.filtroPaciente.valor) {
      this.turnos = this.turnos!.filter(p => {
        return p.paciente?.toLowerCase().includes(this.filtroPaciente.valor) ||
          p.pacienteDetalles?.nombre.toLowerCase().includes(this.filtroPaciente.valor) ||
          p.pacienteDetalles?.apellido.toLowerCase().includes(this.filtroPaciente.valor) ||
          p.pacienteDetalles?.dni.toString() == this.filtroPaciente.valor;
      });
    }
    if (this.filtroEspecialista.valor) {
      this.turnos = this.turnos!.filter(e => {
        return e.especialista?.toLowerCase().includes(this.filtroEspecialista.valor) ||
          e.especialistaDetalles?.nombre.toLowerCase().includes(this.filtroEspecialista.valor) ||
          e.especialistaDetalles?.apellido.toLowerCase().includes(this.filtroEspecialista.valor) ||
          e.especialistaDetalles?.dni.toString() == this.filtroEspecialista.valor;
      });
    }
    if (this.filtroEspecialidad.valor) {
      this.turnos = this.turnos!.filter(e => {
        return e.especialidad?.toLowerCase().includes(this.filtroEspecialidad.valor);
      });
    }
    if (this.filtroHistoria.length) {
      for (let filtro of this.filtroHistoria) {
        this.turnos = this.filtrarPorHistoriaClinica(this.turnos, filtro);
      }
    }
  }

  private filtrarPorHistoriaClinica(turnos: Turno[], filtro: any) {
    return turnos.filter(t => {
      const criterio = (filtro.criterio as string).toLowerCase();
      switch (criterio) {
        case 'altura':
          return t.historiaClinicaDetalles?.altura === filtro.valor;
        case 'peso':
          return t.historiaClinicaDetalles?.peso === filtro.valor;
        case 'presion':
          return t.historiaClinicaDetalles?.presion === filtro.valor;
        case 'temperatura':
          return t.historiaClinicaDetalles?.temperatura === filtro.valor;
        default:
          return t.historiaClinicaDetalles?.get(criterio)?.toLowerCase().includes((filtro.valor as string).toLowerCase());
      }
    });
  }
}
