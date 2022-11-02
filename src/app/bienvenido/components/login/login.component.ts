import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo!: string;
  clave!: string;
  spinner: boolean = false;
  usuarios!: Usuario[];

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.traerUsuariosDePrueba()
    .then(res => {
      this.usuarios = res;
      console.log(this.usuarios);
    });

  }

  enviarCredenciales(): void {
    this.spinner = true;
    this.usuarioService.iniciarSesion(this.correo, this.clave)
    .then(res => {
      this.usuarioService.obtenerDatosDeUsuario()
      .then(usuario => {
        if (usuario) {
          if (usuario['rol'] === 'administrador') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['mis-turnos']);
          }
        }
      });
    })
    .catch(err => console.error(err))
    .finally(() => this.spinner = false);
  }

  usarDatosDePrueba(correo: string, clave: string): void {
    this.correo = correo;
    this.clave = clave;
  }
 
  onSeleccionar(usuario: any) {
    this.usarDatosDePrueba(usuario.Correo.trim(), usuario.Rol.trim());
    console.log(this.correo, this.clave);
  }
}
