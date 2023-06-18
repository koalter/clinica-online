import { WhereFilterOp } from '@firebase/firestore'

export interface Filtro {
    clave: string;
    operador: WhereFilterOp;
    valor: string | string[];
}
