import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { TurnosService } from '../../turnos/shared/turnos.service';
import { Paciente } from '../../shared/domains/usuario.model';
import { ArchivoService } from '../../shared/services/archivo.service';

@Component({
  selector: 'especialista-lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent implements OnInit {

  usuarios: Paciente[] = [];

  constructor(private authService: AuthService,
    private turnoService: TurnosService,
    private archivoService: ArchivoService
  ) {}

  async ngOnInit() {
    debugger
    const pacientes = await this.authService.getPacientes();
    const turnos = await this.turnoService.filtrarPacientes(this.authService.getDetalles()?.mail!);

    for (let paciente of pacientes) {
      let match = turnos.find(t => t.paciente === paciente.mail);
      if (match) {
        this.usuarios.push(paciente);
      }
    }
  }

  exportarTurnos(paciente: Paciente) {
    this.turnoService.traerPorPaciente(paciente.mail)
    .then(res => {
      const turnos = res.filter(t => t.especialista === this.authService.getDetalles()?.mail);
      this.archivoService.exportarXLS('turnos-paciente', turnos);
    });
  }
}
