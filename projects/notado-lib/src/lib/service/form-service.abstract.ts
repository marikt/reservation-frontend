import {BroadcastService} from './broadcast.service';
import {ReservationTemplate} from '../model/reservation-form/reservation-template';
import {MySubscribable} from '../util/my-subscribable';
import {OpeningDay} from '../model/opening-day';
import {MyDate} from '../model/date';
import {Time} from '../model/time';
import {EventFromCalendar} from '../model/event/event-from-calendar';
import {MyForm} from '../util/my-form';
import {FormWindowName, FormWindowUtil} from '../util/form-window-name';
import {ValidationError} from '../util/validation-error';
import {NavigationStart, Router} from '@angular/router';
import {Api} from '../enum/api';
import {HttpService} from './http.service';
import {PaymentSession} from '../model/payment-session';
import {StripeService} from 'ngx-stripe';
import {TemplateUtil} from '../util/template-util';
import {ResponseType} from '../enum/response-type.enum';
import {SpinnerService} from './spinner.service';
import {ServiceType} from '../enum/service-type';
import {ReservationWindow} from '../model/reservation-form/reservation-window';
import {Device} from '../model/device';
import {ServiceProvider} from '../model/service-provider';
import {ModeService} from '../../config/mode.service';
import {ReservationConfig} from '../model/reservation-config';
import {LanguageService} from './language.service';
import {Subscription} from 'rxjs';
import {Directive, OnDestroy} from '@angular/core';
import {StripeServicesConfig} from '../model/stripe/stripe-services-config';
import {StripeServiceConfig} from '../model/stripe/stripe-service-config';
import {PreventDoubleClickService} from './prevent-double-click.service';
import {EventForCreate} from '../model/event/event-for-create';
import {EventDateAndTime} from '../model/event/event-date-and-time';
import {EventDateAndTimeAndId} from '../model/event/event-date-and-time-and-id';
import {BusinessMax} from '../model/business-max';
import {ServiceGroupMax} from '../model/service-group-max';
import {BusinessBranchMax} from '../model/business-branch-max';
import {ServiceMax} from '../model/service-max';
import {WorkerMax} from '../model/worker-max';
import {Duration} from '../model/duration';
import {EventHolderService} from './event-holder.service';
import {YearMonth} from '../util/year-month';
import {LocalStorageService} from './local-storage.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorResponse} from '../util/error-response';
import {Error} from '../util/error';
import {StringUtil} from '../util/string-util';
import {ServiceCapacityType} from '../util/service-capacity-type';
import {Event} from '../util/event.enum';

@Directive()
export abstract class FormServiceAbstract extends MySubscribable implements OnDestroy {

  /**
   * the time is split into 3 groups morning | NOON | EVENING
   */
  private static TILL_MORNING: number = (10.5 * 60);
  private static TILL_NOON: number = (14 * 60);
  private static MAX_BOOKINGS_IN_1_SESSION = 40;

  /**
   *
   * when setting service duration
   */
  public static MIN_ADD_MINUTES: number = 15;

  /**
   * used for payment redirect
   */
  public url: string;

  public template: ReservationTemplate;
  public business: BusinessMax;
  public reservationConfig: ReservationConfig;
  public calendarEvent: EventForCreate;
  public idx: number = 0;
  public timesMorning: number[] = [];
  public timesNoon: number[] = [];
  public timesAfternoon: number[] = [];
  public isAnyWorkerOrDeviceAvailable: boolean = false;
  public hideBackButtonForDate: boolean = false;
  public hideBackButtonForService: boolean = false;

  private stripeIntegrationBusinessConfig: StripeServicesConfig;

  /**
   * Force user to fill all required fields in the reservation form
   *
   */
  public formWindows: MyForm[] = [];
  public formComponentsValid: boolean = true;

  /**
   * mark for cases when you do reservation to:
   * specific service
   * specific course (reservation-to-course)
   * specific date
   * specific service group
   *
   */
  public reservationForSpecificItem: boolean = false;

  /**
   * AlreadyExistingEvents on the service
   */
  private subscriptionForPopup: Subscription;

  private currentUrl: string;
  /**
   * this param is set when the booking form is open for specific date, we save this date and se it when opening window with setting date,
   * then we reset this value
   */
  public openReservationForThisDate: MyDate;

  protected constructor(public broadcastService: BroadcastService,
                        public http: HttpService,
                        public router: Router,
                        public localStorage: LocalStorageService,
                        public stripeService: StripeService,
                        public spinnerService: SpinnerService,
                        public modeService: ModeService,
                        public languageService: LanguageService,
                        public preventDoubleClickService: PreventDoubleClickService,
                        public eventHolderService: EventHolderService
  ) {
    super(broadcastService);
    this.reset();

    // handle browser navigation within reservation form
    this.subscriptionForPopup = router.events.subscribe((val) => {
      if (!(val instanceof NavigationStart)) {
        return;
      }

      // name for browser navigation is popstate
      if (val.navigationTrigger !== 'popstate') {
        return;
      }

      const currentUrlVal = this.urlToValue(this.currentUrl);
      const destUrlVal = this.urlToValue(val.url);

      if (currentUrlVal === -1 || destUrlVal === -1) {
        // do nothing
      } else if (destUrlVal > currentUrlVal) {
        this.goToNextWindow(true);
      } else if (destUrlVal < currentUrlVal) {
        this.goToPrevWindow(true);
      }
    });
  }

  /**
   * return value of the shift in minutes for case when
   * client set duration for service during booking
   */
  public getDurationShiftWindow(): number {
    if (this.reservationConfig &&
      this.reservationConfig.durationShiftWindow &&
      this.reservationConfig.durationShiftWindow > 0) {
      return this.reservationConfig.durationShiftWindow;
    }
    return FormServiceAbstract.MIN_ADD_MINUTES;
  }

