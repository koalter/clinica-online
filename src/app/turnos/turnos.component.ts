import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { TurnosService } from './shared/turnos.service';
import { Paciente, Especialista } from '../shared/domains/usuario.model';
import { Turno } from './shared/turno.model';

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

  async ngOnInit() {
    this.turnos = await this.turnoService.traerTodos();
    this.pacientes = await this.authService.getPacientes();
    this.especialistas = await this.authService.getEspecialistas();
    
    for (let turno of this.turnos) {
      turno.pacienteDetalles = this.pacientes.find(p => p.mail === turno.paciente);
      turno.especialistaDetalles = this.especialistas.find(e => e.mail === turno.especialista);
    }
  }

  turnosPaciente() {
    return this.turnos.filter(t => t.paciente == this.usuario?.mail);
  }

  turnosEspecialista() {
    return this.turnos.filter(t => t.especialista == this.usuario?.mail);
  }
}
