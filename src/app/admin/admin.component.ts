import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  spinner: boolean = true;
  usuario!: Usuario | null;
  dropdownItems!: any[];

  constructor(private usuarioService: UsuarioService,
              private router: Router) { 
    this.usuarioService.obtenerDatosDeUsuario()
    .then(u => {
      this.usuario = u;
      
      if (this.usuario) {
        if (this.usuario.rol === 'administrador') {
          this.dropdownItems = [
            { clave: 'Pacientes', valor: '/admin/pacientes' },
            { clave: 'Especialista', valor: '/admin/especialistas' },
            { clave: 'Nuevo administrador', valor: '/admin/registro' }
          ];
        }
      }
      
      this.spinner = false;
    });
  }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.spinner = true;
    this.usuarioService.cerrarSesion()
    .then(() => {
      this.router.navigate(['bienvenido', 'login']);
    })
    .finally(() => this.spinner = false);
  }
}
