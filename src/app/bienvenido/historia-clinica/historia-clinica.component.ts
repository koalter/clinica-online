import { Component, Input, inject } from '@angular/core';
import { Paciente } from '../../shared/domains/usuario.model';
import { HistoriaClinicaService } from './shared/historia-clinica.service';
import { HistoriaClinica } from './shared/historia-clinica.model';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent {
  @Input() paciente!: Paciente;
  private historiaClinicaService: HistoriaClinicaService = inject(HistoriaClinicaService);
  historiaClinica: Promise<HistoriaClinica[]> = this.historiaClinicaService.getPorPaciente(this.paciente);
}
