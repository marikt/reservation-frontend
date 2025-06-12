import {Pipe, PipeTransform} from '@angular/core';
import {Duration} from '../model/duration';

@Pipe({
    name: 'daysHoursMinutes',
    standalone: true
})
export class DaysHoursMinutesPipe implements PipeTransform {

  transform(duration: Duration, args?: any): string {
    if (!duration) {
      return '';
    }
    if (duration.days > 0) {
      return duration.days + 'd';
    }

    if (duration.minutes <= 0) {
      return duration.hours + 'h';
    }
    return duration.hours + 'h' + ' ' + duration.minutes + 'min';
  }
}
