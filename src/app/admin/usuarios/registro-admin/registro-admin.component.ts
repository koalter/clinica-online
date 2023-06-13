import { Component } from '@angular/core';
import { Usuario } from '../../../shared/domains/usuario.model';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.scss']
})
export class RegistroAdminComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit({ usuario, password, imagenes }: { usuario: Usuario, password: string, imagenes: File[]}) {
    this.authService.registro(usuario, password, imagenes)
    .then(() => {
      this.router.navigateByUrl('/admin');
    });
  }
}
