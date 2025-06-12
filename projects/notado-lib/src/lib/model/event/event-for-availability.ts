import {EventFromCalendar} from './event-from-calendar';

export class EventForAvailability extends EventFromCalendar {

  public workerId: number;
  public start: any;
  public end: any;
  public notadoEvent: boolean;
}

