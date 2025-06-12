import {Pipe, PipeTransform} from '@angular/core';
import {Duration} from '../model/duration';

@Pipe({
    name: 'hoursDaysLabel',
    standalone: true
})
export class HoursDaysLabelPipe implements PipeTransform {

  private PREFIX: string = 'FORM.DURATION.';

  transform(duration: Duration, args?: any): string {
    if (!duration) {
      return '';
    }
    if (duration.days && duration.days === 1) {
      return this.PREFIX + 'DAY';
    }
    if (duration.days && duration.days > 1 && duration.days < 5) {
      return this.PREFIX + 'DAYS';
    }
    if (duration.days && duration.days >= 5) {
      return this.PREFIX + 'DAYS2';
    }
    if (duration.hours === 1) {
      return this.PREFIX + 'HOUR';
    }
    if (duration.hours > 1 && duration.hours < 5) {
      return this.PREFIX + 'HOURS';
    }
    return this.PREFIX + 'HOURS2';
  }
}
