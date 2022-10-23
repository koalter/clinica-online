import { NgModule } from '@angular/core';
import { AuthPipe, canActivate, emailVerified } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { map, pipe } from 'rxjs';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { VerificarUsuarioComponent } from './verificar-usuario/verificar-usuario.component';

const routes: Routes = [
  {
    path: 'mis-turnos',
    component: MisTurnosComponent,
    ...canActivate(() => redirectUnverifiedTo('verificar-usuario'))
  },
  {
    path: 'verificar-usuario',
    component: VerificarUsuarioComponent,
    ...canActivate(() => redirectVerifiedTo('mis-turnos'))
  },
  {
    path: '',
    redirectTo: 'mis-turnos',
    pathMatch: 'full'
  }
];

const redirectUnverifiedTo: (redirect: string | any[]) => AuthPipe = 
  (redirect) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
const redirectVerifiedTo: (redirect: string|any[]) => AuthPipe =
  (redirect) => pipe(emailVerified, map(emailVerified => emailVerified && redirect || true));
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
