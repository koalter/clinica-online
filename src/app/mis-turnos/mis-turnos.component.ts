import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  spinner: boolean = true;
  usuario!: Usuario | null;

  constructor(private usuarioService: UsuarioService,
              private router: Router) { 
    this.usuarioService.obtenerDatosDeUsuario()
    .then(u => {
      this.usuario = u;
      this.spinner = false;
    });
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
