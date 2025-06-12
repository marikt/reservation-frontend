import {Calendar} from './calendar';
import {EventForAvailability} from './event/event-for-availability';

export class CalendarForAvailability extends Calendar {

  public img: string;
  public show: boolean;
  public type: CalendarForAvailabilityType;
  public calendarEventForAvailability: EventForAvailability[];

}

export enum CalendarForAvailabilityType {
  HOLIDAY = 'HOLIDAY',
  BUSINESS = 'BUSINESS',
  COURSE = 'COURSE',
  DEVICE = 'DEVICE',
  WORKER = 'WORKER'
}
