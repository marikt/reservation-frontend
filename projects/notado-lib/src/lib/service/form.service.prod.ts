import {Injectable} from '@angular/core';
import {Api} from '../enum/api';
import {HttpService} from './http.service';
import {BroadcastService} from './broadcast.service';
import {FormServiceAbstract} from './form-service.abstract';
import {CalendarEventSearchCriteria} from '../model/search/calendar-event-search-criteria';
import {EventFromCalendar} from '../model/event/event-from-calendar';
import {ValidationError} from '../util/validation-error';
import {Router} from '@angular/router';
import {StripeService} from 'ngx-stripe';
import {LanguageService} from './language.service';
import {SpinnerService} from './spinner.service';
import {FormMode} from '../util/form-mode.enum';
import {ModeService} from '../../config/mode.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorResponse} from '../util/error-response';
import {StringUtil} from '../util/string-util';
import {Error} from '../util/error';
import {PreventDoubleClickService} from './prevent-double-click.service';
import {BusinessMax} from '../model/business-max';
import {MyDate} from '../model/date';
import {ServiceType} from '../enum/service-type';
import {EventHolderService} from './event-holder.service';
import {YearMonth} from '../util/year-month';
import {LocalStorageService} from './local-storage.service';
import {ServiceProvider} from '../model/service-provider';

@Injectable({
  providedIn: 'root'
})
export class FormServiceProd extends FormServiceAbstract {

  public mode: FormMode = FormMode.PRODUCTION;

  public static getSubdomain(url: string): string {
    if (!url) {
      return null;
    }

    const subdomains: string[] = url.split('.');
    if (!subdomains) {
      return null;
    }

    if (subdomains[0] === 'www') {
      return subdomains[1];
    }

    return subdomains[0];
  }

  constructor(
    public http: HttpService,
    public broadcastService: BroadcastService,
    public router: Router,
    public localStorage: LocalStorageService,
    public stripeService: StripeService,
    public languageService: LanguageService,
    public spinnerService: SpinnerService,
    public modeService: ModeService,
    public preventDoubleClickService: PreventDoubleClickService,
    public eventHolderService: EventHolderService
  ) {
    super(
      broadcastService,
      http,
      router,
      localStorage,
      stripeService,
      spinnerService,
      modeService,
      languageService,
      preventDoubleClickService,
      eventHolderService);
  }

