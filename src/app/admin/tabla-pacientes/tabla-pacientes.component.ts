import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss']
})
export class TablaPacientesComponent implements OnInit {

  columnDefs: ColDef[];
  rowData: any[];

  constructor() { 
    this.columnDefs = [
      { field: 'nombre' },
      { field: 'apellido' },
      { field: 'edad' },
      { field: 'dni', headerName: 'DNI' },
      { field: 'obra_social', headerName: 'Obra Social' },
      { field: 'email' }
    ];
    this.rowData = [{
      "nombre": "Druci",
      "apellido": "Bone",
      "edad": 58,
      "dni": "737-58-4728",
      "obra_social": "Bergnaum-Turcotte",
      "email": "dbone0@stanford.edu",
      "imagen_a": "http://dummyimage.com/250x250/5fa2dd/ffffff",
      "imagen_b": "http://dummyimage.com/250x250/cc0000/ffffff"
    }, {
      "nombre": "Enoch",
      "apellido": "Bosnell",
      "edad": 96,
      "dni": "651-31-1968",
      "obra_social": "Batz Inc",
      "email": "ebosnell1@hud.gov",
      "imagen_a": "http://dummyimage.com/250x250/dddddd/000000",
      "imagen_b": "http://dummyimage.com/250x250/cc0000/ffffff"
    }, {
      "nombre": "Celine",
      "apellido": "Tommis",
      "edad": 36,
      "dni": "294-24-7595",
      "obra_social": "O'Kon-Funk",
      "email": "ctommis2@miibeian.gov.cn",
      "imagen_a": "http://dummyimage.com/250x250/5fa2dd/ffffff",
      "imagen_b": "http://dummyimage.com/250x250/cc0000/ffffff"
    }, {
      "nombre": "Philomena",
      "apellido": "Lickess",
      "edad": 68,
      "dni": "477-80-3983",
      "obra_social": "Wilderman-Baumbach",
      "email": "plickess3@shinystat.com",
      "imagen_a": "http://dummyimage.com/250x250/dddddd/000000",
      "imagen_b": "http://dummyimage.com/250x250/cc0000/ffffff"
    }, {
      "nombre": "Rosina",
      "apellido": "Lockie",
      "edad": 25,
      "dni": "232-83-8748",
      "obra_social": "Farrell, Wilkinson and Volkman",
      "email": "rlockie4@independent.co.uk",
      "imagen_a": "http://dummyimage.com/250x250/dddddd/000000",
      "imagen_b": "http://dummyimage.com/250x250/dddddd/000000"
    }];
  }

  ngOnInit(): void {
  }

}
