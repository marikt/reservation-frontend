import {MyDate} from '../date';
import {Time} from '../time';

export class EventDateAndTime {

  public date: MyDate;
  public time: Time;

  constructor(date: MyDate, time: Time) {
    this.date = date;
    this.time = time;
  }

  public toJSON(): any {
    return {
      'date': this.date,
      'time': this.time,
    };
  }
}
