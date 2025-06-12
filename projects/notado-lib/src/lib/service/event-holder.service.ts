import {Injectable} from '@angular/core';
import {EventFromCalendar} from '../model/event/event-from-calendar';
import {MyDate} from '../model/date';
import {YearMonth} from '../util/year-month';
import {ServiceMax} from '../model/service-max';
import {Duration} from '../model/duration';
import {ServiceCapacityType} from '../util/service-capacity-type';
import {ServiceType} from '../enum/service-type';


@Injectable({
  providedIn: 'root'
})
export class EventHolderService {
  private alreadyExistingEventsMapByDate: Map<String, EventFromCalendar[]> = new Map<String, EventFromCalendar[]>();
  private withCapacityEventsMapByDate: Map<String, EventFromCalendar[]> = new Map<String, EventFromCalendar[]>();
  //cache to prevent loading events for range whitch was already loaded
  private loadedRanges: { from: string; till: string }[] = [];
  public alreadyExistingEvents: EventFromCalendar[];
  public alreadyExistingFreeEvents: EventFromCalendar[];
  public withCapacityEvents: EventFromCalendar[];

  public clear() {
    this.alreadyExistingEventsMapByDate = new Map<String, EventFromCalendar[]>();
    this.withCapacityEventsMapByDate = new Map<String, EventFromCalendar[]>();
    this.alreadyExistingEvents = [];
    this.alreadyExistingFreeEvents = [];
    this.withCapacityEvents = [];
    this.loadedRanges = [];
  }

  public getEventsByDate(date: MyDate): EventFromCalendar[] {
    const key: string = this.toKey(date);
    const calendarEventSimples: EventFromCalendar[] = this.alreadyExistingEventsMapByDate.get(key);
    if (calendarEventSimples) {
      return calendarEventSimples;
    }
    return [];
  }

  public getWithCapacityEventsByDate(date: MyDate): EventFromCalendar[] {
    const key: string = this.toKey(date);
    const calendarEventSimples: EventFromCalendar[] = this.withCapacityEventsMapByDate.get(key);
    if (calendarEventSimples) {
      return calendarEventSimples;
    }
    return [];
  }

  private toKey(date: MyDate): string {
    return date.year + '-' + date.month + '-' + date.day;
  }

  private toYearMonthKey(yearMonth: YearMonth): string {
    return yearMonth.year + '-' + yearMonth.month;
  }

  public setEvents(events: EventFromCalendar[], from: YearMonth, till: YearMonth, service: ServiceMax) {
    const fromKey = this.toYearMonthKey(from);
    const tillKey = this.toYearMonthKey(till);

    if (this.isLoaded(from, till)) {
      return;
    }

    for (const event of events) {
      if (event && event.free) {
        this.alreadyExistingFreeEvents.push(event);
      } else {
        // keep here events with capacity as well so they are blocking
        // as we will add event to this event not to empty window
        this.alreadyExistingEvents.push(event);
        const key: string = this.toKey(event.startDate);
        let eventsByDate: EventFromCalendar[] = this.alreadyExistingEventsMapByDate.get(key);
        if (!eventsByDate) {
          eventsByDate = [];
          this.alreadyExistingEventsMapByDate.set(key, eventsByDate);
        }
        eventsByDate.push(event);
      }

      if (event &&
        !event.free &&
        event.hasCapacity &&
        (service.type === ServiceType.APPOINTMENT || service.type === ServiceType.DEVICE) &&
        service.capacityType === ServiceCapacityType.MANY_TO_ONE &&
        Duration.isEqual(service.duration, Duration.toDuration(event.duration))) {
        // check the duration of event in case that event was edited or duration of service changed, in such case you can't add attendee to this event
        this.withCapacityEvents.push(event);
        const key: string = this.toKey(event.startDate);
        let eventsByDate: EventFromCalendar[] = this.withCapacityEventsMapByDate.get(key);
        if (!eventsByDate) {
          eventsByDate = [];
          this.withCapacityEventsMapByDate.set(key, eventsByDate);
        }
        eventsByDate.push(event);
      }
    }

    this.loadedRanges.push({from: fromKey, till: tillKey});
  }

  public isLoaded(from: YearMonth, till: YearMonth): boolean {
    const fromKey = this.toYearMonthKey(from);
    const tillKey = this.toYearMonthKey(till);

    return this.loadedRanges.some(range =>
      range.from === fromKey && range.till === tillKey
    );
  }
}