  public loadBusinessAndTemplate(callback: () => void) {
    if (this.template) {
      callback();
      return;
    }
    const hostname: string = window.location.hostname;
    this.url = hostname;
    let subdomain = FormServiceProd.getSubdomain(hostname);
    if (subdomain === 'localhost') {
      subdomain = this.localStorage.get('businessUrlForTest');
      if (!subdomain) {
        subdomain = 'test-masaze'; // when developing on localhost test it on the domain test-masaze.cz
      }
    }
    // this.preventDoubleClickService.preventFor(5000);
    this.http.get(Api.BUSINESS + '/by-domain/' + subdomain, (business: BusinessMax) => {
        this.business = business;

        if (this.business == null) {
          console.warn('no business for given domain ' + subdomain);
          callback();
          return;
        }
        this.calendarEvent.businessId = this.business.id;
        this.loadStripeConfig();
        this.setFormLanguage();
        this.loadReservationConfig();
        this.loadTemplate(callback);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          window.location.href = 'https://www.notado.cz';
        } else {
          console.error('An error occurred:', errorResponse);
        }
      });
  }

  public createReservation(callback?: () => void): void {
    this.preventDoubleClickService.preventFor(5);
    this.calendarEvent.language = this.languageService.language;
    this.http.post(Api.CALENDAR_EVENT, this.calendarEvent, () => {
      },
      (errorResponse: HttpErrorResponse) => {
        const error: ErrorResponse = errorResponse.error;
        const errorCode: string = StringUtil.removeInnerQuotation(error.code);
        if (errorCode === Error.RESERVATION_IS_IN_CONFLICT_WITH_ANOTHER_EVENT ||
          errorCode === Error.RESERVATION_IS_IN_CONFLICT_WITH_OPENINGS) {
          this.router.navigate(['/form-error']);
        } else {
          this.router.navigate(['/form-error-unknown']);
        }
      }
    );
  }

  public createReservationFromSession(sessionId: string, callback?: (data?: any) => void): void {
    this.http.post(Api.CALENDAR_EVENT + '/' + sessionId, null,
      () => {
      },
      (errorResponse: HttpErrorResponse) => {
        const error: ErrorResponse = errorResponse.error;
        const errorCode: string = StringUtil.removeInnerQuotation(error.code);
        if (errorCode === Error.RESERVATION_IS_IN_CONFLICT_WITH_ANOTHER_EVENT ||
          errorCode === Error.RESERVATION_IS_IN_CONFLICT_WITH_OPENINGS) {
          this.router.navigate(['/form-error']);
        } else {
          this.router.navigate(['/form-error-unknown']);
        }
      }
    );
  }

  public loadAlreadyExistingEventsForService(from: YearMonth,
                                             till: YearMonth,
                                             callback?: () => void, noOfTries?: number): void {

    if (noOfTries && noOfTries > 2) {
      console.error('Cant load event.');
      callback();
      return;
    }

    if (!this.business) {
      console.error('loadAlreadyExistingEventsForService: The business is null.');
      callback();
      return;
    }

    const searchCriteria: CalendarEventSearchCriteria = new CalendarEventSearchCriteria();
    searchCriteria.business = this.business.id;
    searchCriteria.service = this.calendarEvent.service.id;
    searchCriteria.type = this.calendarEvent.service.type;
    searchCriteria.from = from;
    searchCriteria.till = till;
    if (this.eventHolderService.isLoaded(from, till)) {
      callback();
      return;
    }
    this.http.post(Api.CALENDAR_EVENT + '/search', searchCriteria,
      (data: EventFromCalendar[]) => {
        if (data) {
          this.eventHolderService.setEvents(data, from, till, this.calendarEvent.service);
        }
        callback();
      },
      () => {
        if (!noOfTries) {
          noOfTries = 0;
        }
        noOfTries++;
        this.loadAlreadyExistingEventsForService(from, till, callback, noOfTries);
      }
    );
  }

  /**
   * validate id the reservation can be created
   * check the following:
   *
   * 1. google calendar is connected with the business
   * 2. user account is valid
   * 3. there is at least one service with assign worker/device or there is a course
   */
  public validateCreatingReservation(callback: (validation: ValidationError[]) => void): void {
    this.http.get(Api.BUSINESS + '/' + this.business.id + '/validate-for-reservation', (validation: ValidationError[]) => {
      callback(validation);
    });
  }

  public doesDaysHaveAnyEventOrItsClosed(date: MyDate,
                                         serviceProviders: ServiceProvider[],
                                         numOfDays: number) {

    if (numOfDays === 1 || numOfDays === this.calendarEvent.service.duration.days) {
      if (this.getOpeningDay(date, this.calendarEvent.worker).close) {
        console.log(JSON.stringify(date) + ' CLOSE');
        return true;
      }
    }
    const eventsByDate = this.eventHolderService.getEventsByDate(date);
    for (const event of eventsByDate) {
      const relevantProviders = this.calendarEvent.service.type === ServiceType.APPOINTMENT
        ? this.calendarEvent.service.workers
        : this.calendarEvent.service.devices;

      const matchingProviders = serviceProviders.filter(provider =>
        provider.calendarId === event.calendarId
      );

      for (const provider of matchingProviders) {
        if (relevantProviders.includes(provider.id)) {
          return true;
        }
      }
    }
    numOfDays--;
    if (numOfDays <= 0) {
      return false;
    }
    return this.doesDaysHaveAnyEventOrItsClosed(
      MyDate.plusDay(date),
      serviceProviders,
      numOfDays);
  }

  public finishReservation(): void {
  }

}
