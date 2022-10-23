import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';

const routes: Routes = [
  {
    path: 'bienvenido',
    loadChildren: () => import('./bienvenido/bienvenido.module').then(m => m.BienvenidoModule),
    ...canActivate(() => redirectLoggedInTo('mis-turnos'))
  },
  {
    path: 'mis-turnos',
    component: MisTurnosComponent,
    ...canActivate(() => redirectUnauthorizedTo('bienvenido'))
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    ...canActivate(() => redirectUnauthorizedTo('bienvenido'))
  },
  { path: '', redirectTo: 'bienvenido', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
