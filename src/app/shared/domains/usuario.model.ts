export abstract class Usuario {
    nombre!: string;
    apellido!: string;
    edad!: number;
    dni!: number;
    mail!: string;
    clave!: string;
    imagen!: string;
    rol!: string;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, clave: string, imagen: string) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.clave = clave;
        this.imagen = imagen;
    }
}

export class Paciente extends Usuario {
    imagenB!: string;
    obraSocial!: string;
    verificado!: boolean;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, clave: string, imagen: string, imagenB: string, obraSocial: string) {
        super(nombre, apellido, edad, dni, mail, clave, imagen);
        this.imagenB = imagenB;
        this.obraSocial = obraSocial;
        this.verificado = false;
        this.rol = Paciente.name;
    }
}

export class Especialista extends Usuario {
    especialidad!: string;
    verificado!: boolean;
    habilitado!: boolean;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, clave: string, imagen: string, especialidad: string) {
        super(nombre, apellido, edad, dni, mail, clave, imagen);
        this.especialidad = especialidad;
        this.verificado = false;
        this.habilitado = false;
        this.rol = Especialista.name;
    }
}

export class Administrador extends Usuario {
    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, clave: string, imagen: string) {
        super(nombre, apellido, edad, dni, mail, clave, imagen);
        this.rol = Administrador.name;
    }
}