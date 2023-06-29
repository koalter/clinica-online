import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Especialista, Paciente } from 'src/app/shared/domains/usuario.model';
import { HistoriaClinica } from './historia-clinica.model';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  private coll = collection(this.firestore, 'historia');

  constructor(private firestore: Firestore,
    private authService: AuthService) { }

  async getPorPaciente(paciente: Paciente, agregarDetalles = false): Promise<HistoriaClinica[]> {
    try {
      const result: HistoriaClinica[] = [];
      const q = query(this.coll, where('paciente', '==', paciente.mail));
      const snapshot = await getDocs(q);
      snapshot.forEach(async doc => {
        const data = doc.data();
        const item: HistoriaClinica = new HistoriaClinica(
          data['paciente'],
          data['especialista'],
          data['especialidad'],
          data['altura'],
          data['peso'],
          data['temperatura'],
          data['presion'],
          data['adicionales']
        );

        if (agregarDetalles) {
          item.especialistaDetalles = await this.authService.getUno(item.especialista) as Especialista;
          item.pacienteDetalles = await this.authService.getUno(item.paciente) as Paciente;
        }
        
        result.push(item);
      });

      return result;

    } catch (err: any) {
      await this.logError(err.toString());
      throw err;
    }
  }

  async post(historiaClinica: HistoriaClinica) {
    try {
      const adicionales = [];
      for (let item of historiaClinica.adicionales) {
        adicionales.push({ key: item[0], value: item[1] });
      }

      const data = {
        paciente: historiaClinica.paciente,
        especialista: historiaClinica.especialista,
        especialidad: historiaClinica.especialidad,
        altura: historiaClinica.altura,
        peso: historiaClinica.peso,
        temperatura: historiaClinica.temperatura,
        presion: historiaClinica.presion,
        fecha: Timestamp.fromDate(historiaClinica.fecha),
        adicionales: adicionales
      };
      await addDoc(this.coll, data);
    } catch (err: any) {
      await this.logError(err.toString());
      throw err;
    }
  }

  logError(mensaje: string): Promise<any> {
    return addDoc(collection(this.firestore, 'logErrores'), { error: mensaje, fecha: Timestamp.now() });
  }
}
