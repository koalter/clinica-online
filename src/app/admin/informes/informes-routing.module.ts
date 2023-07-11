import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformesComponent } from './informes.component';
import { GraficosComponent } from './graficos/graficos.component';
import { LogsComponent } from './logs/logs.component';

const routes: Routes = [
  { 
    path: '', 
    component: InformesComponent,
    children: [
      {
        path: 'graficos',
        component: GraficosComponent
      },
      {
        path: 'logs',
        component: LogsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformesRoutingModule { }
