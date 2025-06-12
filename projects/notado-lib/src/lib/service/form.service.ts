import {Injectable} from '@angular/core';
import {Api} from '../enum/api';
import {ReservationTemplate} from '../model/reservation-form/reservation-template';
import {HttpService} from './http.service';
import {BroadcastService} from './broadcast.service';
import {UserService} from '../security/service/user.service';
import {FormServiceAbstract} from './form-service.abstract';
import {ValidationError} from '../util/validation-error';
import {Router} from '@angular/router';
import {StripeService} from 'ngx-stripe';
import {SpinnerService} from './spinner.service';
import {FormMode} from '../util/form-mode.enum';
import {Event} from '../util/event.enum';
import {ModeService} from '../../config/mode.service';
import {LanguageService} from './language.service';
import {PreventDoubleClickService} from './prevent-double-click.service';
import {ServiceMax} from '../model/service-max';
import {MyDate} from '../model/date';
import {EventHolderService} from './event-holder.service';
import {YearMonth} from '../util/year-month';
import {LocalStorageService} from './local-storage.service';
import {ServiceProvider} from '../model/service-provider';

@Injectable({
  providedIn: 'root'
})
export class FormService extends FormServiceAbstract {

  public mode: FormMode = FormMode.DEMO;
  public isMobile: boolean = false;
  public services: ServiceMax[];

  constructor(
    public http: HttpService,
    public broadcastService: BroadcastService,
    public router: Router,
    public userService: UserService,
    public localStorage: LocalStorageService,
    public stripeService: StripeService,
    public spinnerService: SpinnerService,
    public modeService: ModeService,
    public languageService: LanguageService,
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

    this.subscribe(Event.BUSINESSES_LOADED, (business: any) => {
      this.init(business);
    });
    this.subscribe(Event.BUSINESS_OR_TEMPLATE_CHANGED, (business: any) => {
      this.init(business);
    });
  }

  public init(business: any) {
    this.business = business;
    this.http.get(Api.SERVICE + '/by-business/' + business.id, (services: any[]) => {
      this.services = services;
    });
    this.http.get(Api.TEMPLATE + '/' + this.business.templateId + '?activeOnly=true',
      (template: ReservationTemplate) => {
        this.template = template;
      });
  }

  public loadTemplateForDashboard(business: any) {
    this.http.get(Api.TEMPLATE + '/' + business.templateId + '?activeOnly=true',
      (template: ReservationTemplate) => {
        this.template = template;
      });
  }


  public createReservation(callback?: (data?: any) => void): void {
    // empty impl
  }

  public createReservationFromSession(sessionId: string, callback?: (data?: any) => void): void {
    // empty impl
  }

  public loadAlreadyExistingEventsForService(from: YearMonth,
                                             till: YearMonth,
                                             callback: () => void): void {
    this.eventHolderService.clear();
    callback();
  }

  public setDefaultValuesForEvent(): void {

  }

  public validateCreatingReservation(callback: (validation: ValidationError[]) => void): void {
    callback([]);
  }

  public reset() {
  }

  public finishReservation(): void {
  }

  public loadBusinessAndTemplate(callback?: () => void): void {
  }

  public getServices(): ServiceMax[] {
    if (this.services) {
      return this.services;
    }
    return [];
  }

  public doesDaysHaveAnyEventOrItsClosed(date: MyDate,
                                         serviceProviders: ServiceProvider[],
                                         numOfDays: number): boolean {
    return false;
  }

}
