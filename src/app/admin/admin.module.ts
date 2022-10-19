import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from "../shared/shared.module";
import { MdbCollapseModule } from "mdb-angular-ui-kit/collapse";
import { UsuariosComponent } from "./usuarios/usuarios.component";


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    MdbCollapseModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
