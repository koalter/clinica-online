import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatura'
})
export class TemperaturaPipe implements PipeTransform {

  transform(value: number, format: string = 'celcius'): string | null {
    let suffix: string;

    switch (format) {
      case 'celcius':
        suffix = '°C';
        break;
      case 'fahrenheit':
        suffix = '°F';
        break;
      case 'kelvin':
        suffix = 'K';
        break;
      default:
        return null;
    }

    return `${value}${suffix}`;
  }

}
