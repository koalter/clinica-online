import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from '../shared/services/auth.service';
import { Especialista, Usuario } from '../shared/domains/usuario.model';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {
  usuario!: User | null;
  data!: Usuario | null;

  constructor(private auth: AuthService) { }
  
  ngOnInit(): void {
    this.usuario = this.auth.getUsuario();
    this.data = this.auth.getDetalles();
  }

  get especialistaNoHabilitado(): boolean {
    if (this.data) {
      return (this.data.rol === 'especialista') && !(this.data as Especialista).habilitado;
    }
    return false;
  }
}
