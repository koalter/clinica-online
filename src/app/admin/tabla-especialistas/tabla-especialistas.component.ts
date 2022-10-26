import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ListadoService } from '../../shared/services/listado.service';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.scss']
})
export class TablaEspecialistasComponent implements OnInit {

  columnDefs: ColDef[];
  rowData!: any[];
  spinner: boolean = true;

  constructor(private listadoService: ListadoService,
    private usuarioService: UsuarioService) { 
    this.listadoService.traerUsuarios('especialista')
      .then(res => {
        this.rowData = res;
        this.spinner = false;
      });

    this.columnDefs = [
      { field: 'activo', valueGetter: params => params.data.activo ? 'Si' : 'No', 
        valueSetter: params => {
          this.spinner = true;
          let resultado: boolean = false;
          if (params.newValue === 'Si') {
            params.data.activo = true;
            resultado = true;
          } else if (params.newValue === 'No') {
            params.data.activo = false;
            resultado = true;
          }
          resultado = false;
          this.usuarioService.actualizarDatos(params.data)
          .then(() => this.spinner = false);
          return resultado;
        },
        editable: true, cellEditor: 'agSelectCellEditor' , cellEditorParams: { values: ['Si', 'No'] } 
      },
      { field: 'nombre' },
      { field: 'apellido' },
      { field: 'edad' },
      { field: 'dni', headerName: 'DNI' },
      { field: 'especialidad' },
      { field: 'correo', headerName: 'Correo Electrónico' },
      { field: 'imagen', headerName: 'Foto de Perfil' }
    ];
  }

  ngOnInit(): void {
  }

}
