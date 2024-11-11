import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true
})
export class PhoneFormatPipe implements PipeTransform {

  transform(value: string): string {

    const cleaned = ('' + value).replace(/\D/g, '');

    if (cleaned.length !== 10) {
      return value; 
    }

    const match = cleaned.match(/(\d{3})(\d{3})(\d{4})/);
    if (match) {
      return `${match[1]} - ${match[2]} - ${match[3]}`;
    }
    return value;
  }
}
