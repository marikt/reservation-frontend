import {DayOfWeek} from '../util/day-of-week';
import {Time} from './time';
import {EventFromCalendar} from './event/event-from-calendar';
import {MyDate} from './date';
import {ServiceMax} from './service-max';
import {ServiceCapacityType} from '../util/service-capacity-type';
import {ReservationConfig} from './reservation-config';

export class OpeningDay {

  public dayOfWeek: DayOfWeek;

  public openingDayRanges: OpeningDayRange[] = [];

  public close: boolean;

  /**
   * CALCULATED
   * TRANSIENT
   *
   *  true if this day ist scheduled overtimes
   *  (overtimes are defined using free events)
   *
   **/
  public scheduledOvertimes: boolean;

  /**
   *
   * @param date
   * @param openingDay
   * @param service
   * @param reservationConfig
   * @param alreadyExistingEventsInDay
   * @param alreadyExistingFreeEventsInDay
   */
  public static getTimeOfOpenings(date: MyDate,
                                  openingDay: OpeningDay,
                                  service: ServiceMax,
                                  reservationConfig: ReservationConfig,
                                  alreadyExistingEventsInDay: EventFromCalendar[],
                                  alreadyExistingFreeEventsInDay: EventFromCalendar[]): number[] {

    if (!openingDay) {
      return [];
    }

    if (openingDay.close && alreadyExistingFreeEventsInDay.length === 0) {
      return [];
    }

    let openingDayRangesCopy: OpeningDayRange[];
    if (openingDay.close) {
      openingDayRangesCopy = [];
    } else {
      openingDayRangesCopy = [...openingDay.openingDayRanges];
    }
    openingDayRangesCopy = this.mergeTimeRanges(openingDayRangesCopy, alreadyExistingFreeEventsInDay);

    if (!openingDayRangesCopy || openingDayRangesCopy.length === 0) {
      return [];
    }

    if (alreadyExistingEventsInDay && alreadyExistingEventsInDay.length > 0) {
      for (const calendarEventSimple of alreadyExistingEventsInDay) {
        if (calendarEventSimple.wholeDayEvent) {
          return [];
        }
      }
    }

    openingDay.scheduledOvertimes = true;
    const timeWindowSize: number = reservationConfig.timeWindowSize;

    const timeOfOpenings: number[] = [];
    let windowDurationInMinutes: number;
    if (timeWindowSize &&
      timeWindowSize > 0) {
      windowDurationInMinutes = timeWindowSize;
    } else {
      const serviceDuration: Time = service.duration;
      const servicePause: Time = service.pause;
      windowDurationInMinutes = Time.getDurationInMinutes(serviceDuration) + Time.getDurationInMinutes(servicePause);
      if (windowDurationInMinutes <= 0) {
        windowDurationInMinutes = 60;
        console.error('Service doesnt have set duration.');
      }
    }

    let serviceDurationInMinutes: number = Time.getDurationInMinutes(service.duration) + Time.getDurationInMinutes(service.pause);
    if (serviceDurationInMinutes <= 0) {
      serviceDurationInMinutes = 60;
    }

    let adjustedOpeningRanges: OpeningDayRange[] =
      OpeningDay.adjustOpeningRangesToExistingEvents(openingDayRangesCopy, alreadyExistingEventsInDay);

    const today: MyDate = new MyDate();
    if (MyDate.isEqual(date, today)) {
      adjustedOpeningRanges = OpeningDay.adjustTodayTime(adjustedOpeningRanges, serviceDurationInMinutes, reservationConfig);
    }

    adjustedOpeningRanges.forEach(
      range => {
        const fromMinutes = Time.getDurationInMinutes(range.from);
        const tillMinutes = Time.getDurationInMinutes(range.till);

        if (reservationConfig.timeWindowFrom && reservationConfig.timeWindowFrom === 'END') {
          for (let i = tillMinutes; i >= (fromMinutes + serviceDurationInMinutes); i = i - windowDurationInMinutes) {
            if (Number.isFinite(i)) {
              timeOfOpenings.push((i - windowDurationInMinutes));
            } else {
              console.error('01 Invalid value detected: ', i);
            }
          }
        } else {
          for (let i = fromMinutes; i <= (tillMinutes - serviceDurationInMinutes); i = i + windowDurationInMinutes) {
            if (Number.isFinite(i)) {
              timeOfOpenings.push(i);
            } else {
              console.error('02 Invalid value detected: ', i);
            }
          }
        }
      }
    );
    return timeOfOpenings;
  }

