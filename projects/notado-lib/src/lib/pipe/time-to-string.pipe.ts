import {Pipe, PipeTransform} from '@angular/core';
import {Time} from '../model/time';

@Pipe({
    name: 'timeToString',
    standalone: true
})
export class TimeToStringPipe implements PipeTransform {

    transform(time: Time, args?: any): string {
        if (!time) {
            return '';
        }

        if (time.hours != null && time.minutes != null) {
            return time.hours + ':' + ('0' + time.minutes).slice(-2);
        }
        return '';
    }
}
