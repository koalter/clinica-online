import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { InformesRoutingModule } from './informes-routing.module';
import { InformesComponent } from './informes.component';
import { LogsComponent } from './logs/logs.component';
import { GraficosComponent } from './graficos/graficos.component';


@NgModule({
  declarations: [
    InformesComponent,
    LogsComponent,
    GraficosComponent
  ],
  imports: [
    CommonModule,
    InformesRoutingModule,
    HighchartsChartModule
  ]
})
export class InformesModule { }
