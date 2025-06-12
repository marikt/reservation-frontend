import {MyDate} from '../date';
import {Time} from '../time';
import {ServiceType} from '../../enum/service-type';

export class EventFromCalendar {

  public id: string;
  public calendarId: string;
  public title: string;
  public businessId: number;
  public serviceId: number;
  public type: ServiceType;
  public wholeDayEvent: boolean;
  public startDate: MyDate;
  public endDate: MyDate;
  public startTime: Time;
  public keyguruReservationId: string;
  public remainingCapacity: number = -1;

  /**
   * for course to show from - till
   */
  public endTime: Time;
  public duration: Time;
  public hasCapacity: boolean;

  /**
   * Reflect the flag from google calendar busy/free events,
   * For notado free means that worker is available for this event even outside of working hrs
   */
  public free: boolean;

  constructor() {
  }

}
