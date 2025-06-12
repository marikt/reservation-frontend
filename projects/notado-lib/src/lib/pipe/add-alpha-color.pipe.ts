import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'addAlphaColor'
})
export class AddAlphaColorPipe implements PipeTransform {
  transform(input: string, alpha: number): string {

    if (!input) {
      return 'rgba(0, 0, 0, 0.1)'; // default return for null/undefined input
    }

    if (input.startsWith('rgba')) {
      return input;
    }

    if (input.startsWith('rgb')) {
      const rgbValues = input.match(/\d+/g);
      if (rgbValues && rgbValues.length === 3) {
        return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;
      }
      return 'rgba(0, 0, 0, 0.1)';
    }

    if (!input || input[0] !== '#' || (input.length !== 7 && input.length !== 4)) {
      return 'rgba(0, 0, 0, 0.1)';
    }
    if (input.length === 4) {
      input = '#' + input[1] + input[1] + input[2] + input[2] + input[3] + input[3];
    }

    const r = parseInt(input.slice(1, 3), 16);
    const g = parseInt(input.slice(3, 5), 16);
    const b = parseInt(input.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
