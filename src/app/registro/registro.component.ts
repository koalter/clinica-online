import { Component } from '@angular/core';
import { Usuario } from '../shared/domains/usuario.model';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  constructor(private authService: AuthService, private router: Router) {}

  registrarUsuario(usuario: Usuario) {
    if (usuario != null) {
      this.authService.registro(usuario).then(() => this.router.navigateByUrl('/'));
    }
  }
}
