import { Injectable } from '@angular/core';
import { Turno } from './turno.model';
import { Firestore, Timestamp, addDoc, collection, doc, setDoc } from '@angular/fire/firestore';
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
        paciente: turno.paciente.mail,
        especialista: turno.especialista.mail,
        especialidad: turno.especialidad,
        fecha: Timestamp.fromDate(turno.fecha)
      };
      await addDoc(collection(this.firestore, 'turnos'), data);
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
