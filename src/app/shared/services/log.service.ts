import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { LogUsuario } from '../domains/log-usuario.model';
import { SpinnerService } from '../../spinner/shared/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private firestore: Firestore,
    private spinner: SpinnerService) { }

  async traerLogsUsuarios() {
    this.spinner.mostrar();

    try {
      const resultado: LogUsuario[] = [];
      const q = query(collection(this.firestore, 'logUsuarios'));
      const snapshot = await getDocs(q);
      
      snapshot.forEach(doc => {
        const data = doc.data();
        resultado.push(new LogUsuario(data['usuario'], data['fechaInicio'].toDate()));
      });
  
      resultado.sort((a, b) => b.fecha.getTime() - a.fecha.getTime());

      return resultado;
    } catch (err: any) {
      this.logError(err.toString());
      return undefined;
    } finally {
      this.spinner.ocultar();
    }
  }

  async logError(mensaje: string) {
    await addDoc(collection(this.firestore, 'logErrores'), { error: mensaje, fecha: Timestamp.now() });
  }
}
