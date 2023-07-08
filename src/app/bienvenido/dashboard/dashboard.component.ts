import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  rol: string = this.authService.getDetalles()!.rol;

  constructor(private router: Router,
    private authService: AuthService) {
    if (this.rol.toLowerCase() === 'administrador') {
      this.router.navigateByUrl('admin');
    }
  }
}
