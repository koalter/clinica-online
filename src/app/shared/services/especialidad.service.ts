import { Injectable, inject } from '@angular/core';
import { Firestore, Timestamp, addDoc, and, collection, doc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Especialidad, EspecialistaMapper } from '../domains/especialidad.model';
import { SpinnerService } from '../../spinner/shared/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private firestore: Firestore = inject(Firestore);
  private authService: AuthService = inject(AuthService);
  private spinner: SpinnerService = inject(SpinnerService);

  private get path(): string { 
    return 'especialidades';
  }

  async traerTodos(): Promise<string[]> {
    const col = collection(this.firestore, this.path);
    const q = query(col);
    const querySnapshot = await getDocs(q);
    const resultado: string[] = [];

    querySnapshot.forEach(doc => {
      resultado.push(doc.id);
    });

    return resultado;
  }

  async agregar(item: string) {
    const documento = doc(this.firestore, this.path, item);

    await setDoc(documento, null);
  }

  async anidarEspecialidad(especialidad: Especialidad) {
    this.spinner.mostrar();

    try {
      const data = EspecialistaMapper.toUntyped(especialidad);
      await addDoc(collection(this.firestore, 'horarios'), data);
    } catch (err: any) {
      this.logError(err.toString());
    } finally {
      this.spinner.ocultar();
    }
  }

  async traerEspecialistas(especialidad: string) {
    const filtros: Record<any, string> = { especialidad: especialidad };
    return await this.authService.getEspecialistas(filtros);
  }

  async traerItinerarios(especialista: string) {
    this.spinner.mostrar();

    try {
      const resultado: Especialidad[] = [];
      const q = query(collection(this.firestore, 'horarios'), where('especialista', '==', especialista)); 
      const snapshot = await getDocs(q);
      snapshot.forEach(doc => {
        resultado.push(EspecialistaMapper.toTyped(doc.data()));
      });

      return resultado;
    } catch (err: any) {
      this.logError(err.toString());
      return null;
    } finally {
      this.spinner.ocultar();
    }
  }

  async actualizarHorarios(especialidad: Especialidad) {
    this.spinner.mostrar();

    try {
      const q = query(
        collection(this.firestore, 'horarios'), 
        and(where('especialista', '==', especialidad.especialista), where('especialidad', '==', especialidad.especialidad)));
      const snapshot = await getDocs(q);
      const data = snapshot.docs[0]

      await updateDoc(doc(this.firestore, 'horarios', data.id), EspecialistaMapper.toUntyped(especialidad));
    } catch (err: any) {
      this.logError(err.toString());
    } finally {
      this.spinner.ocultar();
    }
  }

  logError(mensaje: string): Promise<any> {
    return addDoc(collection(this.firestore, 'logErrores'), { error: mensaje, fecha: Timestamp.now() });
  }
}
