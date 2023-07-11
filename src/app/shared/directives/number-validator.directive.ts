import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[soloNumeros]'
})
export class NumberValidatorDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) validar(event: any) {
    const key = event.key;
    const esNumerico = /^[0-9]$/.test(key);

    //en la validación indicó que la longitud de la tecla es 1
    //para verificar que no sea una tecla de comando (Ctrl, Alt, etc)
    if (!esNumerico && key.length === 1) {
      event.preventDefault();
    }
  }

}
