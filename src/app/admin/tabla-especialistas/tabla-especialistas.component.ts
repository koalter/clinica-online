import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.scss']
})
export class TablaEspecialistasComponent implements OnInit {

  columnDefs: ColDef[];
  rowData: any[];

  constructor() { 
    this.columnDefs = [
      { field: 'nombre' },
      { field: 'apellido' },
      { field: 'edad' },
      { field: 'dni', headerName: 'DNI' },
      { field: 'especialidad' },
      { field: 'email' }
    ];
    this.rowData = [{
      "nombre": "Heindrick",
      "apellido": "Humber",
      "edad": 52,
      "dni": "712-88-5133",
      "especialidad": "Operator",
      "email": "hhumber0@rediff.com",
      "imagen": "http://dummyimage.com/250x250.png/cc0000/ffffff"
    }, {
      "nombre": "Nollie",
      "apellido": "Hobgen",
      "edad": 40,
      "dni": "726-30-9205",
      "especialidad": "Editor",
      "email": "nhobgen1@technorati.com",
      "imagen": "http://dummyimage.com/250x250.png/ff4444/ffffff"
    }, {
      "nombre": "Ania",
      "apellido": "Rowan",
      "edad": 85,
      "dni": "681-86-8149",
      "especialidad": "Executive Secretary",
      "email": "arowan2@ox.ac.uk",
      "imagen": "http://dummyimage.com/250x250.png/cc0000/ffffff"
    }, {
      "nombre": "Yance",
      "apellido": "Wollrauch",
      "edad": 39,
      "dni": "275-71-3492",
      "especialidad": "Recruiting Manager",
      "email": "ywollrauch3@over-blog.com",
      "imagen": "http://dummyimage.com/250x250.png/dddddd/000000"
    }, {
      "nombre": "Myriam",
      "apellido": "Ellison",
      "edad": 79,
      "dni": "536-89-6767",
      "especialidad": "Analog Circuit Design manager",
      "email": "mellison4@msn.com",
      "imagen": "http://dummyimage.com/250x250.png/cc0000/ffffff"
    }];
  }

  ngOnInit(): void {
  }

}
