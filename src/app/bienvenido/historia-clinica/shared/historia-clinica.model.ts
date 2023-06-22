import { Especialista, Paciente } from "src/app/shared/domains/usuario.model";

export class HistoriaClinica {
  paciente: string = "";
  especialista: string = "";
  altura: number = 0;
  peso: number = 0;
  temperatura: number = 0;
  presion: number = 0;
  adicionales: Record<string, string>[] = [];

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