  protected loadStripeConfig(): void {
    this.http.get(Api.INTEGRATION_CONFIG + '/stripe-config-for-form/' + this.business.id,
      (stripeIntegrationBusinessConfig: StripeServicesConfig) => {
        if (stripeIntegrationBusinessConfig) {
          this.stripeIntegrationBusinessConfig = stripeIntegrationBusinessConfig;
        } else {
          this.stripeIntegrationBusinessConfig = new StripeServicesConfig();
        }
      });
  }

  public getStripeServiceConfig(): StripeServiceConfig {
    if (!this.stripeIntegrationBusinessConfig) {
      console.error('no stripeIntegrationBusinessConfig');
      return new StripeServiceConfig();
    }
    if (!this.stripeIntegrationBusinessConfig.stripeServices ||
      this.stripeIntegrationBusinessConfig.stripeServices.length === 0) {
      console.error('no stripeIntegrationBusinessConfig.stripeServices');
      return new StripeServiceConfig();
    }
    if (!this.calendarEvent.service) {
      console.error('no calendarEvent.service');
      return new StripeServiceConfig();
    }

    for (const stripeService of this.stripeIntegrationBusinessConfig.stripeServices) {
      if (!stripeService) {
        continue;
      }
      if (stripeService.serviceId === this.calendarEvent.service.id) {
        return stripeService;
      }
    }
    console.error('no StripeServiceConfig');
    return new StripeServiceConfig();
  }

  ngOnDestroy(): void {
    this.subscriptionForPopup.unsubscribe();
  }

  public reset(): void {
    this.idx = 0;
    this.calendarEvent = new EventForCreate();
    this.formWindows = [];
    this.formComponentsValid = true;
  }

  public setDefaultValuesForEvent(): void {
    this.idx = 0; // start reservation form from the beginning
    if (!this.calendarEvent.service && this.business.services && this.business.services.length > 0) {
      this.calendarEvent.service = this.business.services[0];
    }
  }

  public getServiceGroups(): ServiceGroupMax[] {
    if (!this.business) {
      console.error('There is no business');
      return [];
    }

    if (this.calendarEvent.businessBranch) {
      return this.business.serviceGroups.filter(
        serviceGroup => {
          // tslint:disable-next-line:max-line-length
          return this.calendarEvent.businessBranch.serviceGroups.includes(serviceGroup.id) && serviceGroup.services && serviceGroup.services.length > 0
        }
      );
    }
    return this.business.serviceGroups.filter(
      serviceGroup => {
        return serviceGroup.services && serviceGroup.services.length > 0;
      }
    );
  }

  public getBusinessBranches(): BusinessBranchMax[] {
    if (!this.business) {
      console.error('There is no business');
      return [];
    }

    return this.business.businessBranches.filter(
      businessBranch => {
        return (businessBranch.serviceGroups && businessBranch.serviceGroups.length > 0) ||
          (businessBranch.services && businessBranch.services.length > 0);
      }
    );
  }

  public getServices(): ServiceMax[] {
    if (!this.business) {
      console.error('There is no business');
      return [];
    }
    let services: ServiceMax[];
    // serviceGroup was selected
    if (this.calendarEvent.serviceGroup) {
      services = this.business.services.filter(
        service => {
          return this.calendarEvent.serviceGroup.services.includes(service.id) &&
            ((service.workers && service.workers.length > 0 && service.type === ServiceType.APPOINTMENT)
              || service.type === ServiceType.COURSE
              || service.type === ServiceType.COUPON
              || (service.devices && service.devices.length > 0 && service.type === ServiceType.DEVICE))
        }
      )
    } else if (this.calendarEvent.businessBranch) { // businessBranch was selected AND serviceGroup was NOT selected
      services = this.business.services.filter(
        service => {
          return this.calendarEvent.businessBranch.services.includes(service.id) &&
            ((service.workers && service.workers.length > 0 && service.type === ServiceType.APPOINTMENT)
              || service.type === ServiceType.COURSE
              || service.type === ServiceType.COUPON
              || (service.devices && service.devices.length > 0 && service.type === ServiceType.DEVICE))
        }
      );
    } else {
      // businessBranch was NOT selected AND serviceGroup was NOT selected
      services = this.business.services.filter(
        service => {
          return (
            (service.workers && service.workers.length > 0 && service.type === ServiceType.APPOINTMENT)
            || service.type === ServiceType.COURSE
            || service.type === ServiceType.COUPON
            || (service.devices && service.devices.length > 0 && service.type === ServiceType.DEVICE)
          );
        }
      );
    }
    services.sort((s1, s2) => {
      if (s1.type === 'COUPON' && s2.type !== 'COUPON') {
        return 1;
      }
      if (s1.type !== 'COUPON' && s2.type === 'COUPON') {
        return -1;
      }
      if (s1.sequence > s2.sequence) {
        return 1;
      }
      if (s1.sequence < s2.sequence) {
        return -1;
      }
      return 0;
    });
    return services;
  }

  public getWorkers(): WorkerMax[] {
    const workers: WorkerMax[] = this.business.workers.filter(
      worker => this.calendarEvent.service.workers.includes(worker.id)
    )

    workers.sort((w1, w2) => {
      if (w1.sequence > w2.sequence) {
        return 1;
      }
      if (w1.sequence < w2.sequence) {
        return -1;
      }
      return 0;
    })
    return workers;
  }

  public getDevices(): Device[] {
    return this.business.devices.filter(
      device => this.calendarEvent.service.devices.includes(device.id)
    );
  }


  public calculateTimesOnDeviceChange(device: Device): void {
    const devices: Device[] = [];
    devices.push(device);

    if (!device.available) {
      this.calendarEvent.startTime = null;
      this.calendarEvent.timeMinutes = null;
    }
    this.calendarEvent.dateAndTimeAndIds = [];

    this.calculateStartingTimeForService(this.calendarEvent.startDate, devices);
    this.calculateWorkersOrDevicesAvailability(this.calendarEvent.startDate, device);
  }

  public calculateTimesOnWorkerChange(worker: WorkerMax): void {
    const workers: WorkerMax[] = [];
    workers.push(worker);

    if (!worker.available) {
      this.calendarEvent.startTime = null;
      this.calendarEvent.timeMinutes = null;
    }
    this.calendarEvent.dateAndTimeAndIds = [];

    this.calculateStartingTimeForService(this.calendarEvent.startDate, workers);
    this.calculateWorkersOrDevicesAvailability(this.calendarEvent.startDate, worker);
  }

  public validateComponents(): boolean {
    if (!this.formWindows) {
      return true;
    }
    this.formComponentsValid = true;
    for (const formWindow of this.formWindows) {
      if (formWindow.validate()) {
        formWindow.valid = true;
      } else {
        formWindow.valid = false;
        this.formComponentsValid = false;
      }
    }
    return this.formComponentsValid;
  }

  public calculateTimesOnDateChangeForCourse(date: MyDate) {
    const times: Set<number> = new Set<number>();
    this.calendarEvent.timeMinutes = null;
    this.calendarEvent.startTime = null;
    this.calendarEvent.id = null;
    this.timesMorning = [];
    this.timesNoon = [];
    this.timesAfternoon = [];

    for (const course of this.eventHolderService.alreadyExistingEvents) {
      if (!course.hasCapacity) {
        continue;
      }
      if (MyDate.isEqual(date, course.startDate)) {
        let hours: number = course.startTime.hours;
        if (!hours) {
          hours = 0;
        }
        let minutes: number = course.startTime.minutes;
        if (!minutes) {
          minutes = 0;
        }
        times.add((hours * 60) + minutes)
      }
    }
    this.sortIntoMorningNoonAfternoon(times);
  }

  public calculateTimesOnDateChange(date: MyDate): void {
    let serviceProviders: ServiceProvider[] = [];
    const serviceType: ServiceType = this.calendarEvent.service.type;
    if (serviceType === ServiceType.APPOINTMENT) {
      if (this.calendarEvent.worker) {
        serviceProviders.push(this.calendarEvent.worker);
      } else {
        serviceProviders = this.getWorkers();
      }
    } else if (serviceType === ServiceType.DEVICE || serviceType === ServiceType.RENT) {
      if (this.calendarEvent.device) {
        serviceProviders.push(this.calendarEvent.device);
      } else {
        serviceProviders = this.getDevices();
      }
    }
    // when selection date reset time
    this.calendarEvent.startTime = null;
    this.calendarEvent.timeMinutes = null;

    this.calculateStartingTimeForService(date, serviceProviders);
    switch (serviceType) {
      case ServiceType.DEVICE:
        this.calculateWorkersOrDevicesAvailability(date, this.calendarEvent.device);
        break;
      case ServiceType.APPOINTMENT:
        this.calculateWorkersOrDevicesAvailability(date, this.calendarEvent.worker);
        break;
    }
  }

  public goToWindow(formWindowName: FormWindowName): void {
    this.idx = FormWindowUtil.getIdx(this.template.windows, formWindowName);
    this.idx--; // goToNextWindow starts with idx ++;
    this.goToNextWindow()
  }

  /**
   *
   * @param doNotNavigate - if true than do not navigate to the next window as this navigation was done by browser button already
   */
  public goToNextWindow(doNotNavigate?: boolean): void {
    this.idx++;
    this.formComponentsValid = true;
    this.formWindows = [];

    const windowName = this.template.windows[this.idx].name;
    switch (windowName) {
      case FormWindowName.THANKS:
        this.createReservation(() => {
        });
        break;
      case FormWindowName.DATE:
        // in case that selected service has 1 worker, dont show selection of workers
        if (this.calendarEvent.service && this.calendarEvent.service.type === ServiceType.COUPON) {
          this.goToNextWindow();
          return;
        }
        if (this.calendarEvent.service &&
          this.calendarEvent.service.type === ServiceType.APPOINTMENT &&
          this.calendarEvent.service.workers &&
          this.calendarEvent.service.workers.length === 1) {
          this.calendarEvent.worker = this.business.workers.find(w => this.calendarEvent.service.workers.includes(w.id));
        } else if (this.calendarEvent.service &&
          this.calendarEvent.service.type === ServiceType.DEVICE &&
          this.calendarEvent.service.devices &&
          this.calendarEvent.service.devices.length === 1) {
          this.calendarEvent.device = this.business.devices.find(d => this.calendarEvent.service.devices.includes(d.id));
        }
        break;
      case FormWindowName.SERVICE_DURATION:
        if (this.calendarEvent.service && this.calendarEvent.service.type === ServiceType.COUPON) {
          this.goToNextWindow();
          return;
        }

        if (!(this.calendarEvent.service.durationNotSpecified && this.calendarEvent.service.type !== ServiceType.COURSE)) {
          this.goToNextWindow();
          return;
        }
        break;
      case FormWindowName.SERVICE_GROUP:
        if (this.getServiceGroups().length === 0) {
          this.calendarEvent.serviceGroup = null;
          this.goToNextWindow();
          return;
        } else if (this.getServiceGroups().length === 1) {
          this.calendarEvent.serviceGroup = this.getServiceGroups()[0];
          this.goToNextWindow();
          return;
        }
        break;
      case FormWindowName.BUSINESS_BRANCH:
        if (this.getBusinessBranches().length === 0) {
          this.calendarEvent.businessBranch = null;
          this.goToNextWindow();
          return;
        } else if (this.getBusinessBranches().length === 1) {
          this.calendarEvent.businessBranch = this.getBusinessBranches()[0];
          this.goToNextWindow();
          return;
        }
        break;
      case FormWindowName.CUSTOM:
        if (this.skipCustomWindow()) {
          this.goToNextWindow();
          return;
        }
        break
    }
    this.navigate(windowName, doNotNavigate);
  }

