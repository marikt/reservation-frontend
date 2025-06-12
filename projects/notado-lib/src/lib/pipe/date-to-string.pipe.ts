import {Pipe, PipeTransform} from '@angular/core';
import {MyDate} from '../model/date';

@Pipe({
    name: 'dateToString',
    standalone: true
})
export class DateToStringPipe implements PipeTransform {

  transform(date: MyDate, args?: any): string {
    if (!date) {
      return '';
    }

    return date.day + '.' + date.month + '.' + date.year
  }
}
