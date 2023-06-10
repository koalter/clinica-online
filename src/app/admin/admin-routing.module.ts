import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RegistroAdminComponent } from './usuarios/registro-admin/registro-admin.component';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
      { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
      { path: 'alta', component: RegistroAdminComponent },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
