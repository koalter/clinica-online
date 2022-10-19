import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {

  formulario: FormGroup;
  spinner: boolean = false;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { 
    this.formulario = new FormGroup({
      'correo': new FormControl('', [Validators.required, Validators.pattern('(^$|^.*@.*\..*$)')]),
      'clave': new FormControl('', Validators.required),
      'claveVerificacion': new FormControl('', [Validators.required]),
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'edad': new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      'dni': new FormControl('', [Validators.required, Validators.pattern('[0-9]'), Validators.minLength(7), Validators.maxLength(8)]),
      'obraSocial': new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  enviarCredenciales(): void {
    if (this.formulario.valid) {
      this.spinner = true;
      const correo = this.formulario.get('correo')?.value;
      const clave = this.formulario.get('clave')?.value;
  
      if (correo && clave) {
        this.usuarioService.registrarUsuario(correo, clave)
        .then(res => {
          this.router.navigate(['bienvenido']);
        })
        .catch(err => console.error(err))
        .finally(() => this.spinner = false);
      }
    }
    else {
      console.log(this.formulario);
    }
  }

}
