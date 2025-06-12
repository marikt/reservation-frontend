import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'textShort',
    standalone: true
})
export class TextShortPipe implements PipeTransform {

    transform(value: string, charNo: number): any {
        if (!value) {
            return;
        }

        if (value.length < charNo) {
            return value;
        }
        return value.substring(0, charNo) + '...';
    }

}
