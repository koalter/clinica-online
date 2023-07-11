import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[soloLetras]'
})
export class CharacterValidatorDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) validar(event: any) {
    const key = event.key;
    const esAlfabetico = /^[a-zA-Z]$/.test(key);

    //en la validación indicó que la longitud de la tecla es 1
    //para verificar que no sea una tecla de comando (Ctrl, Alt, etc)
    if (!esAlfabetico && key.length === 1) {
      event.preventDefault();
    }
  }
}
