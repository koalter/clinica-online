import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { FormPacienteComponent } from '../shared/components/form-paciente/form-paciente.component';
import { FormEspecialistaComponent } from '../shared/components/form-especialista/form-especialista.component';

const routes: Routes = [
  { 
    path: '', 
    component: RegistroComponent,
    children: [
      {
        path: 'paciente',
        component: FormPacienteComponent
      },
      {
        path: 'especialista',
        component: FormEspecialistaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
