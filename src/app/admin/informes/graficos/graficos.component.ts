import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { TurnosService } from '../../../turnos/shared/turnos.service';
import { EstadoTurno, Turno } from '../../../turnos/shared/turno.model';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  porEspecialidadOptions!: Highcharts.Options;
  porDiaOptions!: Highcharts.Options;
  porSolicitadosOptions!: Highcharts.Options;
  porFinalizadosOptions!: Highcharts.Options;
  @ViewChild('export') exportRef!: ElementRef;

  constructor(private turnoService: TurnosService) {}

  ngOnInit(): void {
    this.turnoService.traerTodos()
    .then(turnos => {
      this.armarInformes(turnos);
    });
  }

  exportar(): void {
    html2canvas(this.exportRef.nativeElement).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');

      pdfMake.createPdf({
        pageOrientation: 'landscape',
        content: [{
          image: imgData,
          width: 800
        }]
      }).open();
    })
  }

  private armarInformes(turnos: Turno[]) {
    const turnosPorEspecialidad: any[] = [];
    const turnosPorDia: any[] = [];
    const turnosSolicitadosPorMedico: any[] = [];
    const turnosFinalizadosPorMedico: any[] = [];
    
    for (let turno of turnos) {
      this.asignarData(turnosPorEspecialidad, turno.especialidad);
      this.asignarData(turnosPorDia, turno.fecha.toLocaleDateString('es-AR', { month: '2-digit', day: '2-digit' }));
    }

    for (let turno of turnos.filter(t => t.estado === EstadoTurno.Solicitado)) {
      this.asignarData(turnosSolicitadosPorMedico, turno.especialista);
    }
    
    for (let turno of turnos.filter(t => t.estado === EstadoTurno.Realizado)) {
      this.asignarData(turnosFinalizadosPorMedico, turno.especialista);
    }

    this.porEspecialidadOptions = {
      series: [{
        data: turnosPorEspecialidad,
        type: 'pie',
        name: 'turnos'
      }],
      title: { text: 'Cant. turnos por especialidad' }
    };

    this.porDiaOptions = {
      series: [{
        data: turnosPorDia,
        type: 'pie',
        name: 'turnos'
      }],
      title: { text: 'Cant. turnos por dia' }
    }

    this.porSolicitadosOptions = {
      series: [{
        data: turnosSolicitadosPorMedico,
        type: 'pie',
        name: 'turnos'
      }],
      title: { text: 'Cant. turnos solicitados por medico' }
    }

    this.porFinalizadosOptions = {
      series: [{
        data: turnosFinalizadosPorMedico,
        type: 'pie',
        name: 'turnos'
      }],
      title: { text: 'Cant. turnos finalizados por medico' }
    }
  }

  private asignarData(data: any, criterio: string) {
    let match = false;
    for (let item of data) {
      if (item[0] === criterio) {
        item[1]++;
        match = true;
        break;
      }
    }
    if (!match) {
      data.push([criterio, 1]);
    }
  }
}
