import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Usuario } from './models/Usuario';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lnck-clinica-online';
  spinner: boolean = true;
  usuario!: Usuario | null;
  links!: any[];

  constructor(private auth: Auth,
    private usuarioService: UsuarioService,
    private router: Router) {
    this.auth.onAuthStateChanged(user => {
      this.spinner = true;
      this.usuarioService.usuario = user;
      this.usuarioService.obtenerDatosDeUsuario()
      .then(u => {
        this.usuario = u;
        
        if (this.usuario) {
          if (this.usuario.rol === 'administrador') {
            this.links = [
              { clave: 'Pacientes', valor: '/admin/pacientes' },
              { clave: 'Especialista', valor: '/admin/especialistas' },
              { clave: 'Nuevo administrador', valor: '/admin/registro' }
            ];
          }
        }
        
        this.spinner = false;
      });
    });
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
