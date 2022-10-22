import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from '../../../models/Paciente';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit {

  formulario: FormGroup;
  spinner: boolean = false;
  rutaImagenA: string;
  rutaImagenB: string;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { 
    this.rutaImagenA = '../../../../assets/default.jpg'; 
    this.rutaImagenB = this.rutaImagenA;

    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('(^$|^.*@.*\..*$)')]),
      clave: new FormControl('', Validators.required),
      clave_verificacion: new FormControl('', [Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(7), Validators.maxLength(8)]),
      obra_social: new FormControl('', Validators.required),
      imagen_a: new FormControl(undefined, Validators.required),
      imagen_b: new FormControl(undefined, Validators.required)
    });
    
  }

  ngOnInit(): void {
  }

  enviarCredenciales(): void {
    if (this.formulario.valid) {
      this.spinner = true;
      const usuario = new Paciente(this.formulario.get('correo')?.value, this.formulario.get('nombre')?.value,
      this.formulario.get('apellido')?.value, this.formulario.get('edad')?.value, this.formulario.get('dni')?.value,
      this.formulario.get('imagen_a')?.value, this.formulario.get('imagen_b')?.value, this.formulario.get('obra_social')?.value);
  
      this.usuarioService.registrarUsuario(usuario, this.formulario.get('clave')?.value)
      .then(res => {
        this.router.navigate(['bienvenido']);
      })
      .catch(err => console.error(err))
      .finally(() => this.spinner = false);
      
    }
    else {
      console.log(this.formulario);
    }
  }

  imagenA_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    
    if (event.target.files && event.target.files.length
      && archivo.size < 25 * 1024) {
      const reader = new FileReader();
      this.formulario.get(elementoId)?.setValue(archivo);
      reader.readAsDataURL(this.formulario.get(elementoId)?.value);
    
      reader.onload = () => {
        this.rutaImagenA = reader.result as string;
      };
    } else {
      event.target.value = '';
    }
  }

  imagenB_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    
    if (event.target.files && event.target.files.length
      && archivo.size < 25 * 1024) {
      const reader = new FileReader();
      this.formulario.get(elementoId)?.setValue(archivo);
      reader.readAsDataURL(this.formulario.get(elementoId)?.value);
    
      reader.onload = () => {
        this.rutaImagenB = reader.result as string;
      };
    } else {
      event.target.value = '';
    }
  }

  validarNumero(event: KeyboardEvent): void {
    if (isNaN(parseInt(event.key)) && event.key !== 'Tab' && event.key !== 'Escape' 
      && event.key !== 'Backspace' && event.key !== 'Delete' && !event.key.includes('Arrow')) {
      event.preventDefault();
    }
  }

}
