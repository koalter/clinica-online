import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { TurnosService } from './shared/turnos.service';
import { Paciente, Especialista } from '../shared/domains/usuario.model';
import { Turno } from './shared/turno.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private turnoService: TurnosService = inject(TurnosService);
  usuario = this.authService.getDetalles();

  turnos!: Turno[];
  pacientes!: Paciente[];
  especialistas!: Especialista[];

  backupTurnos?: Turno[];

  private fb: FormBuilder = inject(FormBuilder);
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
  form: FormGroup = this.fb.group({
    busqueda: [null, Validators.required],
    criterio: [null, Validators.required]
  });
  
  get busqueda() { return this.form.get('busqueda') }
  get criterio() { return this.form.get('criterio') }

  async ngOnInit() {
    this.turnos = await this.turnoService.traerTodos();
    this.pacientes = await this.authService.getPacientes();
    this.especialistas = await this.authService.getEspecialistas();
    
    for (let turno of this.turnos) {
      turno.pacienteDetalles = this.pacientes.find(p => p.mail === turno.paciente);
      turno.especialistaDetalles = this.especialistas.find(e => e.mail === turno.especialista);
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
      }

      this.filtrarTurnos();
    }
  }

  limpiar(filtro: any) {
    filtro.valor = '';
    this.filtrarTurnos();
  }

  filtrarTurnos() {
    this.turnos = this.backupTurnos!;
    if (this.filtroPaciente) {
      this.turnos = this.turnos!.filter(p => {
        return p.paciente?.toLowerCase().includes(this.filtroPaciente.valor) ||
          p.pacienteDetalles?.nombre.toLowerCase().includes(this.filtroPaciente.valor) ||
          p.pacienteDetalles?.apellido.toLowerCase().includes(this.filtroPaciente.valor) ||
          p.pacienteDetalles?.dni.toString().includes(this.filtroPaciente.valor);
      });
    }
    if (this.filtroEspecialista) {
      this.turnos = this.turnos!.filter(e => {
        return e.especialista?.toLowerCase().includes(this.filtroEspecialista.valor) ||
          e.especialistaDetalles?.nombre.toLowerCase().includes(this.filtroEspecialista.valor) ||
          e.especialistaDetalles?.apellido.toLowerCase().includes(this.filtroEspecialista.valor) ||
          e.especialistaDetalles?.dni.toString().includes(this.filtroEspecialista.valor);
      });
    }
    if (this.filtroEspecialidad) {
      this.turnos = this.turnos!.filter(e => {
        return e.especialidad?.toLowerCase().includes(this.filtroEspecialidad.valor);
      });
    }
  }
}
