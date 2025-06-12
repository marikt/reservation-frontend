import {MyDate} from '../date';
import {Time} from '../time';
import {EventDateAndTime} from './event-date-and-time';

export class EventDateAndTimeAndId extends EventDateAndTime {
  public id: string
  public keyguruReservationId: string

  constructor(id: string,
              keyguruReservationId: string,
              date: MyDate,
              time: Time) {
    super(date, time);
    this.id = id;
    this.keyguruReservationId = keyguruReservationId;
  }

  public toJSON(): any {
    return {
      'id': this.id,
      'keyguruReservationId': this.keyguruReservationId,
      'date': this.date,
      'time': this.time,
    };
  }
}
