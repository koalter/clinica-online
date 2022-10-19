import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: any;

  constructor(private auth: Auth) { }

  async iniciarSesion(correo: string, clave: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, correo, clave);
      // await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
      return result.user;
    } catch (err : any) {
      // addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }

  async registrarUsuario(correo: string, clave: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, correo, clave);
      // await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
      return result.user;
    } catch (err : any) {
      // addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }

  async cerrarSesion() {
    await signOut(this.auth);
  }
}
