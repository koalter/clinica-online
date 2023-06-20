import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './bienvenido.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { 
    path: '', 
    component: BienvenidoComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'turnos',
        loadChildren: () => import('../turnos/turnos.module').then(m => m.TurnosModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidoRoutingModule { }
