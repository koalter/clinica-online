export class LogUsuario {
    usuario: string;
    fecha: Date;

    constructor(usuario: string, fecha: Date | string) {
        this.usuario = usuario;

        if (typeof fecha === 'string') {
            this.fecha = new Date(fecha);
        } else {
            this.fecha = fecha;
        }
    }
}
