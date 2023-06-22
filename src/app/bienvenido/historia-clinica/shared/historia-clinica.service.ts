import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Paciente } from 'src/app/shared/domains/usuario.model';
import { HistoriaClinica } from './historia-clinica.model';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  constructor(private firestore: Firestore) { }

  async getPorPaciente(paciente: Paciente): Promise<HistoriaClinica[]> {
    try {
      const result: HistoriaClinica[] = [];
      const q = query(collection(this.firestore, 'historia'), where('paciente', '==', paciente.mail));
      const snapshot = await getDocs(q);
      snapshot.forEach(doc => {
        const data = doc.data();
        const item: HistoriaClinica = {
          paciente: data['paciente'],
          especialista: data['especialista'],
          altura: data['altura'],
          peso: data['peso'],
          presion: data['presion'],
          temperatura: data['temperatura'],
          adicionales: data['adicionales']
        };

        result.push(item);
      });

      return result;

    } catch (err: any) {
      await this.logError(err.toString());
      throw err;
    }
  }

  logError(mensaje: string): Promise<any> {
    return addDoc(collection(this.firestore, 'logErrores'), { error: mensaje, fecha: Timestamp.now() });
  }
}
