import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { BienvenidoComponent } from './bienvenido.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component'; 
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BienvenidoComponent,
    DashboardComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BienvenidoRoutingModule,
    FormsModule
  ]
})
export class BienvenidoModule { }
