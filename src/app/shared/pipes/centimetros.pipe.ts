import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'centimetros'
})
export class CentimetrosPipe implements PipeTransform {

  transform(value: number, format: string = 'short'): string | null {
    let suffix: string;

    switch (format) {
      case 'long':
        suffix = value === 1 ? 'centímetro' : 'centímetros';
        break;
      case 'short':
        suffix = value === 1 ? 'cm.' : 'cms.';
        break;
      default:
        return null;
    }

    return `${value} ${suffix}`;
  }

}
