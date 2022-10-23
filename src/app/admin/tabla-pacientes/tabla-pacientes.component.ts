import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ListadoService } from 'src/app/shared/services/listado.service';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss']
})
export class TablaPacientesComponent implements OnInit {

  columnDefs: ColDef[];
  rowData!: any[];

  constructor(private listadoService: ListadoService) { 
    this.listadoService.traerUsuarios('paciente')
    .then(res => this.rowData = res);
    this.columnDefs = [
      { field: 'nombre' },
      { field: 'apellido' },
      { field: 'edad' },
      { field: 'dni', headerName: 'DNI' },
      { field: 'obraSocial', headerName: 'Obra Social' },
      { field: 'correo', headerName: 'Correo Electrónico' },
      { field: 'imagen' },
      { field: 'imagen_b' }
    ];
  }

  ngOnInit(): void {
  }

}
