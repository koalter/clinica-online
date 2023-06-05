import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  rutas: Routes = [
    { path: 'usuarios', title: 'Usuarios' },
    { path: 'usuarios/nuevo', title: 'Nuevo usuario' }
  ];
}
