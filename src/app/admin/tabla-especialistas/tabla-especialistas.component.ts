import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ListadoService } from 'src/app/shared/services/listado.service';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.scss']
})
export class TablaEspecialistasComponent implements OnInit {

  columnDefs: ColDef[];
  rowData!: any[];

  constructor(private listadoService: ListadoService) { 
    this.listadoService.traerUsuarios('especialista')
      .then(res => this.rowData = res);

    this.columnDefs = [
      { field: 'nombre' },
      { field: 'apellido' },
      { field: 'edad' },
      { field: 'dni', headerName: 'DNI' },
      { field: 'especialidad' },
      { field: 'correo', headerName: 'Correo Electrónico' },
      { field: 'imagen' }
    ];
  }

  ngOnInit(): void {
  }

}
