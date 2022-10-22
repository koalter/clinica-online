import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/shared/helpers/custom-validators';
import { Especialista } from '../../../models/Especialista';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.scss']
})
export class RegistroEspecialistaComponent implements OnInit {

  formulario: FormGroup;
  spinner: boolean = false;
  rutaImagen: string;

  constructor(private usuarioService: UsuarioService,
    private router: Router) {
    this.rutaImagen = '../../../../assets/default.jpg';

    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('(^$|^.*@.*\..*$)')]),
      clave: new FormControl('', Validators.required),
      clave_verificacion: new FormControl(''),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]'), Validators.minLength(7), Validators.maxLength(8)]),
      especialidad: new FormControl('', Validators.required),
      imagen: new FormControl(undefined, Validators.required)
    });

    this.formulario.controls['clave_verificacion'].addValidators(
      CustomValidators.confirmFormControl(this.formulario.controls['clave']));
  }

  ngOnInit(): void {
  }

  enviarCredenciales(): void {
    if (this.formulario.valid) {
      this.spinner = true;
      const usuario = new Especialista(this.formulario.get('correo')?.value, this.formulario.get('nombre')?.value,
      this.formulario.get('apellido')?.value, this.formulario.get('edad')?.value, this.formulario.get('dni')?.value,
      this.formulario.get('imagen')?.value, this.formulario.get('especialidad')?.value);
  
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

  imagen_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    
    if (event.target.files && event.target.files.length
      && archivo.size < 25 * 1024) {
      const reader = new FileReader();
      this.formulario.get(elementoId)?.setValue(archivo);
      reader.readAsDataURL(this.formulario.get(elementoId)?.value);
    
      reader.onload = () => {
        this.rutaImagen = reader.result as string;
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
