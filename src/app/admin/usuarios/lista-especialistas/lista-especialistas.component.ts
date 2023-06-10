import { Component } from '@angular/core';
import { Especialista } from '../../../shared/domains/usuario.model';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-lista-especialistas',
  templateUrl: './lista-especialistas.component.html',
  styleUrls: ['./lista-especialistas.component.scss']
})
export class ListaEspecialistasComponent {
  usuarios!: Especialista[];

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.authService.getEspecialistas()
      .then(res => {
        this.usuarios = res;
        console.log(this.usuarios);
      });
  }

  updateAcceso(usuario: Especialista, estado: boolean) {
    this.authService.habilitarODeshabilitarEspecialista(usuario, estado)
      .then(estado => usuario.habilitado = estado);
  }
}
