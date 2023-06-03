import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { BienvenidoComponent } from './bienvenido.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';


@NgModule({
  declarations: [
    BienvenidoComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    BienvenidoRoutingModule,
    ReactiveFormsModule,
    MdbTabsModule
  ]
})
export class BienvenidoModule { }
