import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { VerificarUsuarioComponent } from './verificar-usuario/verificar-usuario.component';
import { SolicitarTurnoComponent } from './solicitar-turno/solicitar-turno.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    VerificarUsuarioComponent,
    SolicitarTurnoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
