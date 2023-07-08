import { Injectable } from '@angular/core';
import { EstadoTurno, Turno } from './turno.model';
import { Firestore, Timestamp, addDoc, and, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { SpinnerService } from '../../spinner/shared/spinner.service';
import { AuthService } from '../../shared/services/auth.service';
import { Especialista, Paciente } from '../../shared/domains/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private firestore: Firestore,
    private spinner: SpinnerService,
    private authService: AuthService) { }

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
          comentarios: data['comentarios'] || [],
          historiaClinica: data['historiaClinica']
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

  async traerPorPaciente(paciente: string) {
    this.spinner.mostrar();

    try {
      const result: Turno[] = [];
      const q = query(collection(this.firestore, 'turnos'), where('paciente', '==', paciente));
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
          comentarios: data['comentarios'] || []
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

  async filtrarPacientes(especialista: string, agregarDetalles = false) {
    this.spinner.mostrar();

    try {
      const result: Turno[] = [];
      const q = query(collection(this.firestore, 'turnos'), and(where('especialista', '==', especialista), where('estado', '==', 'Realizado')));
      const snapshot = await getDocs(q);

      snapshot.forEach(async doc => {
        const data = doc.data();
        const item: Turno = {
          id: doc.id,
          paciente: data['paciente'],
          especialista: data['especialista'],
          especialidad: data['especialidad'],
          fecha: (data['fecha'] as Timestamp).toDate(),
          estado: data['estado'],
          comentarios: data['comentarios'] || []
        };

        if (agregarDetalles) {
          item.pacienteDetalles = await this.authService.getUno(item.paciente) as Paciente;
          item.especialistaDetalles = await this.authService.getUno(item.especialista) as Especialista;
        }

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

  async cambiarEstado(id: string, nuevoEstado: EstadoTurno, comentarios?: string) {
    this.spinner.mostrar();

    try {
      const docRef = doc(this.firestore, 'turnos', id);
      const data = comentarios ? {
        estado: nuevoEstado,
        comentarios: arrayUnion(comentarios)
      } :
      {
        estado: nuevoEstado
      };
      await updateDoc(docRef, data);
    } catch (err: any) {
      this.logError(err.toString());
    } finally {
      this.spinner.ocultar();
    }
  }

  async traerPorId(id: string) {
    this.spinner.mostrar();

    try {
      const docRef = doc(this.firestore, 'turnos', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error(`¡El documento con id ${id} no existe!`);
      }

      const resultado = docSnap.data();
      return new Turno(resultado['paciente'], resultado['especialista'], resultado['especialidad'], resultado['fecha'], resultado['estado'], resultado['comentarios']);
    } catch (err: any) {
      this.logError(err.toString());
      return null;
    } finally {
      this.spinner.ocultar();
    }
  }

  async traerComentarios(id: string) {
    const resultado = await this.traerPorId(id);
    return resultado?.comentarios;
  }

  logError(mensaje: string): Promise<any> {
    return addDoc(collection(this.firestore, 'logErrores'), { error: mensaje, fecha: Timestamp.now() });
  }
}
