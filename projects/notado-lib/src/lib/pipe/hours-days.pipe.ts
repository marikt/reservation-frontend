import {Pipe, PipeTransform} from '@angular/core';
import {Duration} from '../model/duration';

@Pipe({
    name: 'hoursDays',
    standalone: true
})
export class HoursDaysPipe implements PipeTransform {


  transform(duration: Duration, args?: any): number {
    if (!duration) {
      return 1;
    }
    if (duration.days && duration.days > 0) {
      return duration.days;
    }
    return duration.hours;
  }
}
