import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { UsuariosComponent } from './usuarios.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      {
        path: 'pacientes', component: ListaPacientesComponent
      },
      {
        path: 'especialistas', component: ListaEspecialistasComponent
      },
      {
        path: 'alta', component: RegistroAdminComponent
      },
      {
        path: '', redirectTo: 'pacientes', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
