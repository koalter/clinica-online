import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoriaClinica } from '../shared/historia-clinica.model';

@Component({
  selector: 'historia-clinica-detalles',
  templateUrl: './historia-clinica-detalles.component.html',
  styleUrls: ['./historia-clinica-detalles.component.scss']
})
export class HistoriaClinicaDetallesComponent {
  @Input() detalles?: HistoriaClinica;

  descargar() {
    console.log("descargar()");
  }
}
