import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { BienvenidoComponent } from './bienvenido.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroEspecialistaComponent } from './components/registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './components/registro-paciente/registro-paciente.component';

const routes: Routes = [
  { path: '', component: BienvenidoComponent, ...canActivate(() => redirectUnauthorizedTo('bienvenido/login')) },
  { path: 'login', component: LoginComponent, ...canActivate(() => redirectLoggedInTo('bienvenido')) },
  { path: 'registro/paciente', component: RegistroPacienteComponent, ...canActivate(() => redirectLoggedInTo('bienvenido')) },
  { path: 'registro/especialista', component: RegistroEspecialistaComponent, ...canActivate(() => redirectLoggedInTo('bienvenido')) },
  { path: 'registro', redirectTo: 'registro/paciente', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidoRoutingModule { }
