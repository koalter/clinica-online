import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { EspecialidadValidator } from '../../validators/especialidad.validator';
import { Especialista } from '../../domains/usuario.model';

@Component({
  selector: 'form-especialista',
  templateUrl: './form-especialista.component.html',
  styleUrls: ['./form-especialista.component.scss']
})
export class FormEspecialistaComponent {
  @Output() submit: EventEmitter<Especialista> = new EventEmitter<Especialista>();
  formulario: FormGroup;
  rutaImagen: string;
  especialidades: string[] = [
    'Pediatría',
    'Otorrinolaringología',
    'Oftalmología',
    'Urología',
    'Otra'
  ];


  constructor(private fb: FormBuilder) {
    this.rutaImagen = '../../../../assets/default.jpg';
    
    this.formulario = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      edad: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      dni: [null, [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(7), Validators.maxLength(8)]],
      especialidad: [null, Validators.required],
      otraEspecialidad: [null],
      mail: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      password2: [null, Validators.required],
      imagen: [undefined, Validators.required]
    });

    this.password2.addValidators(PasswordValidator.match(this.password));
    this.otraEspecialidad.addValidators(EspecialidadValidator.otraEspecialidad(this.especialidad));
  }

  get nombre(): AbstractControl {
    return this.formulario.get('nombre')!;
  }

  get apellido(): AbstractControl {
    return this.formulario.get('apellido')!;
  }

  get edad(): AbstractControl {
    return this.formulario.get('edad')!;
  }

  get dni(): AbstractControl {
    return this.formulario.get('dni')!;
  }
  
  get especialidad(): AbstractControl {
    return this.formulario.get('especialidad')!;
  }

  get otraEspecialidad(): AbstractControl {
    return this.formulario.get('otraEspecialidad')!;
  }

  get mail(): AbstractControl {
    return this.formulario.get('mail')!;
  }

  get password(): AbstractControl {
    return this.formulario.get('password')!;
  }

  get password2(): AbstractControl {
    return this.formulario.get('password2')!;
  }

  get imagen(): AbstractControl {
    return this.formulario.get('imagen')!;
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const usuario = new Especialista(this.nombre.value, this.apellido.value, this.edad.value, 
        this.dni.value, this.mail.value, this.password.value, this.imagen.value, 
        this.especialidad.value === 'Otra' ? this.otraEspecialidad.value : this.especialidad.value);

      this.submit.emit(usuario);
    }
  }

  imagen_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    
    if (event.target.files && event.target.files.length
      && archivo.size < 50 * 1024) {
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