  /**
   *
   * @param doNotNavigate - if true then do not navigate to the next window as this navigation was done by browser button already
   */
  public goToPrevWindow(doNotNavigate?: boolean): void {
    this.idx--;
    this.formComponentsValid = true;
    this.formWindows = [];

    const windowName = this.template.windows[this.idx].name;
    switch (windowName) {
      case FormWindowName.SERVICE_GROUP:
        // service group was not selected before,
        // therefore was not show before, so go to business branch instead
        if (!this.calendarEvent.serviceGroup) {
          this.goToPrevWindow();
          return;
        }
        break;
      case FormWindowName.BUSINESS_BRANCH:
        if (!this.calendarEvent.businessBranch) {
          this.goToPrevWindow();
          return;
        }
        break;
      case FormWindowName.SERVICE_DURATION:
        if (this.calendarEvent.service && this.calendarEvent.service.type === ServiceType.COUPON) {
          this.goToPrevWindow();
          return;
        }

        if (this.calendarEvent.service.durationNotSpecified && this.calendarEvent.service.type !== ServiceType.COURSE) {
        } else {
          this.goToPrevWindow();
          return;
        }
        break;
      case FormWindowName.DATE:
        if (this.calendarEvent.service && this.calendarEvent.service.type === ServiceType.COUPON) {
          this.goToPrevWindow();
          return;
        }
        break;
      case FormWindowName.CUSTOM:
        // skip if there are no customFields for given service
        if (this.skipCustomWindow()) {
          this.goToPrevWindow();
          return;
        }
        break;
    }
    this.navigate(windowName, doNotNavigate);
  }

  public pay(): void {
    this.preventDoubleClickService.preventFor(10);

    if (!this.validateComponents()) {
      console.log('formService.validateComponents INVALID!')
      return;
    }
    if (!this.getStripeServiceConfig().price) {
      return;
    }
    if (!this.calendarEvent) {
      return;
    }
    this.spinnerService.isShowUnstoppable = true;
    this.http.get(Api.FORM_PAYMENT + '/' + this.business.id + '/key',
      (publicKey: string) => {
        if (!publicKey) {
          this.spinnerService.isShowUnstoppable = false;
          console.warn('No public key');
          return;
        }
        this.stripeService.setKey(publicKey);
        const sessionData = {
          payment: {
            serviceId: this.calendarEvent.service.id,
            email: this.calendarEvent.email,
            quantity: this.calculateQuantity(),
            url: this.url === 'localhost' ? null : this.url
          },
          event: this.calendarEvent
        }

        this.http.post(Api.FORM_PAYMENT + '/' + this.business.id + '/session', sessionData,
          (paymentSession: PaymentSession) => {
            if (publicKey === 'TEST_KEY_FOR_SELENIUM') {
              setTimeout(() => {
                  this.router.navigate([this.modeService.urlPrefix + 'form-thanks-paid/' + paymentSession.sessionId]);
                },
                2000);
              return;
            }
            this.stripeService.redirectToCheckout(
              {sessionId: paymentSession.sessionId})
              .subscribe(
                response => {
                  console.error(response);
                }
              );
          }, (errorResponse: HttpErrorResponse) => {
            const error: ErrorResponse = errorResponse.error;
            const errorCode: string = StringUtil.removeInnerQuotation(error.code);
            console.error(error);
            this.spinnerService.isShowUnstoppable = false;
            if (errorCode === Error.RESERVATION_IS_IN_CONFLICT_WITH_ANOTHER_EVENT ||
              errorCode === Error.RESERVATION_IS_IN_CONFLICT_WITH_OPENINGS) {
              this.router.navigate(['form-error']);
              console.error(errorCode);
            } else {
              // Handle other errors
              this.router.navigate(['form-error-unknown']);
              console.error('An error occurred. Please try again later.');
            }
          });
      },
      (errorResponse: HttpErrorResponse) => {
        const error: ErrorResponse = errorResponse.error;
        const errorCode: string = StringUtil.removeInnerQuotation(error.code);
        console.error(error);
        this.spinnerService.isShowUnstoppable = false;
        this.router.navigate(['form-error-unknown']);
      }, ResponseType.TEXT);
  }

  public clearExistingEvents(): void {
    this.eventHolderService.clear();
  }

  public openCalendarAvailability(): void {
    this.router.navigate([this.modeService.urlPrefix + 'calendar-availability']);
  }

  public openReservationFormForDemo(): void {
    this.loadBusinessAndTemplate(() => {
        const businessBranch: ReservationWindow = TemplateUtil.getWindow(FormWindowName.BUSINESS_BRANCH, this.template);
        if (
          businessBranch &&
          this.business.businessBranches != null &&
          this.business.businessBranches.length > 0) {
          this.router.navigate([this.modeService.urlPrefix + 'form-business-branch']);
          return;
        }

        const serviceGroup: ReservationWindow = TemplateUtil.getWindow(FormWindowName.SERVICE_GROUP, this.template);
        if (
          serviceGroup &&
          serviceGroup.active &&
          this.business.serviceGroups &&
          this.business.serviceGroups.length > 0) {
          this.router.navigate([this.modeService.urlPrefix + 'form-service-group']);
          return;
        }

        this.router.navigate([this.modeService.urlPrefix + 'form-service']);
      }
    );
  }

