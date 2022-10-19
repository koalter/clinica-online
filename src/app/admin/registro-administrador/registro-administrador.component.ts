import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.scss']
})
export class RegistroAdministradorComponent implements OnInit {

  formulario: FormGroup;
  spinner: boolean = false;

  constructor(private usuarioService: UsuarioService) { 
    this.formulario = new FormGroup({
      'correo': new FormControl('', [Validators.required, Validators.pattern('(^$|^.*@.*\..*$)')]),
      'clave': new FormControl('', Validators.required),
      'claveVerificacion': new FormControl('', [Validators.required]),
      'nombre': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),
      'edad': new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      'dni': new FormControl('', [Validators.required, Validators.pattern('[0-9]'), Validators.minLength(7), Validators.maxLength(8)])
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
        .catch(err => console.error(err))
        .finally(() => this.spinner = false);
      }
    }
    else {
      console.log(this.formulario);
    }
  }
}
