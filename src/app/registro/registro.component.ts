import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Usuario } from '../shared/domains/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit({ usuario, password, imagenes }: { usuario: Usuario, password: string, imagenes: File[]}) {
    this.authService.registro(usuario, password, imagenes)
    .then(() => {
      this.router.navigateByUrl('/');
    });
  }
}