  public static getDefaultValue(): OpeningDay[] {
    const openingDays = [];
    openingDays[0] = new OpeningDay(DayOfWeek.MONDAY);
    openingDays[1] = new OpeningDay(DayOfWeek.TUESDAY);
    openingDays[2] = new OpeningDay(DayOfWeek.WEDNESDAY);
    openingDays[3] = new OpeningDay(DayOfWeek.THURSDAY);
    openingDays[4] = new OpeningDay(DayOfWeek.FRIDAY);
    openingDays[5] = new OpeningDay(DayOfWeek.SATURDAY);
    openingDays[6] = new OpeningDay(DayOfWeek.SUNDAY);
    return openingDays;
  }

  private static mergeTimeRanges(openingDayRange: OpeningDayRange[], alreadyExistingFreeEvents: EventFromCalendar[]): OpeningDayRange[] {
    if (!alreadyExistingFreeEvents || alreadyExistingFreeEvents.length === 0) {
      return openingDayRange;
    }

    const openingDayRangeBaseOnFreeEvents: OpeningDayRange[] = [];
    alreadyExistingFreeEvents.sort((e1, e2) => {
      return Time.compare(e1.startTime, e2.startTime)
    });
    for (let i = 0; i < alreadyExistingFreeEvents.length; i++) {
      const op: OpeningDayRange = new OpeningDayRange();
      op.from = alreadyExistingFreeEvents[i].startTime;
      op.till = alreadyExistingFreeEvents[i].endTime;
      op.seq = i + '';
      openingDayRangeBaseOnFreeEvents.push(op);
    }

    const mergedResult = [...openingDayRange, ...openingDayRangeBaseOnFreeEvents];
    mergedResult.sort((a, b) => {
      return Time.compare(a.from, b.from)
    });

    const merged: OpeningDayRange[] = [];
    let currentRange: OpeningDayRange | null = null;

    for (const range of mergedResult) {
      if (!currentRange) {
        currentRange = range;
        continue;
      }

      // Check if the current range is overlapping or adjacent with the next range
      if (Time.isBefore(currentRange.till, range.from) || Time.isEqual(currentRange.till, range.from)) {
        merged.push(currentRange);
        currentRange = range;
      } else if (Time.isBefore(range.till, currentRange.till)) {          // Merge the overlapping ranges
        // If the next range ends before the current range, skip it
        continue;
      } else {
        // Otherwise, extend the current range to include the next range
        currentRange.till = range.till;
      }
    }
    if (currentRange) {
      merged.push(currentRange);
    }
    return merged;
  }

  private static adjustOpeningRangesToExistingEvents(openingDayRanges: OpeningDayRange[],
                                                     alreadyExistingEvents: EventFromCalendar[]): OpeningDayRange[] {
    const openingDayRangesCopy: OpeningDayRange[] = [...openingDayRanges];
    if (!alreadyExistingEvents || alreadyExistingEvents.length === 0) {
      return openingDayRangesCopy;
    }

    const adjustedOpeningDayRanges: OpeningDayRange[] = [];

    for (const openingRange of openingDayRangesCopy) {
      let openingRangeCopy = new OpeningDayRange();
      openingRangeCopy.from = openingRange.from;
      openingRangeCopy.till = openingRange.till;
      openingRangeCopy.seq = openingRange.seq;

      let rangeStart = Time.getDurationInMinutes(openingRangeCopy.from);
      let rangeEnd = Time.getDurationInMinutes(openingRangeCopy.till);

      for (const alreadyExistingEvent of alreadyExistingEvents) {

        const eventStart = Time.getDurationInMinutes(alreadyExistingEvent.startTime);
        const eventEnd = Time.getDurationInMinutes(Time.plus(alreadyExistingEvent.startTime, alreadyExistingEvent.duration));

        if (eventEnd <= rangeStart) {
          continue;
        }

        if (eventStart >= rangeEnd) {
          continue;
        }

        if (eventStart <= rangeStart && eventEnd >= rangeEnd) {
          openingRangeCopy = null;
          break;
        }

        if (eventStart <= rangeStart && eventEnd <= rangeEnd) {
          rangeStart = eventEnd;
        } else if (eventStart >= rangeStart && eventEnd <= rangeEnd) {
          const newAlreadyExistingEvent: OpeningDayRange = new OpeningDayRange();
          newAlreadyExistingEvent.from = Time.getTimeFromMinutes(eventEnd);
          newAlreadyExistingEvent.till = Time.getTimeFromMinutes(rangeEnd);
          openingDayRangesCopy.push(newAlreadyExistingEvent);

          rangeEnd = eventStart;
        } else if (eventStart >= rangeStart && eventEnd >= rangeEnd) {
          rangeEnd = eventStart;
        }
      }

      if (openingRangeCopy) {
        openingRangeCopy.from = Time.getTimeFromMinutes(rangeStart);
        openingRangeCopy.till = Time.getTimeFromMinutes(rangeEnd);
        adjustedOpeningDayRanges.push(openingRangeCopy);
      }
    }

    return adjustedOpeningDayRanges;
  }

