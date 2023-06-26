import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosPacienteComponent } from './turnos-paciente/turnos-paciente.component';
import { TurnosEspecialistaComponent } from './turnos-especialista/turnos-especialista.component';
import { TurnosAdministradorComponent } from './turnos-administrador/turnos-administrador.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TurnosComponent } from './turnos.component';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { AccionesEspecialistaComponent } from './turnos-especialista/acciones-especialista/acciones-especialista.component';
import { AccionesPacienteComponent } from './turnos-paciente/acciones-paciente/acciones-paciente.component';
import { AccionesAdministradorComponent } from './turnos-administrador/acciones-administrador/acciones-administrador.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    TurnosPacienteComponent,
    TurnosEspecialistaComponent,
    TurnosAdministradorComponent,
    SolicitarTurnoComponent,
    TurnosComponent,
    AccionesEspecialistaComponent,
    AccionesPacienteComponent,
    AccionesAdministradorComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    ReactiveFormsModule,
    MdbDropdownModule,
    SweetAlert2Module
  ]
})
export class TurnosModule { }
