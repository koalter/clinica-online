import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  spinner: boolean = false;
  email: string

  constructor(private usuarioService: UsuarioService,
              private router: Router) {
    this.email = this.usuarioService.usuario.email;
  }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.spinner = true;
    this.usuarioService.cerrarSesion()
    .then(() => {
      this.router.navigate(['bienvenido', 'login']);
    })
    .finally(() => this.spinner = false);
  }
}
