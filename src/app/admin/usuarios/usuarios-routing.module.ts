import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { UsuariosComponent } from './usuarios.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { HistoriaClinicaComponent } from '../../bienvenido/historia-clinica/historia-clinica.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      {
        path: 'pacientes', component: ListaPacientesComponent, data: { animation: 'pacientes' }
      },
      {
        path: 'pacientes/historia', component: HistoriaClinicaComponent, data: { animation: 'pacientes-historia' }
      },
      {
        path: 'especialistas', component: ListaEspecialistasComponent, data: { animation: 'especialistas' }
      },
      {
        path: 'alta', component: RegistroAdminComponent, data: { animation: 'alta' }
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
