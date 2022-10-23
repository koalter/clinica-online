import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';
import { RegistroEspecialistaComponent } from './components/registro-especialista/registro-especialista.component';
import { BienvenidoComponent } from './bienvenido.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    BienvenidoComponent,
    LoginComponent,
    RegistroPacienteComponent,
    RegistroEspecialistaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BienvenidoRoutingModule
  ]
})
export class BienvenidoModule { }
