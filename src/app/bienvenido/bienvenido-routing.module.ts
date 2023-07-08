import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './bienvenido.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { FormHistoriaClinicaComponent } from './historia-clinica/form-historia-clinica/form-historia-clinica.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';

const routes: Routes = [
  { 
    path: '', 
    component: BienvenidoComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { animation: 'dashboard' }
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { animation: 'perfil' }
      },
      {
        path: 'historia',
        component: HistoriaClinicaComponent
      },
      {
        path: 'historia/nueva',
        component: FormHistoriaClinicaComponent
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'turnos',
        loadChildren: () => import('../turnos/turnos.module').then(m => m.TurnosModule),
        data: { animation: 'turnos' }
      },
      {
        path: 'pacientes',
        component: ListaPacientesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidoRoutingModule { }
