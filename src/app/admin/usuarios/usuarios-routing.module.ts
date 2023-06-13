import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';

const routes: Routes = [
  {
    path: 'pacientes', component: ListaPacientesComponent
  },
  {
    path: 'especialistas', component: ListaEspecialistasComponent
  },
  {
    path: '', redirectTo: 'pacientes', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
