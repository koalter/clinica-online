import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/shared.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RegistroAdminComponent } from './usuarios/registro-admin/registro-admin.component';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';


@NgModule({
  declarations: [
    AdminComponent,
    UsuariosComponent,
    RegistroAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MdbTabsModule
  ]
})
export class AdminModule { }
