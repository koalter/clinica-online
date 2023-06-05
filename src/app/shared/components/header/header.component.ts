import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Routes } from '@angular/router';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() rutas?: Routes;
  @Input() usuario?: User | null;
  @Output() cerrarSesion: EventEmitter<void> = new EventEmitter();
  
  constructor() {}
  
  cerrarSesion_click(): void {
    this.cerrarSesion.emit();
  }
}
