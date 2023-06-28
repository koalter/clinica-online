import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-historia-clinica',
  templateUrl: './form-historia-clinica.component.html',
  styleUrls: ['./form-historia-clinica.component.scss']
})
export class FormHistoriaClinicaComponent {
  private fb: FormBuilder = inject(FormBuilder);
  formulario: FormGroup = this.fb.group({
    altura:       [null, Validators.required],
    peso:         [null, Validators.required],
    temperatura:  [null, Validators.required],
    presion:      [null, Validators.required],
    clave1:       [null],
    clave2:       [null],
    clave3:       [null],
    valor1:       [null],
    valor2:       [null],
    valor3:       [null]
  });

  enviar() {
    console.log(this.formulario.value);
  }
}
