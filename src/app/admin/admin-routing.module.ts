import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
      { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'informes', loadChildren: () => import('./informes/informes.module').then(m => m.InformesModule) },
      { path: '', component: DashboardComponent }
    ],
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
