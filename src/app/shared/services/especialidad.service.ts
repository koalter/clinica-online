import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, setDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private get path(): string { 
    return 'especialidades';
  }
  
  constructor(private firestore: Firestore, private authService: AuthService) { }

  async traerTodos(): Promise<string[]> {
    const col = collection(this.firestore, this.path);
    const q = query(col);
    const querySnapshot = await getDocs(q);
    const resultado: string[] = [];

    querySnapshot.forEach(doc => {
      resultado.push(doc.id);
    });

    return resultado;
  }

  async agregar(item: string) {
    const documento = doc(this.firestore, this.path, item);

    await setDoc(documento, null);
  }

  async traerEspecialistas(especialidad: string) {
    const filtros: Record<any, string> = { especialidad: especialidad };
    return await this.authService.getEspecialistas(filtros);
  }
}
