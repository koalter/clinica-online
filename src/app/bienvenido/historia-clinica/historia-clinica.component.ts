import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwalComponent, SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
import { Paciente } from '../../shared/domains/usuario.model';
import { HistoriaClinica } from './shared/historia-clinica.model';
import { HistoriaClinicaService } from './shared/historia-clinica.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss']
})
export class HistoriaClinicaComponent implements OnInit {
  paciente!: Paciente;
  historiaClinica!: HistoriaClinica[];
  seleccionado?: HistoriaClinica;
  @ViewChild('detalles') readonly detalles!: SwalComponent;

  constructor(
    private historiaClinicaService: HistoriaClinicaService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public readonly swalTargets: SwalPortalTargets
  ) {}

  async ngOnInit() {
    this.paciente = await this.authService.getUno(this.route.snapshot.paramMap.get('paciente') || this.authService.getUsuario()!.email!) as Paciente;
    this.historiaClinica = await this.historiaClinicaService.getPorPaciente(this.paciente, true);
  }

  seleccionar(item: HistoriaClinica) {
    this.seleccionado = item;
    this.detalles.fire();
  }

  deseleccionar() {
    this.seleccionado = undefined;
  }

  descargar(historias: HistoriaClinica[]) {
    this.historiaClinicaService.generarPDF(historias);
  }
}
