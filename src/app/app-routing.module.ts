import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bienvenido',
    loadChildren: () => import('./bienvenido/bienvenido.module').then(m => m.BienvenidoModule),
    ...canActivate(() => redirectLoggedInTo('mis-turnos'))
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    ...canActivate(() => redirectUnauthorizedTo('bienvenido'))
  },
  { 
    path: '', 
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    ...canActivate(() => redirectUnauthorizedTo('bienvenido'))
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
