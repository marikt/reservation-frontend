import {NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Injectable()
export class CustomDatepickerCzTranslate extends NgbDatepickerI18n {

  private readonly WEEKDAYS = ['MO', 'TUE', 'WE', 'TH', 'FR', 'SA', 'SUN'];

  getWeekdayLabel(weekday: number, width?: 'long' | 'short' | 'narrow'): string {
    const index = weekday - 1; // Adjust for zero-based array index
    if (width === 'long') {
      return this.translate.instant('CALENDAR.DAY_LONG.' + this.WEEKDAYS[index]);
    }
    return this.translate.instant('CALENDAR.DAY.' + this.WEEKDAYS[index]);
  }

  constructor(private translate: TranslateService) {
    super();
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return '';
  }

  getMonthFullName(month: number, year?: number): string {
    let name: string;
    switch (month) {
      case 1:
        name = 'JAN';
        break;
      case 2:
        name = 'FEB';
        break;
      case 3:
        name = 'MARCH';
        break;
      case 4:
        name = 'APR';
        break;
      case 5:
        name = 'MAY';
        break;
      case 6:
        name = 'JUN';
        break;
      case 7:
        name = 'JUL';
        break;
      case 8:
        name = 'AUG';
        break;
      case 9:
        name = 'SEP';
        break;
      case 10:
        name = 'OCT';
        break;
      case 11:
        name = 'NOV';
        break;
      case 12:
        name = 'DEC';
        break;
    }
    return this.translate.instant('CALENDAR.MONTH.' + name);
  }

  getMonthShortName(month: number, year?: number): string {
    let name: string;
    switch (month) {
      case 1:
        name = 'JAN';
        break;
      case 2:
        name = 'FEB';
        break;
      case 3:
        name = 'MARCH';
        break;
      case 4:
        name = 'APR';
        break;
      case 5:
        name = 'MAY';
        break;
      case 6:
        name = 'JUN';
        break;
      case 7:
        name = 'JUL';
        break;
      case 8:
        name = 'AUG';
        break;
      case 9:
        name = 'SEP';
        break;
      case 10:
        name = 'OCT';
        break;
      case 11:
        name = 'NOV';
        break;
      case 12:
        name = 'DEC';
        break;
    }
    return this.translate.instant('CALENDAR.MONTH_SHORT.' + name);
  }

  getWeekdayShortName(weekday: number): string {
    let name: string;
    switch (weekday) {
      case 1:
        name = 'MO';
        break;
      case 2:
        name = 'TUE';
        break;
      case 3:
        name = 'WE';
        break;
      case 4:
        name = 'TH';
        break;
      case 5:
        name = 'FR';
        break;
      case 6:
        name = 'SA';
        break;
      case 7:
        name = 'SUN';
        break;
    }
    return this.translate.instant('CALENDAR.DAY.' + name);
  }

}
