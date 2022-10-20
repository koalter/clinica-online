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
  rutaImagen!: string;

  constructor(private usuarioService: UsuarioService) { 
    this.formulario = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.pattern('(^$|^.*@.*\..*$)')]),
      clave: new FormControl('', Validators.required),
      clave_verificacion: new FormControl('', [Validators.required]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
      dni: new FormControl('', [Validators.required, Validators.pattern('[0-9]'), Validators.minLength(7), Validators.maxLength(8)]),
      imagen: new FormControl('', Validators.required)
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

  imagen_change(event: any) {
    if (event.target.files && event.target.files.length) {
      // Chequeamos que el tamaño del archivo sea menor que 25KB
      if (event.target.files[0].size < 25600) {
        const reader = new FileReader();
        this.formulario.get(event.target.id)?.setValue(event.target.files[0]);
        reader.readAsDataURL(this.formulario.get(event.target.id)?.value);
      
        reader.onload = () => {
          this.rutaImagen = reader.result as string;
        };
      }
    }
  }

}
