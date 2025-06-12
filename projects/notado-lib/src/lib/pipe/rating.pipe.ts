import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'rating',
    standalone: true
})
export class RatingPipe implements PipeTransform {

  transform(value: number): number {
    const result = (value / 10);
    return Math.floor(result * 10) / 10;
  }
}
