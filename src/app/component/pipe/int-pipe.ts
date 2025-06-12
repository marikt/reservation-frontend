import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'toInt',
    standalone: true
})
export class IntPipe implements PipeTransform {

  constructor() {
  }

  public transform(value: number): number {
    return Math.trunc(value);
  }

}
