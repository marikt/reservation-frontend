import {Time} from './time';

export class Duration {
  public days: number;
  public hours: number;
  public minutes: number;

  public static toString(duration: Duration): string {
    return ('0' + duration.hours).slice(-2) + ':' + ('0' + duration.minutes).slice(-2);
  }

  public static isFullDayDuration(duration: Duration): boolean {
    return duration.days && duration.days > 0;
  }

  public static isEqual(a: Duration, b: Duration): boolean {
    if (a.days === b.days && a.minutes === b.minutes && a.hours === b.hours) {
      return true;
    }
    return false;
  }

  public static plus(a: Duration, b: Duration): Duration {
    return new Duration((a.days + b.days), (a.hours + b.hours), (a.minutes + b.minutes));
  }

  constructor(days: number, hour: number, minutes: number) {
    this.days = days;
    this.hours = hour;
    this.minutes = minutes;
  }

  public static toDuration(time: Time): Duration {
    return new Duration(0, time.hours, time.minutes);
  }


}
