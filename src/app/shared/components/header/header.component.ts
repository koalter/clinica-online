import { Component, Input, OnInit, Output } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() rutas?: Routes;
  usuario!: User | null;
  
  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit() {
    this.usuario = this.authService.getUsuario();
  }

  cerrarSesion(): void {
    this.authService.logout()
    .then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