  public openReservationFormForCourse(serviceId: number,
                                      courseId: string,
                                      remainingCapacity: number,
                                      date: MyDate,
                                      time: Time) {

    this.template = null;
    this.loadBusinessAndTemplate(() => {
        if (!this.calendarEvent) {
          this.calendarEvent = new EventForCreate();
        }
        for (const service of this.business.services) {
          if (service.id === serviceId) {
            this.calendarEvent.service = service;
            this.calendarEvent.type = service.type;
            break;
          }
        }
        if (date && this.calendarEvent) {
          this.calendarEvent.startDate = date;
        }
        if (time && this.calendarEvent) {
          this.calendarEvent.startTime = time;
        }
        this.calendarEvent.id = courseId;
        this.calendarEvent.remainingCapacity = remainingCapacity;
        this.hideBackButtonForDate = true;
        this.calendarEvent.dateAndTimeAndIds = [];
        this.tryToPushDateAndTimes();
        this.reservationForSpecificItem = true;
        this.goToWindow(FormWindowName.CUSTOM);
      }
    );
  }

  public openReservationFormForDate(date: MyDate): void {
    if (date && this.calendarEvent) {
      this.openReservationForThisDate = date;
    }
    this.reservationForSpecificItem = true;
    this.openReservationFormForProduction();
  }

  public openReservationFormForServiceGroup(serviceGroupId: number): void {
    this.template = null;
    this.loadBusinessAndTemplate(() => {
        if (!this.calendarEvent) {
          this.calendarEvent = new EventForCreate();
        }
        for (const serviceGroup of this.business.serviceGroups) {
          if (serviceGroup.id === serviceGroupId) {
            this.calendarEvent.serviceGroup = serviceGroup;
            break;
          }
        }
        this.hideBackButtonForService = true;
        this.reservationForSpecificItem = true;
        this.goToWindow(FormWindowName.SERVICE);
      }
    );
  }

  public openReservationFormForService(serviceId: number,
                                       worker?: number,
                                       date?: MyDate,
                                       time?: Time): void {
    this.template = null;
    this.loadBusinessAndTemplate(() => {
        if (!this.calendarEvent) {
          this.calendarEvent = new EventForCreate();
        }
        for (const service of this.business.services) {
          if (service.id === serviceId) {
            this.calendarEvent.service = service;
            this.calendarEvent.type = service.type;
            break;
          }
        }

        if (worker) {
          for (const w of this.business.workers) {
            if (w.id === worker) {
              this.calendarEvent.worker = w;
              break;
            }
          }
        }

        if (date && this.calendarEvent) {
          this.calendarEvent.startDate = date;
        }
        if (time && this.calendarEvent) {
          this.calendarEvent.startTime = time;
        }
        this.calendarEvent.dateAndTimeAndIds = [];

        if (this.calendarEvent.startDate && this.calendarEvent.startTime) {
          this.tryToPushDateAndTimes();
        }

        if (!this.calendarEvent.service && this.business.services) {
          this.calendarEvent.service = this.business.services[0];
          this.calendarEvent.type = this.business.services[0].type;
        }
        this.reservationForSpecificItem = true;
        if (this.calendarEvent.worker &&
          this.calendarEvent.dateAndTimeAndIds &&
          this.calendarEvent.dateAndTimeAndIds.length > 0) {
          this.goToWindow(FormWindowName.CUSTOM);
        } else if (this.calendarEvent.service.durationNotSpecified) {
          this.goToWindow(FormWindowName.SERVICE_DURATION);
        } else {
          this.hideBackButtonForDate = true;
          this.goToWindow(FormWindowName.DATE);
        }
      }
    );
  }

  public openReservationFormForProduction(): void {
    this.template = null;
    this.loadBusinessAndTemplate(() => {
        const businessBranch: ReservationWindow = TemplateUtil.getWindow(FormWindowName.BUSINESS_BRANCH, this.template);
        if (
          businessBranch &&
          businessBranch.active &&
          this.business.businessBranches &&
          this.business.businessBranches.length > 0) {
          this.router.navigate([this.modeService.urlPrefix + 'form-business-branch']);
          return;
        }

        const serviceGroup: ReservationWindow = TemplateUtil.getWindow(FormWindowName.SERVICE_GROUP, this.template);
        if (
          serviceGroup &&
          serviceGroup.active &&
          this.business.serviceGroups &&
          this.business.serviceGroups.length > 0) {
          this.router.navigate([this.modeService.urlPrefix + 'form-service-group']);
          return;
        }

        this.router.navigate([this.modeService.urlPrefix + 'form-service']);
      }
    );
  }

  /**
   *  @return true is given day have at least one time-window to create appointment/device service
   */
  public doesDayHaveAnyTimeWindow(date: MyDate, serviceProviders: ServiceProvider[]): boolean {
    if (!this.calendarEvent.service) {
      return true;
    }

    if (!this.calendarEvent.service.type) {
      return true;
    }

    if (this.calendarEvent.service.type === ServiceType.COURSE) {
      return true;
    }
    const times: Set<number> = this.calculateStartingTimeForAppointmentOrDeviceService(date, serviceProviders);
    return times.size > 0;
  }

  public doesDayHaveAnyRelatedEvents(date: MyDate, serviceProviders: ServiceProvider[]): boolean {
    if (!serviceProviders || serviceProviders.length === 0) {
      return false;
    }

    for (const serviceProvider of serviceProviders) {
      const service = this.calendarEvent.service;
      const events: EventFromCalendar[] = this.getRelatedEventsFor(serviceProvider.calendarId, date);
      if (events && events.length > 0) {
        return true;
      }
    }
    return false;
  }

  // ============================================================================================================
  // =============================================== PRIVATE ====================================================
  // ============================================================================================================
  /**
   * For one day calculate starting hrs when the service can be provided,
   *
   */
  private calculateStartingTimeForService(date: MyDate, serviceProviders: ServiceProvider[]): void {
    this.timesMorning = [];
    this.timesNoon = [];
    this.timesAfternoon = [];

    if (Duration.isFullDayDuration(this.calendarEvent.service.duration)) {
      return; // for full day service its start of the day irrelevant
    }

    if (!this.calendarEvent.service) {
      console.error('There is no service selected');
      return;
    }

    if (!this.calendarEvent.service.type) {
      console.error('Service type is not selected');
      return;
    }

    switch (this.calendarEvent.service.type) {
      case ServiceType.COURSE:
        this.calculateStartingTimeForCourseService(date);
        break;
      case ServiceType.APPOINTMENT:
      case ServiceType.DEVICE:
        this.calculateStartingTimeForAppointmentOrDeviceServiceAndSort(date, serviceProviders);
        break;
    }
  }

  private calculateStartingTimeForAppointmentOrDeviceService(date: MyDate, serviceProviders: ServiceProvider[]): Set<number> {
    if (!serviceProviders || serviceProviders.length === 0) {
      return;
    }

    const times: Set<number> = new Set<number>();
    serviceProviders.forEach(
      serviceProvider => {
        let openingDay: OpeningDay;
        if ('openingDays' in serviceProvider) {
          openingDay = this.getOpeningDay(date, serviceProvider as WorkerMax);
        } else {
          openingDay = this.getOpeningDay(date);
        }
        const service = this.calendarEvent.service;
        const events: EventFromCalendar[] = this.getRelatedEventsFor(serviceProvider.calendarId, date);
        const freeEvents: EventFromCalendar[] = this.getRelatedFreeEventsFor(serviceProvider.calendarId, date);
        // tslint:disable-next-line:max-line-length
        const timeOfOpenings: number[] = OpeningDay.getTimeOfOpenings(date, openingDay, service, this.reservationConfig, events, freeEvents);
        timeOfOpenings.forEach(
          (timeOfOpening: number) => {
            times.add(timeOfOpening);
          }
        );

        // for service with capacity MANY_TO_ONE find event with capacity and allow adding attendee there
        const withCapacityEventsByDate = this.eventHolderService.getWithCapacityEventsByDate(date);
        if (service.capacityType === ServiceCapacityType.MANY_TO_ONE &&
          withCapacityEventsByDate &&
          withCapacityEventsByDate.length > 0) {
          for (const withCapacityEvent of withCapacityEventsByDate) {
            if (
              service.id === withCapacityEvent.serviceId &&
              withCapacityEvent.calendarId === serviceProvider.calendarId) {
              times.add(Time.getDurationInMinutes(withCapacityEvent.startTime));
            }
          }
        }
      }
    );
    return times;
  }

  private calculateStartingTimeForAppointmentOrDeviceServiceAndSort(date: MyDate, serviceProviders: ServiceProvider[]): void {
    const times: Set<number> = this.calculateStartingTimeForAppointmentOrDeviceService(date, serviceProviders);
    this.sortIntoMorningNoonAfternoon(times);
  }


  private calculateStartingTimeForCourseService(date: MyDate): void {
    const times: Set<number> = new Set<number>();
    for (const event of this.eventHolderService.alreadyExistingEvents) {
      if (MyDate.isEqual(event.startDate, date)) {
        this.calendarEvent.id = event.id;
        times.add(Time.getDurationInMinutes(event.startTime));
        this.isAnyWorkerOrDeviceAvailable = true;
      }
    }
    this.sortIntoMorningNoonAfternoon(times);
  }

  /**
   * sort into timesMorning, timesNoon, timesAfternoon
   */
  private sortIntoMorningNoonAfternoon(times: Set<number>): void {
    for (const time of times) {
      if (time < FormServiceAbstract.TILL_MORNING) {
        this.timesMorning.push(time);
      } else if (time < FormServiceAbstract.TILL_NOON) {
        this.timesNoon.push(time);
      } else {
        this.timesAfternoon.push(time);
      }
    }
    this.timesMorning.sort((a, b) => a - b);
    this.timesNoon.sort((a, b) => a - b);
    this.timesAfternoon.sort((a, b) => a - b);
  }

  /**
   * set worker.available for each worker
   */
  public calculateWorkersOrDevicesAvailability(date: MyDate, serviceProvider: ServiceProvider) {
    if (!serviceProvider) {
      return;
    }
    let serviceProviders: ServiceProvider[];
    if ('openingDays' in serviceProvider) {
      serviceProviders = this.getWorkers();
    } else {
      serviceProviders = this.getDevices();
    }

    this.isAnyWorkerOrDeviceAvailable = false;
    for (const sp of serviceProviders) {
      this.calculateWorkerOrDeviceAvailability(sp, date, this.calendarEvent.startTime)
    }

    if (serviceProvider) {
      this.isAnyWorkerOrDeviceAvailable = serviceProvider.available;
      return;
    }
    for (const sp of serviceProviders) {
      if (sp.available) {
        this.isAnyWorkerOrDeviceAvailable = true;
      }
    }
  }

