import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  rutas: Routes = [
    { path: 'pacientes', title: 'Pacientes' },
    { path: 'especialistas', title: 'Especialistas' },
    { path: 'alta', title: 'Nuevo usuario' }
  ];
}
