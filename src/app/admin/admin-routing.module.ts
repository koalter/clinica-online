import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {canActivate, redirectUnauthorizedTo} from "@angular/fire/auth-guard";
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { AdminComponent } from './admin.component';
import { TablaPacientesComponent } from './tabla-pacientes/tabla-pacientes.component';
import { TablaEspecialistasComponent } from './tabla-especialistas/tabla-especialistas.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    ...canActivate(() => redirectUnauthorizedTo('bienvenido/login')),
    children: [
      { path: 'registro', component: RegistroAdministradorComponent },
      { path: 'pacientes', component: TablaPacientesComponent },
      { path: 'especialistas', component: TablaEspecialistasComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
