import {Event} from './event.enum';

export class DataEvent {
    event: Event;
    data: any;

    constructor(event: Event, data: any) {
        this.event = event;
        this.data = data;
    }
}
