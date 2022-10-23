import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { MdbCollapseModule } from "mdb-angular-ui-kit/collapse";

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from "../shared/shared.module";
import { TablaPacientesComponent } from './tabla-pacientes/tabla-pacientes.component';
import { TablaEspecialistasComponent } from './tabla-especialistas/tabla-especialistas.component';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { AdminComponent } from './admin.component';
import { AgGridModule } from 'ag-grid-angular';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';


@NgModule({
  declarations: [
    AdminComponent,
    TablaPacientesComponent,
    TablaEspecialistasComponent,
    RegistroAdministradorComponent
  ],
  imports: [
    CommonModule,
    MdbCollapseModule,
    MdbDropdownModule,
    AgGridModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
