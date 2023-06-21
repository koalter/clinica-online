export abstract class Usuario {
    nombre: string;
    apellido: string;
    edad: number;
    dni: number;
    mail: string;
    imagen: string;
    rol!: string;
    verificado?: boolean;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, verificado?: boolean) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.imagen = imagen;
        this.verificado = verificado;
    }
}

export class Paciente extends Usuario {
    imagenB: string;
    obraSocial: string;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, imagenB: string, obraSocial: string, verificado?: boolean) {
        super(nombre, apellido, edad, dni, mail, imagen, verificado);
        this.imagenB = imagenB;
        this.obraSocial = obraSocial;
        this.rol = 'paciente';
    }
}

export class Especialista extends Usuario {
    especialidades: string[];
    habilitado: boolean;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, especialidades: string[], habilitado: boolean = false, verificado?: boolean) {
        super(nombre, apellido, edad, dni, mail, imagen, verificado);
        this.especialidades = especialidades;
        this.habilitado = habilitado;
        this.rol = 'especialista';
    }
}

export class Administrador extends Usuario {
    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, verificado?: boolean) {
        super(nombre, apellido, edad, dni, mail, imagen, verificado);
        this.rol = 'administrador';
    }
}
