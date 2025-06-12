export class CalendarDate {
    public year: number;
    public month: number;
    public day: number;

    public static getTime(calendarDate: CalendarDate): number {
        const date: Date = new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
        return date.getTime();
    }

    constructor(date?: Date) {
        this.month = date.getMonth() + 1; // months from 1-12
        this.day = date.getDate();
        this.year = date.getFullYear();
    }
}
