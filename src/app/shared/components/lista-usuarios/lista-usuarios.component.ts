import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../../models/Usuario';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  @Input() listado!: Usuario[];
  @Output() seleccionar: EventEmitter<Usuario> = new EventEmitter<Usuario>();
  
  constructor() { }

  ngOnInit(): void {
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.seleccionar.emit(usuario);
  }
}
