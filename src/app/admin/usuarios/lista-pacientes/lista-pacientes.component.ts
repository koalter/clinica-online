import { Component } from '@angular/core';
import { Paciente } from '../../../shared/domains/usuario.model';
import { AuthService } from '../../../shared/services/auth.service';
import { ArchivoService } from '../../../shared/services/archivo.service';

@Component({
  selector: 'lista-pacientes',
  templateUrl: './lista-pacientes.component.html',
  styleUrls: ['./lista-pacientes.component.scss']
})
export class ListaPacientesComponent {
  usuarios!: Paciente[];

  constructor(private authService: AuthService,
    private archivoService: ArchivoService) {}
  
  ngOnInit(): void {
    this.authService.getPacientes()
      .then(res => {
        this.usuarios = res;
      });
  }

  exportar(): void {
    this.archivoService.exportarXLS('pacientes', this.usuarios);
  }
}
