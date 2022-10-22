import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { addDoc, collection, doc, DocumentData, Firestore, setDoc, Timestamp } from "@angular/fire/firestore";
import { ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: any;

  constructor(private auth: Auth,
    private firestore: Firestore,
    private storage: Storage) {
    this.auth.onAuthStateChanged(user => this.usuario = user);
  }

  async iniciarSesion(correo: string, clave: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, correo, clave);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
      return result.user;
    } catch (err : any) {
      addDoc(collection(this.firestore, 'errores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }

  async registrarUsuario(usuario: Usuario, clave: string) {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, usuario.correo, clave);
      
      try {
        await this.guardarDatosDeUsuario(usuario, usuario.constructor.name.toLowerCase());
        await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: usuario.correo, fechaInicio: Timestamp.now() });
      } catch (err: any) {
        await deleteUser(result.user);
        throw err;
      }
      return result.user;
    } catch (err : any) {
      addDoc(collection(this.firestore, 'errores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }

  private async guardarDatosDeUsuario(data: any, coleccion: string) {
    const docData: DocumentData = {};
    for (let key in data) {
      if (key !== 'correo' && !key.includes('imagen'))
        docData[key] = data[key];
    }

    await uploadBytes(ref(this.storage, `avatar/${data.correo}`), data.imagen);
    if (data.imagenB) {
      await uploadBytes(ref(this.storage, `avatar/${data.correo}_b`), data.imagenB);
    }
    
    await setDoc(doc(this.firestore, coleccion, data.correo), docData);
  }

  async cerrarSesion() {
    await signOut(this.auth);
  }
}
