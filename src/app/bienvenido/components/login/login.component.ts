import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  correo!: string;
  clave!: string;

  constructor() { }

  ngOnInit(): void {
  }

  enviarCredenciales(): void {
    console.log(`usuario: ${this.correo} clave: ${this.clave}`);
  }

  usarDatosDePrueba(correo: string, clave: string): void {
    this.correo = correo;
    this.clave = clave;
  }
}
