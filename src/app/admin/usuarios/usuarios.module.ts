import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { ListaEspecialistasComponent } from './lista-especialistas/lista-especialistas.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaPacientesComponent,
    ListaEspecialistasComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule
  ]
})
export class UsuariosModule { }
