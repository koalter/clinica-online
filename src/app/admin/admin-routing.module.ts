import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    data: { animation: 'admin' },
    children: [
      {
        path: 'usuarios',
        loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
        data: { animation: 'usuarios' }
      },
      { 
        path: 'informes', 
        loadChildren: () => import('./informes/informes.module').then(m => m.InformesModule),
        data: { animation: 'informes' }
      },
      { 
        path: '', 
        component: DashboardComponent,
        data: { animation: 'dashboard' } 
      }
    ],
    canActivate: [AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
