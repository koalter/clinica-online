import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { HeaderComponent } from './components/header/header.component';
import { FormPacienteComponent } from './components/form-paciente/form-paciente.component';
import { FormEspecialistaComponent } from './components/form-especialista/form-especialista.component';
import { ButtonVolverComponent } from './components/button-volver/button-volver.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FormPacienteComponent,
    FormEspecialistaComponent,
    ButtonVolverComponent
  ],
  imports: [
    CommonModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbValidationModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FormPacienteComponent,
    FormEspecialistaComponent,
    ButtonVolverComponent
  ]
})
export class SharedModule { }
