export class Usuario {
    //#region Atributos
    private correo: string;
    private nombre: string;
    private apellido: string;
    private edad: number;
    private dni: number;
    private imagen: string;
    private rol: string;
    //#endregion

    //#region Getters
    public get Correo(): string {
        return this.correo;
    }

    public get Nombre(): string {
        return this.nombre;
    }

    public get Apellido(): string {
        return this.apellido;
    }

    public get Edad(): number {
        return this.edad;
    }

    public get DNI(): number {
        return this.dni;
    }

    public get Imagen(): string {
        return this.imagen;
    }

    public get Rol() : string {
        return this.rol;
    }
    //#endregion
    
    //#region Constructor
    constructor(correo: string, nombre: string, apellido: string, edad: number, dni: number, imagen: string, rol: string) {
        this.correo = correo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.imagen = imagen;
        this.rol = rol;
    }
    //#endregion
}
