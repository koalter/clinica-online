import { Injectable } from '@angular/core';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioFactory } from 'src/app/models/UsuarioFactory';

@Injectable({
  providedIn: 'root'
})
export class ListadoService {

  constructor(private firestore: Firestore) { }

  async traerUsuarios(...categorias: string[]) {
    const q = query(collection(this.firestore, "usuarios"), where("rol", "in", categorias));
    const resultado: any[] = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const usuario: Usuario = UsuarioFactory.CrearUsuario(data, doc.id, data['rol']);
      resultado.push(usuario);
    });

    return resultado;
  }
}
