import { Component, Input, inject } from '@angular/core';
import { Turnos } from '../shared/turno.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'turnos-paciente',
  templateUrl: './turnos-paciente.component.html',
  styleUrls: ['./turnos-paciente.component.scss']
})
export class TurnosPacienteComponent {
  @Input() turnos?: Turnos | null;
  private fb: FormBuilder = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    busqueda: [null],
    criterio: [null]
  });
  
  get busqueda() { return this.form.get('busqueda') }
  get criterio() { return this.form.get('criterio') }

  buscar() {
    if (this.criterio?.value === 'especialidad') {
      this.turnos = this.turnos?.filter(t => t.especialidad.toLowerCase() === this.busqueda?.value.toLowerCase());
    } else if (this.criterio?.value === 'especialista') {
      this.turnos = this.turnos?.filter(t => t.especialista.toLowerCase() === this.busqueda?.value.toLowerCase());
    }
  }
}
