import { Component, Input, OnInit } from '@angular/core';
import { Turno } from '../shared/turno.model';

@Component({
  selector: 'turnos-administrador',
  templateUrl: './turnos-administrador.component.html',
  styleUrls: ['./turnos-administrador.component.scss']
})
export class TurnosAdministradorComponent {
  @Input() turnos!: Turno[];
}
