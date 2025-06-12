export class MyDate {
  public year: number;
  public month: number;
  public day: number;

  constructor(date?: Date) {
    if (!date) {
      date = new Date(); // default value = today
    }

    this.day = +String(date.getDate()).padStart(2, '0');
    this.month = +String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    this.year = date.getFullYear();
  }

  public static isCurrentMonth(myDate: MyDate): boolean {
    const today = new Date();
    return myDate.year === today.getFullYear() && myDate.month === (today.getMonth() + 1);
  }

  public static getDate(myDate: MyDate): Date {
    return new Date(myDate.year, myDate.month - 1, myDate.day);
  }

  public static getDayName(myDate: MyDate, language: string): string {
    return new Date(MyDate.getDate(myDate)).toLocaleString(language, {weekday: 'long'});
  }

  public static plusDay(date: MyDate): MyDate {
    return new MyDate(new Date(date.year, date.month - 1, date.day + 1));
  }

  public static isEqual(a: MyDate, b: MyDate): boolean {
    if (a.day === b.day && a.month === b.month && a.year === b.year) {
      return true;
    }
    return false;
  }

  public static isAfter(a: MyDate, b: MyDate): boolean {
    if (a.year > b.year ||
      (a.year === b.year && a.month > b.month) ||
      (a.year === b.year && a.month === b.month && a.day > b.day)
    ) {
      return true;
    }
    return false;
  }

  public static isBefore(a: MyDate, b: MyDate): boolean {
    return MyDate.isAfter(b, a);
  }

  public static getNumberOfDays(a: MyDate, b: MyDate): number {
    // Convert MyDate instances to Date objects
    const firstDate = new Date(a.year, a.month - 1, a.day);
    const secondDate = new Date(b.year, b.month - 1, b.day);

    // Calculate the difference in time
    const differenceInTime = Math.abs(secondDate.getTime() - firstDate.getTime());

    // Convert the time difference to days
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  }

}
