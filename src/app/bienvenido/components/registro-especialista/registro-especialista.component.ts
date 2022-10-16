import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {

  formulario: FormGroup;

  constructor() { 
    this.formulario = new FormGroup({
      correo: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
      claveVerificacion: new FormControl('', [Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      especialidad: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  enviarCredenciales(): void {
    console.log('enviarCredenciales()');
  }
  
}
