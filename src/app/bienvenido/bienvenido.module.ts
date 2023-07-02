import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { BienvenidoComponent } from './bienvenido.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './perfil/perfil.component'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { FormHistoriaClinicaComponent } from './historia-clinica/form-historia-clinica/form-historia-clinica.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HistoriaClinicaDetallesComponent } from './historia-clinica/historia-clinica-detalles/historia-clinica-detalles.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';

@NgModule({
  declarations: [
    BienvenidoComponent,
    DashboardComponent,
    PerfilComponent,
    HistoriaClinicaComponent,
    FormHistoriaClinicaComponent,
    HistoriaClinicaDetallesComponent,
    ListaPacientesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BienvenidoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module
  ]
})
export class BienvenidoModule { }
