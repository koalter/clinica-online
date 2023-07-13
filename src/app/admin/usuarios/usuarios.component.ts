import { Component } from '@angular/core';
import { ChildrenOutletContexts, Routes } from '@angular/router';
import { slideInBck } from '../../shared/animations';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [
    slideInBck
  ]
})
export class UsuariosComponent {
  rutas: Routes = [
    { path: 'pacientes', title: 'Pacientes' },
    { path: 'especialistas', title: 'Especialistas' },
    { path: 'alta', title: 'Nuevo usuario' }
  ];

  constructor(private contexts: ChildrenOutletContexts) { }

  manejarAnimaciones() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
