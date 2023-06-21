import { Component } from '@angular/core';
import { Paciente } from '../../../shared/domains/usuario.model';
import { AuthService } from '../../../shared/services/auth.service';
import { utils, writeFile } from 'xlsx';

@Component({
  selector: 'lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  usuarios!: Paciente[];

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.getPacientes()
      .then(res => {
        this.usuarios = res;
      });
  }

  exportar(): void {
    const worksheet = utils.json_to_sheet(this.usuarios);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet);
    writeFile(workbook, 'pacientes.xlsx', { compression: true });
  }
}
