import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { TurnosComponent } from './turnos.component';

const routes: Routes = [
  {
    path: 'nuevo',
    component: SolicitarTurnoComponent
  },
  {
    path: '',
    component: TurnosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
