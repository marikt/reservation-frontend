import {filter, map} from 'rxjs/operators';
import {DataEvent} from '../util/data-event';
import {Event} from '../util/event.enum';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BroadcastService {


    private default: DataEvent = new DataEvent(Event.FIRST, '');
    private broadcastDataSubject: BehaviorSubject<DataEvent> = new BehaviorSubject<DataEvent>(this.default);

    public next(event: Event, data?: any): void {
        console.log('NEXT: ' + event + '   data: ' + data);
        let dataEvent: DataEvent;
        if (data) {
            dataEvent = new DataEvent(event, data);
        } else {
            dataEvent = new DataEvent(event, '');
        }
        return this.broadcastDataSubject.next(dataEvent);
    }

    public subject(event: Event): Observable<any> {
        return this.broadcastDataSubject.asObservable().pipe(
            filter(dataEvent => {
                    console.log('SUB: ' + dataEvent.event);
                    return dataEvent.event === event;
                }
            ),
            map((dataEvent) => dataEvent.data));
    }
}

