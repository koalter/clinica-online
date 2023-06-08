import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, Timestamp, DocumentSnapshot, SnapshotOptions } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential, NextOrObserver } from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';
import { SpinnerService } from '../../spinner/shared/spinner.service';
import { AuthError } from '../domains/auth.error';
import { Administrador, Especialista, Paciente, Usuario } from '../domains/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario!: User | null;
  mapper = {
    toFirestore: (user: Usuario) => {
      let data = {};
      switch (user.rol.toUpperCase()) {
        case 'PACIENTE':
          data = {
            nombre: user.nombre,
            apellido: user.apellido,
            edad: user.edad,
            dni: user.dni,
            mail: user.mail,
            clave: user.clave,
            imagen: user.imagen,
            imagenB: (user as Paciente).imagenB,
            obraSocial: (user as Paciente).obraSocial
          };
          break;
        case 'ESPECIALISTA':
          data = {
            nombre: user.nombre,
            apellido: user.apellido,
            edad: user.edad,
            dni: user.dni,
            mail: user.mail,
            clave: user.clave,
            imagen: user.imagen,
            especialidad: (user as Especialista).especialidad
          };
          break;
        case 'ADMINISTRADOR':
          data = {
            nombre: user.nombre,
            apellido: user.apellido,
            edad: user.edad,
            dni: user.dni,
            mail: user.mail,
            clave: user.clave,
            imagen: user.clave
          };
          break;
      }
      return data;
    },
    fromFirestore: (snapshot: DocumentSnapshot, options: SnapshotOptions | undefined) => {
      const data = snapshot.data(options);
      if (!data) {
        return null;
      }

      switch ((data['rol'] as string).toUpperCase()) {
        case 'PACIENTE':
          return new Paciente(
            data['nombre'], data['apellido'], data['edad'], data['dni'], data['mail'], data['clave'], data['imagen'], data['imagenB'], data['obraSocial']);
        case 'ESPECIALISTA':
          return new Especialista(
            data['nombre'], data['apellido'], data['edad'], data['dni'], data['mail'], data['clave'], data['imagen'],data['especialidad']);
        case 'ADMINISTRADOR':
          return new Administrador(
            data['nombre'], data['apellido'], data['edad'], data['dni'], data['mail'], data['clave'], data['imagen']);
        default:
          return null;
      }
    }
  }

  constructor(private firestore: Firestore,
    private auth: Auth,
    private spinnerService: SpinnerService) { }
  
  async login(correo: string, clave: string): Promise<void> {
    try {
      this.spinnerService.mostrar();
      const credenciales = await signInWithEmailAndPassword(this.auth, correo, clave);
      this.usuario = credenciales.user;
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
    } catch (err: any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw new AuthError(err as FirebaseError);
    } finally {
      this.spinnerService.ocultar();
    }
  }

  async registro(user: Usuario): Promise<void> {
    try {
      this.spinnerService.mostrar();
      const credenciales = await createUserWithEmailAndPassword(this.auth, user.mail, user.clave);
      this.usuario = credenciales.user;
      await addDoc(collection(this.firestore, 'usuarios'), this.mapper.toFirestore(user));
    } catch (err: any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      throw new AuthError(err as FirebaseError);
    } finally {
      this.spinnerService.ocultar();
    }
  }

  async logout(): Promise<boolean> {
    try {
      this.spinnerService.mostrar();
      await signOut(this.auth);
      this.usuario = null;
      return true;
    } catch (err: any) {
      await addDoc(collection(this.firestore, 'logErrores'), { error: err.toString(), fecha: Timestamp.now() });
      return false;
    } finally {
      this.spinnerService.ocultar();
    }
  }

  getUsuario(func: NextOrObserver<User>) {
    return onAuthStateChanged(this.auth, func);
  }
  
}
