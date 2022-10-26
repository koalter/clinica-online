import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const snapshot = await getDoc(doc(this.firestore, 'usuarios', this.auth.currentUser?.email as string))
    let resultado: boolean | UrlTree = this.router.parseUrl('/bienvenido');

    if (snapshot.exists()) {
      const data = snapshot.data();

      if (data['rol'] === 'administrador') {
        resultado = true;
      }
    }

    return resultado;
    
  }
  
}
