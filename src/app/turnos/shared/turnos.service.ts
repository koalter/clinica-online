import { Injectable } from '@angular/core';
import { EstadoTurno, Turno } from './turno.model';
import { Firestore, Timestamp, addDoc, collection, doc, getDocs, query, updateDoc } from '@angular/fire/firestore';
import { SpinnerService } from '../../spinner/shared/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private firestore: Firestore,
    private spinner: SpinnerService) { }

  async alta(turno: Turno) {
    this.spinner.mostrar()

    try {
      const data = {
        paciente: turno.paciente,
        especialista: turno.especialista,
        especialidad: turno.especialidad,
        fecha: Timestamp.fromDate(turno.fecha),
        estado: EstadoTurno.Solicitado
      };
      await addDoc(collection(this.firestore, 'turnos'), data);
    } catch (err: any) {
      this.logError(err.toString());
    } finally {
      this.spinner.ocultar();
    }
  }

  async traerTodos(): Promise<Turno[]> {
    this.spinner.mostrar();

    try {
      const result: Turno[] = [];
      const q = query(collection(this.firestore, 'turnos'));
      const snapshot = await getDocs(q);

      snapshot.forEach(doc => {
        const data = doc.data();
        const item: Turno = {
          id: doc.id,
          paciente: data['paciente'],
          especialista: data['especialista'],
          especialidad: data['especialidad'],
          fecha: (data['fecha'] as Timestamp).toDate(),
          estado: data['estado'],
          comentarios: data['comentarios']
        };
        result.push(item);
      });

      return result;
    } catch (err: any) {
      this.logError(err.toString());
      throw err;
    } finally {
      this.spinner.ocultar();
    }
  }

  async cambiarEstado(id: string, nuevoEstado: EstadoTurno) {
    this.spinner.mostrar();

    try {
      const docRef = doc(this.firestore, 'turnos', id);
      await updateDoc(docRef, {
        estado: nuevoEstado
      });
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
