import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lnck-clinica-online';

  constructor(private auth: Auth,
    private usuarioService: UsuarioService) {
    // this.auth.onAuthStateChanged(user => this.usuarioService.usuario = user);
  }

}
