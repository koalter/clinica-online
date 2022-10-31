import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore, Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private firestore: Firestore) { }

  async nuevoTurno({ paciente, especialidad, especialista, fecha }: any) {
    try {
      const result = await addDoc(collection(this.firestore, 'turnos'), { paciente, especialidad, especialista, fecha });
      return result.id;
    } catch (err: any) {
      addDoc(collection(this.firestore, 'errores'), { error: err.toString(), fecha: Timestamp.now() });
      throw err;
    }
  }
}
