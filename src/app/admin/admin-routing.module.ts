import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { TablaPacientesComponent } from './tabla-pacientes/tabla-pacientes.component';
import { TablaEspecialistasComponent } from './tabla-especialistas/tabla-especialistas.component';
import { AdminGuard } from './admin.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'registro', component: RegistroAdministradorComponent },
      { path: 'pacientes', component: TablaPacientesComponent },
      { path: 'especialistas', component: TablaEspecialistasComponent }
    ],
    canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
