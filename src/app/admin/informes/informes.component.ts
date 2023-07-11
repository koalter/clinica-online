import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
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
}
