import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
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
