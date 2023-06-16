export class Especialidad {
    especialista: string;
    especialidad: string;
    horario: Horario[];
    
    constructor(especialista: string, especialidad: string, horario?: Horario[]) {
        this.especialista = especialista;
        this.especialidad = especialidad;
        if (horario && horario.length > 0) {
            this.horario = horario;
        } else {
            this.horario = [
                new Horario(Dias.Lunes),
                new Horario(Dias.Martes),
                new Horario(Dias.Miercoles),
                new Horario(Dias.Jueves),
                new Horario(Dias.Viernes),
                new Horario(Dias.Sabado)
            ];
        }
    }

    getHorario(dia: string) {
        return this.horario.find(h => h.dia == dia);
    }
}

export class Horario {
    dia: Dias;
    horas: Hora[];

    constructor(dia: Dias, horas?: Hora[]) {
        this.dia = dia;

        if (horas) {
            this.horas = horas;
        } else {
            if (dia == Dias.Sabado) {
                this.horas = HORARIO_SABADO.slice();
            } else {
                this.horas = HORARIO_NORMAL.slice();
            }
        }
    }

    getHora(hora: string) {
        return this.horas.find(h => h.hora === hora);
    }
}

export class Hora {
    hora: string;
    estado: EstadoHora;

    constructor(hora: string, estado: EstadoHora = EstadoHora.Deshabilitado) {
        this.hora = hora;
        this.estado = estado;
    }
}

export enum EstadoHora {
    Deshabilitado = 'Deshabilitado',
    Libre = 'Libre',
    Ocupado = 'Ocupado'
}

export enum Dias {
    Lunes = 'Lunes',
    Martes = 'Martes',
    Miercoles = 'Miércoles',
    Jueves = 'Jueves',
    Viernes = 'Viernes',
    Sabado = 'Sábado'
}

export class EspecialistaMapper {
    static toUntyped(fuente: Especialidad): {} {
        const horarios: any[] = [];
        
        fuente.horario.forEach(horario => {
            const horas: any[] = [];
            horario.horas.forEach(hora => {
            horas.push({ hora: hora.hora, estado: hora.estado.toString() });
            });
            horarios.push({ dia: horario.dia, horas: horas });
        });

        return {
            especialista: fuente.especialista,
            especialidad: fuente.especialidad,
            horario: horarios
        };
    }

    static toTyped(especialidad: any) {
        const horarios: Horario[] = [];

        especialidad['horario'].forEach((horario: { [x: string]: any; }) => {
            const horas: Hora[] = [];
            horario['horas'].forEach((hora: { [x: string]: any; }) => {
            horas.push(new Hora(hora['hora'], hora['estado']));
            });
            horarios.push(new Horario(horario['dia'], horas));
        });

        return new Especialidad(especialidad['especialista'], especialidad['especialidad'], horarios);
    }
}

const HORARIO_SABADO = [
    new Hora('08:00'), new Hora('08:30'), new Hora('09:00'), new Hora('09:30'),
    new Hora('10:00'), new Hora('10:30'), new Hora('11:00'), new Hora('11:30'),
    new Hora('12:00'), new Hora('12:30'), new Hora('13:00'), new Hora('13:30')
];
const HORARIO_NORMAL = [
    new Hora('08:00'), new Hora('08:30'), new Hora('09:00'), new Hora('09:30'), new Hora('10:00'), new Hora('10:30'),
    new Hora('11:00'), new Hora('11:30'), new Hora('12:00'), new Hora('12:30'), new Hora('13:00'), new Hora('13:30'),
    new Hora('14:00'), new Hora('14:30'), new Hora('15:00'), new Hora('15:30'), new Hora('16:00'), new Hora('16:30'),
    new Hora('17:00'), new Hora('17:30'), new Hora('18:00'), new Hora('18:30')
];