  /**
   * Get day of the week
   */
  public getOpeningDay(myDate: MyDate, worker?: WorkerMax): OpeningDay {
    let openingDays: OpeningDay[];

    if (worker && worker.openingDays && worker.openingDays.length > 1) {
      openingDays = worker.openingDays;
    } else if (this.calendarEvent && this.calendarEvent.businessBranch &&
      this.calendarEvent.businessBranch.openingDays &&
      this.calendarEvent.businessBranch.openingDays.length > 1) {
      openingDays = this.calendarEvent.businessBranch.openingDays;
    } else {
      openingDays = this.business.openingDays;
    }

    const date = MyDate.getDate(myDate);
    const dayOfTheWeekIdx = ((date.getDay() + 6) % 7);
    return openingDays[dayOfTheWeekIdx];
  }

  /**
   * set worker.available = true, if the worker is available for given time and date
   */
  private calculateWorkerOrDeviceAvailability(serviceProvider: ServiceProvider, date: MyDate, time: Time): void {
    let openingDay: OpeningDay;
    if ('openingDays' in serviceProvider) {
      openingDay = this.getOpeningDay(date, serviceProvider as WorkerMax);
    } else {
      openingDay = this.getOpeningDay(date);
    }

    if (!openingDay) {
      console.error('Cant get openingDay');
      serviceProvider.available = false;
      return;
    }

    if (!openingDay.scheduledOvertimes &&
      (openingDay.close || !openingDay.openingDayRanges || openingDay.openingDayRanges.length === 0)) {
      serviceProvider.available = false;
      return;
    }
    const service: ServiceMax = this.calendarEvent.service;
    const events: EventFromCalendar[] = this.getRelatedEventsFor(serviceProvider.calendarId, date);

    if (Duration.isFullDayDuration(this.calendarEvent.service.duration)) {
      serviceProvider.available = !events || events.length === 0;
      return;
    }

    const freeEvents: EventFromCalendar[] = this.getRelatedFreeEventsFor(serviceProvider.calendarId, date);
    const timeOfOpenings: number[] = OpeningDay.getTimeOfOpenings(date, openingDay, service, this.reservationConfig, events, freeEvents);

    if (!timeOfOpenings || timeOfOpenings.length === 0) {
      serviceProvider.available = false;
      return;
    }

    if (!time) {
      serviceProvider.available = true;
      return;
    }

    const durationInMinutes: number = Time.getDurationInMinutes(time);

    for (const timeOfOpening of timeOfOpenings) {
      if (timeOfOpening === durationInMinutes) {
        serviceProvider.available = true;
        return;
      }
    }

    const withCapacityEventsByDate = this.eventHolderService.getWithCapacityEventsByDate(date);
    if (withCapacityEventsByDate && withCapacityEventsByDate.length > 0) {
      for (const withCapacityEvent of withCapacityEventsByDate) {
        if (withCapacityEvent.calendarId === serviceProvider.calendarId) {
          serviceProvider.available = true;
          return;
        }
      }
    }
    serviceProvider.available = false;
  }

  public setFormLanguage(): void {
    if (!this.business || !this.business.language) {
      return;
    }
    this.languageService.setLanguageForForm(this.business.language);
  }

  /**
   * Happen when user click on specific time (after date is selected)
   */
  public tryToPushDateAndTimes(): void {
    if (this.calendarEvent.dateAndTimeAndIds == null) {
      this.calendarEvent.dateAndTimeAndIds = [];
    }

    if (this.calendarEvent.service && !this.calendarEvent.service.allowMultipleBooking) {
      this.calendarEvent.dateAndTimeAndIds = []; // multiple bookings are not allowed, reset for every new adding
    }

    if (this.calendarEvent.dateAndTimeAndIds.length > FormServiceAbstract.MAX_BOOKINGS_IN_1_SESSION) {
      return; // do not allow adding more than MAX_BOOKINGS_IN_1_SESSION bookings per one reservation session
    }

    for (const dateAndTime of this.calendarEvent.dateAndTimeAndIds) {
      if (MyDate.isEqual(dateAndTime.date, this.calendarEvent.startDate) && Time.isEqual(dateAndTime.time, this.calendarEvent.startTime)) {
        return; // do not put same time
      }
    }
    this.calendarEvent.dateAndTimeAndIds.push(new EventDateAndTimeAndId(
      this.calendarEvent.id,
      this.calendarEvent.keyguruReservationId,
      this.calendarEvent.startDate,
      this.calendarEvent.startTime));
    this.calendarEvent.dateAndTimeAndIds.sort((d1: EventDateAndTime, d2: EventDateAndTime): number => {
      if (MyDate.isAfter(d1.date, d2.date)) {
        return 1;
      }
      if (MyDate.isBefore(d1.date, d2.date)) {
        return -1;
      }
      if (Time.isAfter(d1.time, d2.time)) {
        return 1;
      }
      if (Time.isBefore(d1.time, d2.time)) {
        return -1;
      }
    });
  }

  protected loadReservationConfig(): void {
    this.http.get(Api.RESERVATION_CONFIG + '/' + this.business.id,
      (reservationConfig: ReservationConfig) => {
        this.reservationConfig = reservationConfig;
        if (!reservationConfig) {
          console.error('Cant get reservationConfig from business, creating default one.');
          this.reservationConfig = new ReservationConfig();
          this.reservationConfig.reservationTimePrefix = 0;
        }
      });
  }

