import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { RegistroComponent } from './registro.component';
import { RegistroRoutingModule } from './registro-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegistroRoutingModule,
    MdbTabsModule
  ]
})
export class RegistroModule { }
