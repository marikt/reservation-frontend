
export class Time {
  public hours: number;
  public minutes: number;

  public static toString(time: Time): string {
    return ('0' + time.hours).slice(-2) + ':' + ('0' + time.minutes).slice(-2);
  }

  public static isEqual(a: Time, b: Time): boolean {
    if (a.minutes === b.minutes && a.hours === b.hours) {
      return true;
    }
    return false;
  }

  public static plus(a: Time, b: Time): Time {
    return new Time((a.hours + b.hours), (a.minutes + b.minutes));
  }

  public static getDurationInMinutes(time: Time): number {
    if (!time) {
      return 0;
    }
    return (time.hours * 60) + time.minutes;
  }

  public static getTimeFromMinutes(minutes: number): Time {
    if (minutes == null) {
      return null
    }
    if (minutes === 0) {
      return new Time(0, 0);
    }
    return new Time(Math.trunc(minutes / 60), minutes % 60);
  }

  public static fromString(time: string): Time {
    const hours: number = +time.substr(0, 2);
    const minutes: number = +time.substr(3, 4);
    return new Time(hours, minutes);
  }

  public static currentTime(): Time {
    const today: Date = new Date();
    return new Time(today.getHours(), today.getMinutes());
  }

  public static isAfter(a: Time, b: Time): boolean {
    if (a.hours > b.hours || (a.hours === b.hours && a.minutes > b.minutes)) {
      return true;
    }
    return false;
  }

  public static isBefore(a: Time, b: Time): boolean {
    return Time.isAfter(b, a);
  }

  public static compare(a: Time, b: Time): number {
    if (Time.isEqual(a, b)) {
      return 0
    }
    if (Time.isAfter(a, b)) {
      return 1;
    }
    return -1;
  }

  constructor(hour: number, minutes: number) {
    this.hours = hour;
    this.minutes = minutes;
  }

}
