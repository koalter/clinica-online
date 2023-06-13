import { FirebaseError } from '@angular/fire/app';

export class AuthError extends Error {
    innerError: FirebaseError;

    constructor(innerError: FirebaseError) {
        let mensaje: string;
        switch (innerError.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                mensaje = 'Clave o usuario incorrecto'; break;
            case 'auth/email-already-in-use':
                mensaje = 'Usuario ya existente'; break;
            case 'auth/weak-password':
                mensaje = 'Clave inválida'; break;
            case 'auth/invalid-email':
                mensaje = 'Correo inválido'; break;
            default:
                mensaje = 'Hubo un error en la solicitud'; break;
        }
        super(mensaje);
        this.innerError = innerError;
    }
}
