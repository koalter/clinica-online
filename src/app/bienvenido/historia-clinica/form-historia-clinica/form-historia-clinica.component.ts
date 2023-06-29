import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../../shared/domains/usuario.model';
import { AuthService } from '../../../shared/services/auth.service';
import { HistoriaClinicaService } from '../shared/historia-clinica.service';
import { HistoriaClinica } from '../shared/historia-clinica.model';

@Component({
  selector: 'form-historia-clinica',
  templateUrl: './form-historia-clinica.component.html',
  styleUrls: ['./form-historia-clinica.component.scss']
})
export class FormHistoriaClinicaComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  private historiaClinicaService: HistoriaClinicaService = inject(HistoriaClinicaService);
  paciente!: Paciente;
  especialidad!: string;
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

  async ngOnInit() {
    const paciente = this.route.snapshot.paramMap.get('paciente');
    const especialidad = this.route.snapshot.paramMap.get('especialidad');
    if (paciente && especialidad) {
      this.paciente = await this.authService.getUno(paciente) as Paciente;
      this.especialidad = especialidad;
    } else {
      this.router.navigateByUrl('/');
    }
  }

  enviar() {
    if (this.formulario.valid) {
      const adicionales = [];

      if (this.formulario.get('clave1')?.value) {
        adicionales.push({ key: this.formulario.get('clave1')?.value, value: this.formulario.get('valor1')?.value})
      }
      if (this.formulario.get('clave2')?.value) {
        adicionales.push({ key: this.formulario.get('clave2')?.value, value: this.formulario.get('valor2')?.value})
      }
      if (this.formulario.get('clave3')?.value) {
        adicionales.push({ key: this.formulario.get('clave3')?.value, value: this.formulario.get('valor3')?.value})
      }
      const historiaClinica = new HistoriaClinica(this.paciente.mail, this.authService.getDetalles()!.mail,
      this.especialidad, this.formulario.get('altura')?.value, this.formulario.get('peso')?.value, this.formulario.get('temperatura')?.value,
      this.formulario.get('presion')?.value, adicionales);
      this.historiaClinicaService.post(historiaClinica);

      this.router.navigateByUrl('/');
    }
  }
}
