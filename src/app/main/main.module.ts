import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { VerificarUsuarioComponent } from './verificar-usuario/verificar-usuario.component';


@NgModule({
  declarations: [
    VerificarUsuarioComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
