import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroAdminComponent } from './usuarios/registro-admin/registro-admin.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    children: [
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/nuevo', component: RegistroAdminComponent },
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
