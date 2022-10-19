import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo!: string;
  clave!: string;
  spinner: boolean = false;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  enviarCredenciales(): void {
    this.spinner = true;
    this.usuarioService.iniciarSesion(this.correo, this.clave)
    .then(res => {
      this.router.navigate(['bienvenido']);
    })
    .catch(err => console.error(err))
    .finally(() => this.spinner = false);
  }

  usarDatosDePrueba(correo: string, clave: string): void {
    this.correo = correo;
    this.clave = clave;
  }
}
