import { Injectable } from '@angular/core';
import { Firestore, Timestamp, addDoc, collection, doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Especialista, Paciente } from 'src/app/shared/domains/usuario.model';
import { HistoriaClinica } from './historia-clinica.model';
import { AuthService } from '../../../shared/services/auth.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { LogService } from '../../../shared/services/log.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  private coll = collection(this.firestore, 'historia');

  constructor(private firestore: Firestore,
    private authService: AuthService,
    private logger: LogService) { }

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
      await this.logger.logError(err.toString());
      throw err;
    }
  }

  async getPorId(guid: string, agregarDetalles: boolean = false) {
    try {
      const docRef = doc(this.firestore, 'historia', guid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
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
        
        return item;
      }

      return undefined;
    } catch (err: any) {
      await this.logger.logError(err.toString());
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
      const docRef = await addDoc(this.coll, data);
      return docRef.id;
    } catch (err: any) {
      await this.logger.logError(err.toString());
      throw err;
    }
  }

  async generarPDF(historias: HistoriaClinica[]): Promise<void> {
    try {
      const content: any[] = [
        `Fecha de emisión: ${ new Date().toLocaleDateString('es-AR', { dateStyle: 'full' }) }`
      ];
  
      for (let historia of historias) {
        let tabla = {
          margin: [0, 5, 0, 15],
          table: { 
            body: [
              ["Fecha", historia.fecha.toLocaleDateString('es-AR', { dateStyle: 'full' })],
              ["Paciente", historia.paciente],
              ["Especialista", historia.especialista],
              ["Especialidad", historia.especialidad],
              ["Altura", historia.altura],
              ["Peso", historia.peso],
              ["Temperatura", historia.temperatura],
              ["Presión", historia.presion]
            ]
          }
        };
        debugger
        for (let prop of historia.adicionales) {
          tabla.table.body.push([prop[0], prop[1]]);
        }
  
        content.push(tabla);
      }
      
      const doc = { content: content };
      pdfMake.createPdf(doc).open();  
    } catch (err: any) {
      await this.logger.logError(err.toString());
    }
  }
}
