import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent {

  usuario!: User | null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUsuario(user => {
      this.usuario = user;
    });
  }

  logout() {
    this.authService.logout()
    .then(() => {
      this.router.navigateByUrl('login');
    });
  }
}
