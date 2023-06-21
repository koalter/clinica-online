import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { User } from '@angular/fire/auth';
import { AuthService } from '../shared/services/auth.service';
import { Especialista, Usuario } from '../shared/domains/usuario.model';
import { fader } from '../shared/animations';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss'],
  animations: [fader]
})
export class BienvenidoComponent implements OnInit {
  usuario!: User | null;
  data!: Usuario | null;

  constructor(private auth: AuthService,
    private contexts: ChildrenOutletContexts) { }
  
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

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
