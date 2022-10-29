import { Administrador } from "./Administrador";
import { Especialista } from "./Especialista";
import { Paciente } from "./Paciente";

export class UsuarioFactory {
  static CrearUsuario(data: any, correo: string, rol: string) {
    switch(rol.toLowerCase()) {
      case 'paciente':
        return new Paciente(correo, data.nombre, data.apellido, data.edad, data.dni, data.imagen, rol.toLowerCase(), data.imagenB, data.obraSocial);
      case 'especialista':
        return new Especialista(correo, data.nombre, data.apellido, data.edad, data.dni, data.imagen, rol.toLowerCase(), data.especialidad);
      case 'administrador':
        return new Administrador(correo, data.nombre, data.apellido, data.edad, data.dni, data.imagen, rol.toLowerCase());
      default:
        const mensaje = `El rol del usuario: ${correo} es inválido`;
        throw new Error(mensaje);       
    }
  }
}