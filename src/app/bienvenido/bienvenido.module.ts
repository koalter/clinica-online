import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { BienvenidoComponent } from './bienvenido.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { FormPacienteComponent } from './registro/form-paciente/form-paciente.component';
import { FormEspecialistaComponent } from './registro/form-especialista/form-especialista.component';


@NgModule({
  declarations: [
    BienvenidoComponent,
    LoginComponent,
    RegistroComponent,
    FormPacienteComponent,
    FormEspecialistaComponent
  ],
  imports: [
    CommonModule,
    BienvenidoRoutingModule,
    ReactiveFormsModule,
    MdbTabsModule,
    MdbFormsModule,
    MdbValidationModule
  ]
})
export class BienvenidoModule { }
