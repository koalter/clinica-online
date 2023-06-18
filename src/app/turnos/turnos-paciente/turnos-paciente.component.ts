import { Component, Input } from '@angular/core';
import { Turno, Turnos } from '../shared/turno.model';

@Component({
  selector: 'turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})
export class TurnosPacienteComponent {
  @Input() turnos: Turnos = [];
}
