import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { BienvenidoComponent } from './bienvenido.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component'; 

@NgModule({
  declarations: [
    BienvenidoComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BienvenidoRoutingModule
  ]
})
export class BienvenidoModule { }
