import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { TurnosService } from '../../turnos/shared/turnos.service';
import { Paciente } from '../../shared/domains/usuario.model';

@Component({
  selector: 'especialista-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {

  usuarios!: Paciente[];

  constructor(private authService: AuthService,
    private turnoService: TurnosService) {}

  async ngOnInit() {
    this.usuarios = await this.authService.getPacientes();
    const turnos = await this.turnoService.filtrarPacientes(this.authService.getDetalles()?.mail!, true);
  }

  exportarTurnos(paciente: Paciente) {
    console.log('exportarTurnos');
  }
}