  /**
   * Calculates the next available time based on the current time, service duration, and rounding interval
   * @param serviceDurationInMinutes The duration of the service in minutes
   * @param reservationConfig Optional reservation configuration with time rounding settings
   * @returns The next available time
   */
  private static calculateNextAvailableTodayTime(serviceDurationInMinutes: number,
                                                 reservationConfig?: ReservationConfig): Time {
    const currentTime: Time = Time.currentTime();
    if (reservationConfig && reservationConfig.timeRoundingInterval) {
      switch (reservationConfig.timeRoundingInterval) {
        case 'QUARTER_HOUR':
          if (currentTime.minutes < 15) {
            return new Time(currentTime.hours, 15);
          }
          if (currentTime.minutes < 30) {
            return new Time(currentTime.hours, 30);
          }
          if (currentTime.minutes < 45) {
            return new Time(currentTime.hours, 45);
          }
          return new Time(currentTime.hours + 1, 0);
        case 'HALF_HOUR':
          if (currentTime.minutes < 30) {
            return new Time(currentTime.hours, 30);
          }
          return new Time(currentTime.hours + 1, 0);
        case 'HOUR':
          return new Time(currentTime.hours + 1, 0);
        default:
          break;
      }
    }
    if (serviceDurationInMinutes >= 30) {
      if (currentTime.minutes < 30) {
        return new Time(currentTime.hours, 30);
      }
      return new Time(currentTime.hours + 1, 0);
    } else {
      if (currentTime.minutes < 15) {
        return new Time(currentTime.hours, 15);
      }
      if (currentTime.minutes < 30) {
        return new Time(currentTime.hours, 30);
      }
      if (currentTime.minutes < 45) {
        return new Time(currentTime.hours, 45);
      }
      return new Time(currentTime.hours + 1, 0);
    }
  }

  private static adjustTodayTime(openingDayRanges: OpeningDayRange[],
                                 serviceDurationInMinutes: number,
                                 reservationConfig?: ReservationConfig): OpeningDayRange[] {
    if (!openingDayRanges || openingDayRanges.length === 0) {
      return openingDayRanges;
    }

    const currentTime: Time = Time.currentTime();

    for (let i = 0; i < openingDayRanges.length; i++) {
      const openingDayRange = openingDayRanges[i];

      if (Time.isAfter(openingDayRange.from, currentTime)) {
        return openingDayRanges;
      }

      if (Time.isBefore(openingDayRange.till, currentTime)) {
        openingDayRanges.splice(i, 1);
        i--;
      } else {
        const newRange: OpeningDayRange = new OpeningDayRange();
        newRange.from = this.calculateNextAvailableTodayTime(serviceDurationInMinutes, reservationConfig);
        newRange.till = openingDayRange.till;
        newRange.seq = openingDayRange.seq;
        openingDayRanges[i] = newRange;
      }
    }
    return openingDayRanges;
  }

  constructor(dayOfWeek: DayOfWeek) {
    this.dayOfWeek = dayOfWeek;

    this.openingDayRanges = [];
    const timeRange: OpeningDayRange = new OpeningDayRange();
    timeRange.from = new Time(8, 0);
    timeRange.till = new Time(18, 0);
    this.openingDayRanges.push(timeRange);
    this.close = false;
  }
}

export class OpeningDayRange {
  public from: Time;
  public till: Time;

  public seq: string;

  constructor() {
  }

}
