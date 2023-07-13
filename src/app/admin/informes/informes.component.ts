import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ChildrenOutletContexts } from '@angular/router';
import { openClose, puff } from '../../shared/animations';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
  animations: [
    puff
  ]
})
export class InformesComponent {
  rutas: Routes = [
    {
      path: 'logs',
      title: 'Logs'
    },
    {
      path: 'graficos',
      title: 'Graficos'
    }
  ]

  constructor(private contexts: ChildrenOutletContexts) { }

  manejarAnimaciones() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
