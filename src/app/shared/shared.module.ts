import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';

@NgModule({
  declarations: [
    SpinnerComponent, 
    NavbarComponent, 
    ListaUsuariosComponent
  ],
  imports: [
    CommonModule,
    MdbDropdownModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent, 
    NavbarComponent,
    ListaUsuariosComponent
  ]
})
export class SharedModule { }
