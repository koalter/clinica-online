import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroEspecialistaComponent } from './components/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro/paciente', component: RegistroPacienteComponent },
  { path: 'registro/especialista', component: RegistroEspecialistaComponent },
  { path: 'registro', redirectTo: 'registro/paciente', pathMatch: 'full' },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BienvenidoRoutingModule { }
