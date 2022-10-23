import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { addDoc, collection, doc, DocumentData, Firestore, getDoc, setDoc, Timestamp } from "@angular/fire/firestore";
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { Administrador } from '../models/Administrador';
import { Especialista } from '../models/Especialista';
import { Paciente } from '../models/Paciente';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private detallesUsuario!: Usuario | null;
  usuario!: User | null;

  constructor(private auth: Auth,
    private firestore: Firestore,
    private storage: Storage) {
  }

  async iniciarSesion(correo: string, clave: string) {
    try {
      const result = await signInWithEmailAndPassword(this.auth, correo, clave);
      
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
      await this.obtenerDatosDeUsuario();
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
        await this.obtenerDatosDeUsuario();
        await sendEmailVerification(result.user);
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

  private async guardarDatosDeUsuario(data: any, rol: string) {
    const docData: DocumentData = {};
    for (let key in data) {
      if (key !== 'correo' && !key.includes('imagen'))
        docData[key] = data[key];
    }

    docData['rol'] = rol;

    const imgRef = ref(this.storage, `avatar/${data.correo}`);
    await uploadBytes(imgRef, data.imagen);
    const photoURL = await getDownloadURL(imgRef);
    await updateProfile(this.auth.currentUser as User, { photoURL: photoURL });
    docData['imagen'] = photoURL;

    if (data.imagenB) {
      const imgRef_b = ref(this.storage, `avatar/${data.correo}_b`);
      await uploadBytes(imgRef_b, data.imagenB);
      const photoURL_b = await getDownloadURL(imgRef_b);
      docData['imagenB'] = photoURL_b;
    }
    
    
    await setDoc(doc(this.firestore, 'usuarios', data.correo), docData);
  }

  async obtenerDatosDeUsuario(): Promise<Usuario | null> {
    if (this.detallesUsuario) {
      return this.detallesUsuario;
    }

    if (this.usuario) {
      const snapshot = await getDoc(doc(this.firestore, 'usuarios', this.usuario?.email as string));
      let usuario: Usuario | null = null;
      if (snapshot.exists()) {
        const datosDeUsuario = snapshot.data();
        
        switch (datosDeUsuario['rol']) {
          case 'paciente':
            let photoB: string = await getDownloadURL(ref(this.storage, `avatar/${this.usuario?.email}_b`))
            usuario = new Paciente(this.usuario?.email as string, datosDeUsuario['nombre'], datosDeUsuario['apellido'],
              datosDeUsuario['edad'], datosDeUsuario['dni'], this.usuario?.photoURL as string, photoB, datosDeUsuario['obraSocial']);
            break;
          case 'especialista':
            usuario = new Especialista(this.usuario?.email as string, datosDeUsuario['nombre'], datosDeUsuario['apellido'], 
              datosDeUsuario['edad'], datosDeUsuario['dni'], this.usuario?.photoURL as string, datosDeUsuario['especialidad']);
            break;
          case 'administrador':
            usuario = new Administrador(this.usuario?.email as string, datosDeUsuario['nombre'], datosDeUsuario['apellido'],
              datosDeUsuario['edad'], datosDeUsuario['dni'], this.usuario?.photoURL as string);
            break;
          default:
            const mensaje = `El rol del usuario: ${this.usuario?.email} es inválido`;
            addDoc(collection(this.firestore, 'errores'), { error: mensaje, fecha: Timestamp.now() });
            throw new Error(mensaje);
        }
      }
  
      this.detallesUsuario = usuario;
      return usuario;
    }
    
    return null;
  }

  async cerrarSesion() {
    this.detallesUsuario = null;
    this.usuario = null;
    await signOut(this.auth);
  }

}
