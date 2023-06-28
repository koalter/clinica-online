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
