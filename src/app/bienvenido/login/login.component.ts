import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario: FormGroup;

  get correo() {
    return this.formulario.get('correo');
  }
  set correo(value) {
    this.correo?.setValue(value);
  }

  get clave() {
    return this.formulario.get('clave');
  }
  set clave(value) {
    this.clave?.setValue(value);
  }

  constructor() {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.email, Validators.required]),
      clave: new FormControl('', [Validators.required])
    });
  }

  enviar(): void {
    if (this.formulario.valid) {
      console.log("¡Sesión iniciada!");
    }
  }

}
