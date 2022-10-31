import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { _ } from 'ag-grid-community';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  formulario: FormGroup;
  spinner: boolean = false;

  constructor(private turnoService: TurnoService,
    private usuarioService: UsuarioService) { 
    this.formulario = new FormGroup({
      'especialidad': new FormControl('', [Validators.required]),
      'especialista': new FormControl('', [Validators.required]),
      'fecha': new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  async submit() {
    this.spinner = true;
    try {
      const usuario = await this.usuarioService.obtenerDatosDeUsuario();

      const datosTurno = {
        paciente: usuario?.Correo,
        especialidad: this.formulario.get('especialidad')?.value,
        especialista: this.formulario.get('especialista')?.value,
        fecha: this.formulario.get('fecha')?.value
      }
      await this.turnoService.nuevoTurno(datosTurno);

    } catch (error) {
      console.error(error);
    }
    this.spinner = false;
  }
}
