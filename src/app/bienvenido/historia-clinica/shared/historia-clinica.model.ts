import { KeyValue } from "@angular/common";
import { Especialista, Paciente } from "../../../shared/domains/usuario.model";

export class HistoriaClinica {
  paciente: string = "";
  especialista: string = "";
  especialidad: string = "";
  altura: number = 0;
  peso: number = 0;
  temperatura: number = 0;
  presion: number = 0;
  fecha: Date = new Date();
  private _adicionales: Map<string, string> = new Map();

  constructor(paciente: string, especialista: string, especialidad: string, altura: number, peso: number,
    temperatura: number, presion: number, adicionales: KeyValue<string, string>[]) {
    if (adicionales.length > 3) {
      throw new Error('La cantidad máxima permitida de datos adicionales es tres (3)');
    }
    
    this.paciente = paciente;
    this.especialista = especialista;
    this.especialidad = especialidad;
    this.altura = altura;
    this.peso = peso;
    this.temperatura = temperatura;
    this.presion = presion;
    this.fecha = new Date();
    this._adicionales = new Map();

    for (let item of adicionales) {
      this.set(item.key, item.value);
    }
  }

  get adicionales() {
    return this._adicionales.entries();
  }
  
  set(clave: string, valor: string): boolean {
    if (this._adicionales.size < 3) {
      this._adicionales.set(clave, valor);
      return true;
    }
    return false;
  }

  get(clave: string): string | undefined {
    return this._adicionales.get(clave);
  }

  pacienteDetalles?: Paciente;
  especialistaDetalles?: Especialista;
}

// export class HistoriaClinica {
//   paciente: string = "";
//   folios: Folio[] = [];

//   pacienteDetalles?: Paciente;
// }

// export class Folio {
//   paciente: string = "";
//   altura: number = 0;
//   peso: number = 0;
//   temperatura: number = 0;
//   presion: number = 0;
//   adicionales: Record<string, string>[] = [];
// }
