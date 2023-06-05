import { Component } from '@angular/core';
import { Usuario } from '../shared/domains/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  registrarUsuario(usuario: Usuario) {
    console.info(usuario);
  }
}
