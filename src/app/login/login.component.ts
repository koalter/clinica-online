import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formulario: FormGroup;

  get correo() {
    return this.formulario.get('correo')!;
  }

  get clave() {
    return this.formulario.get('clave')!;
  }

  constructor(private authService: AuthService, private router: Router) {
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.email, Validators.required]),
      clave: new FormControl('', [Validators.required])
    });
  }

  enviar(): void {
    if (this.formulario.valid) {
      this.authService.login(this.correo.value, this.clave.value)
      .then(() => {
        this.router.navigateByUrl('/');
      });
    }
  }

}
