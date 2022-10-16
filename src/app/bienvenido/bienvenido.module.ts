import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroEspecialistaComponent } from './components/registro-especialista/registro-especialista.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroPacienteComponent,
    RegistroEspecialistaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BienvenidoRoutingModule
  ]
})
export class BienvenidoModule { }
