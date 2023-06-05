import { Component } from '@angular/core';
import { Usuario } from '../../../shared/domains/usuario.model';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent {
  registrarUsuario(usuario: Usuario) {
    console.info(usuario);
  }
}
