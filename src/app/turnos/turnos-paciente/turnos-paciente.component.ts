import { Component } from '@angular/core';
import { Turno, Turnos } from '../shared/turno.model';

@Component({
  selector: 'app-turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})
export class TurnosPacienteComponent {
  turnos: Turnos = [];
}
