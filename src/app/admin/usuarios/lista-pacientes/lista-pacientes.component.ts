import { Component } from '@angular/core';
import { Paciente } from '../../../shared/domains/usuario.model';
import { AuthService } from '../../../shared/services/auth.service';

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
}
