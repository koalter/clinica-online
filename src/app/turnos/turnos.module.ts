import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { TurnosAdministradorComponent } from './turnos-administrador/turnos-administrador.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TurnosComponent } from './turnos.component';


@NgModule({
  declarations: [
    TurnosPacienteComponent,
    TurnosEspecialistaComponent,
    TurnosAdministradorComponent,
    SolicitarTurnoComponent,
    TurnosComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    ReactiveFormsModule
  ]
})
export class TurnosModule { }
