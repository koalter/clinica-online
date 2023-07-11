import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kilos'
})
export class KilogramosPipe implements PipeTransform {

  transform(value: number, format: string = 'short'): string | null {
    let suffix: string;

    switch (format) {
      case 'long':
        suffix = value === 1 ? 'kilogramo' : 'kilogramos';
        break;
      case 'short':
        suffix = value === 1 ? 'kg.' : 'kgs.';
        break;
      default:
        return null;
    }

    return `${value} ${suffix}`;
  }

}