  protected loadTemplate(callback?: () => void) {
    this.http.get(Api.TEMPLATE + '/' + this.business.templateId + '?activeOnly=true', (template: ReservationTemplate) => {
      this.template = template;
      if (this.template) {
        this.fire(Event.TEMPLATE_LOADED)
      }
      this.setDefaultValuesForEvent();
      if (callback) {
        callback();
      }
    });
  }

  /**
   *
   * @param cardName
   * @param doNotNavigate - for case when navigation is done by browser buttons
   * @private
   */
  private navigate(cardName: string, doNotNavigate: boolean): void {
    if (!doNotNavigate) {
      cardName = cardName.toLocaleLowerCase().replace('_', '-');
      this.router.navigate([this.modeService.urlPrefix + 'form-' + cardName]);
    }
    this.currentUrl = this.modeService.urlPrefix + 'form-' + cardName;
  }

  private getRelatedEventsFor(calendarId: string,
                              date: MyDate): EventFromCalendar[] {
    const relatedEvents: EventFromCalendar[] = [];
    const eventsByDate = this.eventHolderService.getEventsByDate(date);
    for (const event of eventsByDate) {
      if (event.calendarId !== calendarId) {
        continue;
      }
      relatedEvents.push(event);
    }
    return relatedEvents;
  }

  private getRelatedFreeEventsFor(calendarId: string,
                                  date: MyDate): EventFromCalendar[] {
    const relatedEvents: EventFromCalendar[] = [];
    for (const event of this.eventHolderService.alreadyExistingFreeEvents) {
      if (event.calendarId !== calendarId) {
        continue;
      }

      if (MyDate.isEqual(event.startDate, date)) {
        relatedEvents.push(event);
      }
    }
    return relatedEvents;
  }

  /**
   * Skip if there are no customFields for given service or if its coupon
   */
  private skipCustomWindow(): boolean {
    if (this.calendarEvent.service == null) {
      return true;
    }

    for (const customFieldsForService of this.template.windows[this.idx].config.customFieldsForServices) {
      if (customFieldsForService &&
        customFieldsForService.serviceId === this.calendarEvent.service.id &&
        customFieldsForService.customFields.length > 0
      ) {
        return false;
      }
    }
    return true;
  }

  abstract loadAlreadyExistingEventsForService(from: YearMonth,
                                               till: YearMonth,
                                               callback: () => void): void;

  abstract validateCreatingReservation(callback: (validation: ValidationError[]) => void): void;

  abstract loadBusinessAndTemplate(callback: () => void): void;

  abstract createReservation(callback?: () => void): void;

  abstract createReservationFromSession(sessionId: string, callback?: (data?: any) => void): void;

  abstract doesDaysHaveAnyEventOrItsClosed(date: MyDate,
                                           serviceProviders: ServiceProvider[],
                                           numOfDays: number): boolean;

  /**
   * Action when user close the modal form popup or pres OK button at the and of the reservation
   * for the
   * DEMO mode - go back to dashboard-reservation-form
   * PRODUCTION mode - go back to users domain page
   *
   */
  abstract finishReservation(): void;


  public urlToValue(url: string): number {
    if (!url) {
      return -1;
    }

    if (url.includes('form-business-branch')) {
      return 0;
    }
    if (url.includes('form-service-group')) {
      return 1;
    }
    if (url.includes('form-service')) {
      return 2;
    }
    if (url.includes('form-service-duration')) {
      return 3;
    }
    if (url.includes('form-date')) {
      return 4;
    }
    if (url.includes('form-voucher')) {
      return 5;
    }
    if (url.includes('form-custom')) {
      return 6;
    }
    if (url.includes('form-note')) {
      return 7;
    }
    if (url.includes('form-contact')) {
      return 8;
    }
    if (url.includes('form-summary')) {
      return 9;
    }
    if (url.includes('form-thanks-paid')) {
      return 10;
    }
    if (url.includes('form-paid-error')) {
      return 11;
    }
    if (url.includes('form-thanks')) {
      return 12;
    }

    return -1;
  }

  public calculatePrice(): number {
    if (!this.calendarEvent.service ||
      !this.calendarEvent.service.price) {
      return -1;
    }
    const quantity: number = this.calculateQuantity();
    return quantity * this.calendarEvent.service.price;
  }

  public calculateQuantity(): number {
    if (this.calendarEvent.service.type === ServiceType.COUPON) {
      return 1;
    }

    let numberOfDates = 1;
    if (
      this.calendarEvent &&
      this.calendarEvent.dateAndTimeAndIds &&
      this.calendarEvent.dateAndTimeAndIds.length &&
      this.calendarEvent.dateAndTimeAndIds.length > 0) {
      numberOfDates = this.calendarEvent.dateAndTimeAndIds.length
    }

    if (this.calendarEvent.service.durationNotSpecified &&
      this.calendarEvent.service.type !== ServiceType.COURSE &&
      this.calendarEvent.service.durationMin.days &&
      this.calendarEvent.service.durationMin.days > 0) {
      return this.calendarEvent.requestedAttendeesNo * numberOfDates * this.calendarEvent.service.duration.days;
    }
    if (this.calendarEvent.service.durationNotSpecified &&
      this.calendarEvent.service.type !== ServiceType.COURSE) {
      const totalMinutes = (this.calendarEvent.service.duration.hours * 60) + this.calendarEvent.service.duration.minutes;
      const durationShift = this.getDurationShiftWindow();
      // Calculate how many duration shift windows fit into the total minutes
      const quoter: number = Math.ceil(totalMinutes / durationShift);
      return this.calendarEvent.requestedAttendeesNo * numberOfDates * Math.max(quoter, 1);
    }
    return this.calendarEvent.requestedAttendeesNo * numberOfDates;
  }

}
