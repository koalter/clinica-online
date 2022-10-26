import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    SpinnerComponent, 
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MdbDropdownModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent, 
    NavbarComponent
  ]
})
export class SharedModule { }
