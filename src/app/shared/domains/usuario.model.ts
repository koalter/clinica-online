export abstract class Usuario {
    nombre!: string;
    apellido!: string;
    edad!: number;
    dni!: number;
    mail!: string;
    imagen!: string;
    rol!: string;
    verificado!: boolean;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, verificado: boolean = false) {
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
    imagenB!: string;
    obraSocial!: string;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, imagenB: string, obraSocial: string, verificado: boolean = false) {
        super(nombre, apellido, edad, dni, mail, imagen, verificado);
        this.imagenB = imagenB;
        this.obraSocial = obraSocial;
        this.rol = Paciente.name.toLowerCase();
    }
}

export class Especialista extends Usuario {
    especialidad!: string;
    habilitado!: boolean;

    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, especialidad: string, verificado: boolean = false, habilitado: boolean = false) {
        super(nombre, apellido, edad, dni, mail, imagen, verificado);
        this.especialidad = especialidad;
        this.habilitado = habilitado;
        this.rol = Especialista.name.toLowerCase();
    }
}

export class Administrador extends Usuario {
    constructor(nombre: string, apellido: string, edad: number, dni: number, mail: string, imagen: string, verificado: boolean = false) {
        super(nombre, apellido, edad, dni, mail, imagen, verificado);
        this.rol = Administrador.name.toLowerCase();
    }
}