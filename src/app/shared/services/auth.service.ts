import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, Timestamp, DocumentSnapshot, SnapshotOptions, setDoc, doc, query, getDocs, getDoc, updateDoc, where } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, updateProfile, sendEmailVerification } from '@angular/fire/auth';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FirebaseError } from '@angular/fire/app';
import { SpinnerService } from '../../spinner/shared/spinner.service';
import { AuthError } from '../domains/auth.error';
import { Administrador, Especialista, Paciente, Usuario } from '../domains/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private imageURI: string = 'gs://clinica-online-de2f5.appspot.com/avatar/';
  private usuario!: User | null;
  private usuarioDetalles!: Usuario | null;
  private mapper = {
    toFirestore: (user: Usuario) => {
      let data = {};
      const rol = user.rol.toLowerCase();
      switch (rol) {
        case 'paciente':
          data = {
            nombre: user.nombre,
            apellido: user.apellido,
            edad: user.edad,
            dni: user.dni,
            obraSocial: (user as Paciente).obraSocial,
            rol: rol
          };
          break;
        case 'especialista':
          data = {
            nombre: user.nombre,
            apellido: user.apellido,
            edad: user.edad,
            dni: user.dni,
            especialidad: (user as Especialista).especialidad,
            habilitado: (user as Especialista).habilitado,
            rol: rol
          };
          break;
        case 'administrador':
          data = {
            nombre: user.nombre,
            apellido: user.apellido,
            edad: user.edad,
            dni: user.dni,
            rol: rol
          };
          break;
      }
      return data;
    },
    fromFirestore: async (snapshot: DocumentSnapshot, options?: SnapshotOptions | undefined) => {
      const data = snapshot.data(options);
      if (!data) {
        return null;
      }

      const imagen = await getDownloadURL(ref(this.storage, `${this.imageURI}${snapshot.id}_0`));

      switch ((data['rol'] as string).toLowerCase()) {
        case 'paciente':
          const imagenB = await getDownloadURL(ref(this.storage, `${this.imageURI}${snapshot.id}_1`));
          return new Paciente(
            data['nombre'], data['apellido'], data['edad'], data['dni'], snapshot.id, imagen, imagenB, data['obraSocial'], false);
        case 'especialista':
          return new Especialista(
            data['nombre'], data['apellido'], data['edad'], data['dni'], snapshot.id, imagen, data['especialidad'], false, data['habilitado']);
        case 'administrador':
          return new Administrador(
            data['nombre'], data['apellido'], data['edad'], data['dni'], snapshot.id, imagen, false);
        default:
          return null;
      }
    },
    fromLocalStorage: (json: string | null) => {
      if (!json)
        return null;

      const data = JSON.parse(json);

      switch ((data['rol'] as string).toLowerCase()) {
        case 'paciente':
          return new Paciente(
            data['nombre'], data['apellido'], data['edad'], data['dni'], data['mail'], data['imagen'], data['imagenB'], data['obraSocial'], data['verificado']);
        case 'especialista':
          return new Especialista(
            data['nombre'], data['apellido'], data['edad'], data['dni'], data['mail'], data['imagen'], data['especialidad'], data['verificado'], data['habilitado']);
        case 'administrador':
          return new Administrador(
            data['nombre'], data['apellido'], data['edad'], data['dni'], data['mail'], data['imagen'], data['verificado']);
        default:
          return null;
      }
    }
  }

  constructor(private firestore: Firestore,
    private auth: Auth,
    private storage: Storage,
    private spinnerService: SpinnerService) { 
    onAuthStateChanged(this.auth, user => {
      this.usuario = user;
    });
    this.usuarioDetalles = this.mapper.fromLocalStorage(localStorage.getItem('usuario'));
  }

  getUsuario() {
    return this.usuario;
  }

  getDetalles() {
    return this.usuarioDetalles;
  }
  
  async login(correo: string, clave: string): Promise<void> {
    try {
      this.spinnerService.mostrar();
      const credenciales = await signInWithEmailAndPassword(this.auth, correo, clave);
      this.usuario = credenciales.user;
      this.usuarioDetalles = await this.getDatosDeUsuario();
      const json = JSON.stringify(this.usuarioDetalles);
      localStorage.setItem('usuario', json);
      await addDoc(collection(this.firestore, 'logUsuarios'), { usuario: correo, fechaInicio: Timestamp.now() });
    } catch (err: any) {
      await this.logError(err.toString());
      throw new AuthError(err as FirebaseError);
    } finally {
      this.spinnerService.ocultar();
    }
  }

  async registro(user: Usuario, clave: string, imagenes: File[]): Promise<void> {
    this.spinnerService.mostrar();

    try {
      const credenciales = await createUserWithEmailAndPassword(this.auth, user.mail, clave);
      await sendEmailVerification(credenciales.user);
      
      this.usuarioDetalles = user;
      const json = JSON.stringify(this.usuarioDetalles);
      localStorage.setItem('usuario', json);

      await setDoc(doc(this.firestore, 'usuarios', user.mail), this.mapper.toFirestore(user));

      for (let i = 0; i < imagenes.length; i++) {
        await this.subirImagenDePerfil(imagenes[i], `${user.mail}_${i}`);
      }

      await this.setDatosDeUsuario(user.nombre);
    } catch (err: any) {
      await this.logError(err.toString());
      throw new AuthError(err as FirebaseError);
    } finally {
      this.spinnerService.ocultar();
    }
  }

  private async subirImagenDePerfil(imagen: File | Blob, nombre: string) {
    const storageRef = ref(this.storage, `avatar/${nombre}`);

    try {
      this.spinnerService.mostrar();
      await uploadBytes(storageRef, imagen);
    } catch (err: any) {
      await this.logError(err.toString());
      throw err;
    } finally {
      this.spinnerService.ocultar();
    }
  }

  private async setDatosDeUsuario(nombre: string) {
    if (this.auth.currentUser) {
      const storageRef = ref(this.storage, `avatar/${this.auth.currentUser.email}_0`);
      try {
        const imagenURL = await getDownloadURL(storageRef);
        await updateProfile(this.auth.currentUser, { displayName: nombre, photoURL: imagenURL });
      } catch (err: any) {
        await this.logError(err.toString());
        throw err;
      }
    }
  }

  async getDatosDeUsuario() {
    try {
      const docRef = doc(this.firestore, 'usuarios', this.usuario?.email!);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        return await this.mapper.fromFirestore(snapshot);
      }

      return null;
    } catch (err: any) {
      await this.logError(err.toString());
      throw err;
    }
  }

  async logout(): Promise<boolean> {
    try {
      this.spinnerService.mostrar();
      localStorage.removeItem('usuario');
      await signOut(this.auth);
      this.usuario = null;
      return true;
    } catch (err: any) {
      await this.logError(err.toString());
      return false;
    } finally {
      this.spinnerService.ocultar();
    }
  }

  async getUsuarios(tipo: string): Promise<Usuario[]> {
    this.spinnerService.mostrar();
    try {
      const q = query(collection(this.firestore, 'usuarios'));
      const docs = await getDocs(q);
      const res: Usuario[] = [];
      docs.forEach(doc => {
        this.mapper.fromFirestore(doc)
        .then(item => {
          if (item && item['rol'] === tipo) {
            res.push(item);
          }
        });
      });
  
      return res;
    } catch (err: any) {
      await this.logError(err.toString());
      throw err;
    } finally {
      this.spinnerService.ocultar();
    }
  }

  async getEspecialistas(): Promise<Especialista[]> {
    const result = (await this.getUsuarios('especialista')) as Especialista[];
    return result;
  }

  async getPacientes(): Promise<Paciente[]> {
    return await this.getUsuarios('paciente') as Paciente[];
  }

  async getUno(mail: string) {
    const docRef = doc(this.firestore, 'usuarios', mail);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await this.logError(`El usuario ${mail} no existe.`);
      throw new Error();
    }
    
    return await this.mapper.fromFirestore(docSnap);
  }

  async habilitarODeshabilitarEspecialista(usuario: Especialista, estado: boolean) {
    this.spinnerService.mostrar();
    const docRef = doc(this.firestore, 'usuarios', usuario.mail);

    try {
      await updateDoc(docRef, { habilitado: estado });
      return estado;
    } catch (err: any) {
      await this.logError(err.toString());
      throw new AuthError(err as FirebaseError);
    } finally {
      this.spinnerService.ocultar();
    }
  }

  logError(mensaje: string): Promise<any> {
    return addDoc(collection(this.firestore, 'logErrores'), { error: mensaje, fecha: Timestamp.now() });
  }

  async getTestUsers(): Promise<Usuario[]> {
    this.spinnerService.mostrar();
    try {
      const q = query(collection(this.firestore, 'usuarios'), where('test', '==', true));
      const docs = await getDocs(q);
      const res: Usuario[] = [];
      docs.forEach(doc => {
        this.mapper.fromFirestore(doc)
        .then(item => {
          res.push(item!);
        });
      });
  
      return res;
    } catch (err: any) {
      await this.logError(err.toString());
      throw err;
    } finally {
      this.spinnerService.ocultar();
    }
  }
}
