import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroAdminComponent } from './usuarios/registro-admin/registro-admin.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { FormAdminComponent } from './form-admin/form-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';


@NgModule({
  declarations: [
    AdminComponent,
    UsuariosComponent,
    RegistroAdminComponent,
    FormAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MdbTabsModule,
    MdbFormsModule,
    MdbValidationModule
  ]
})
export class AdminModule { }
