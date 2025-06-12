import {ServiceType} from '../../enum/service-type';
import {YearMonth} from '../../util/year-month';

export class CalendarEventSearchCriteria {
  public business: number;
  public service: number;
  public type: ServiceType;
  public from: YearMonth;
  public till: YearMonth;

  public toJSON(): any {
    return {
      'business': this.business,
      'service': this.service,
      'type': this.type,
      'from': this.from ? this.from.toString() : null,
      'till': this.till ? this.till.toString() : null
    }
  }
}


