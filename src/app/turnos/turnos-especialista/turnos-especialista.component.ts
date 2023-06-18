import { Component, Input } from '@angular/core';
import { Turno } from '../shared/turno.model';

@Component({
  selector: 'turnos-especialista',
  templateUrl: './turnos-especialista.component.html',
  styleUrls: ['./turnos-especialista.component.scss']
})
export class TurnosEspecialistaComponent {
  @Input() turnos: Turno[] = [];
}
