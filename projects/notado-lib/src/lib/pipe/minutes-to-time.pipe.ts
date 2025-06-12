import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'minutesToTime',
    standalone: true
})
export class MinutesToTimePipe implements PipeTransform {

    transform(minutes: number, args?: any): string {

        if (minutes === 0) {
          return '0:00';
        }
        if (!minutes) {
            return '';
        }

        return Math.trunc(minutes / 60) + ':' + ('0' + (minutes % 60)).slice(-2);
    }
}
