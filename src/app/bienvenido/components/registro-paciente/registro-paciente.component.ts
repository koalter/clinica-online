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
  rutaImagenA!: string;
  rutaImagenB!: string;

  constructor(private usuarioService: UsuarioService,
    private router: Router) { 
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('(^$|^.*@.*\..*$)')]),
      clave: new FormControl('', Validators.required),
      clave_verificacion: new FormControl('', [Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]'), Validators.minLength(7), Validators.maxLength(8)]),
      obra_social: new FormControl('', Validators.required),
      imagen_a: new FormControl('', Validators.required),
      imagen_b: new FormControl('', Validators.required)
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

  imagenA_change(event: any) {
    if (event.target.files && event.target.files.length) {
      // Chequeamos que el tamaño del archivo sea menor que 25KB
      if (event.target.files[0].size < 25600) {
        const reader = new FileReader();
        this.formulario.get(event.target.id)?.setValue(event.target.files[0]);
        reader.readAsDataURL(this.formulario.get(event.target.id)?.value);
      
        reader.onload = () => {
          this.rutaImagenA = reader.result as string;
        };
      }
    }
  }

  imagenB_change(event: any) {
    if (event.target.files && event.target.files.length) {
      // Chequeamos que el tamaño del archivo sea menor que 25KB
      if (event.target.files[0].size < 25600) {
        const reader = new FileReader();
        this.formulario.get(event.target.id)?.setValue(event.target.files[0]);
        reader.readAsDataURL(this.formulario.get(event.target.id)?.value);
      
        reader.onload = () => {
          this.rutaImagenB = reader.result as string;
        };
      }
    }
  }

}
