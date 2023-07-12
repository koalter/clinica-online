import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../shared/domains/usuario.model';
import { AuthService } from '../../../shared/services/auth.service';
import { HistoriaClinicaService } from '../shared/historia-clinica.service';
import { HistoriaClinica } from '../shared/historia-clinica.model';
import { Turno } from '../../../turnos/shared/turno.model';
import { TurnosService } from '../../../turnos/shared/turnos.service';

@Component({
  selector: 'form-historia-clinica',
  templateUrl: './form-historia-clinica.component.html',
  styleUrls: ['./form-historia-clinica.component.scss']
})
export class FormHistoriaClinicaComponent implements OnInit {
  paciente!: Paciente;
  especialidad!: string;
  turno!: string;
  formulario: FormGroup = this.fb.group({
    altura:       [null, Validators.required],
    peso:         [null, Validators.required],
    temperatura:  [null, Validators.required],
    presion:      [null, Validators.required],
    clave1:       [null],
    clave2:       [null],
    clave3:       [null],
    clave4:       [null],
    clave5:       [null],
    clave6:       [null],
    valor1:       [null],
    valor2:       [null],
    valor3:       [null],
    valor4:       [null],
    valor5:       [null],
    valor6:       [null]
  });

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private historiaClinicaService: HistoriaClinicaService,
    private turnoService: TurnosService) {}

  async ngOnInit() {
    const paciente = this.route.snapshot.paramMap.get('paciente');
    const especialidad = this.route.snapshot.paramMap.get('especialidad');
    const turno = this.route.snapshot.paramMap.get('turno');
    if (paciente && especialidad && turno) {
      this.paciente = await this.authService.getUno(paciente) as Paciente;
      this.especialidad = especialidad;
      this.turno = turno;
    } else {
      this.router.navigateByUrl('/');
    }
  }

  enviar() {
    if (this.formulario.valid) {
      const adicionales = [];

      if (this.formulario.get('clave1')?.value) {
        adicionales.push({ key: this.formulario.get('clave1')?.value, value: this.formulario.get('valor1')?.value});
      }
      if (this.formulario.get('clave2')?.value) {
        adicionales.push({ key: this.formulario.get('clave2')?.value, value: this.formulario.get('valor2')?.value});
      }
      if (this.formulario.get('clave3')?.value) {
        adicionales.push({ key: this.formulario.get('clave3')?.value, value: this.formulario.get('valor3')?.value});
      }
      if (this.formulario.get('clave4')?.value) {
        adicionales.push({ key: this.formulario.get('clave4')?.value, value: this.formulario.get('valor4')?.value});
      }
      if (this.formulario.get('clave5')?.value) {
        adicionales.push({ key: this.formulario.get('clave5')?.value, value: this.formulario.get('valor5')?.value});
      }
      if (this.formulario.get('clave6')?.value) {
        adicionales.push({ key: this.formulario.get('clave6')?.value, value: this.formulario.get('valor6')?.value ? 'Si' : 'No'});
      }
      
      const historiaClinica = new HistoriaClinica(this.paciente.mail, this.authService.getDetalles()!.mail,
      this.especialidad, this.formulario.get('altura')?.value, this.formulario.get('peso')?.value, this.formulario.get('temperatura')?.value,
      this.formulario.get('presion')?.value, adicionales);
      this.historiaClinicaService.post(historiaClinica)
      .then(id => {
        this.turnoService.enlazarHistoriaClinica(this.turno, id)
        .then(() => {
          this.router.navigateByUrl('/');
        });
      });
    }
  }
}
