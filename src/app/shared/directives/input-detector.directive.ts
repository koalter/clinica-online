import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[detectarInput]'
})
export class InputDetectorDirective {

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
    this.highlight(event.key);
  }

  @HostListener('keyup', ['$event']) onKeyup(event: KeyboardEvent) {
    this.highlight();
  }

  highlight(value?: string) {
    if (value === 'Backspace') {
      this.el.nativeElement.style.backgroundColor = 'lightcoral';
    } else {
      if (value) {
        this.el.nativeElement.style.backgroundColor = 'lightgreen';
      } else {
        this.el.nativeElement.style.backgroundColor = '';
      }
    }
  }
}
