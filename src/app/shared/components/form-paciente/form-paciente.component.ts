import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { PasswordValidator } from '../../validators/password.validator';
import { Paciente } from '../../domains/usuario.model';

@Component({
  selector: 'form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.scss']
})
export class FormPacienteComponent {
  formulario: FormGroup;
  rutaImagenA: string;
  rutaImagenB: string;
  @Output() submit: EventEmitter<Paciente> = new EventEmitter<Paciente>();

  constructor(private fb: FormBuilder) {
    this.rutaImagenA = '../../../../assets/default.jpg'; 
    this.rutaImagenB = this.rutaImagenA;

    this.formulario = this.fb.group({
      nombre: [null, Validators.required],
      apellido: [null, Validators.required],
      edad: [null, [Validators.required, Validators.pattern('[0-9]+')]],
      dni: [null, [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(7), Validators.maxLength(8)]],
      obraSocial: [null, Validators.required],
      mail: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      password2: [null, Validators.required],
      imagen_a: [undefined, Validators.required],
      imagen_b: [undefined, Validators.required]
    });

    this.password2.addValidators(PasswordValidator.match(this.password));
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
  
  get obraSocial(): AbstractControl {
    return this.formulario.get('obraSocial')!;
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

  get imagen_a(): AbstractControl {
    return this.formulario.get('imagen_a')!;
  }

  get imagen_b(): AbstractControl {
    return this.formulario.get('imagen_b')!;
  }

  onSubmit(): void {
    if (this.formulario.valid) {
      const usuario = new Paciente(this.nombre.value, this.apellido.value, this.edad.value, 
        this.dni.value, this.mail.value, this.password.value, this.imagen_a.value, this.imagen_b.value, this.obraSocial.value);

      this.submit.emit(usuario);
    }
  }

  imagenA_change(event: any) {
    const archivo = event.target.files[0];
    const elementoId = event.target.id;
    
    if (event.target.files && event.target.files.length
      && archivo.size < 50 * 1024) {
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
      && archivo.size < 50 * 1024) {
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
