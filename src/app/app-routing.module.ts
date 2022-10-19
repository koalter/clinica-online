import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bienvenido',
    loadChildren: () => import('./bienvenido/bienvenido.module').then(m => m.BienvenidoModule)
  },
  { path: '', redirectTo: 'bienvenido', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
