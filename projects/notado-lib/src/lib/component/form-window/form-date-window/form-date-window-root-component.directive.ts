import {Directive, HostListener, OnInit} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {ServiceType} from '../../../enum/service-type';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {MyDate} from '../../../model/date';
import {Event} from '../../../util/event.enum';
import {ServiceProvider} from '../../../model/service-provider';
import {ServiceMax} from '../../../model/service-max';
import {YearMonth} from '../../../util/year-month';
import {NgbDatepickerNavigateEvent} from '@ng-bootstrap/ng-bootstrap';

@Directive()
export class FormDateWindowRootComponent extends MyForm implements OnInit {

  public COURSE_COUNT_THRESHOLD: number = 15;

  public today: MyDate;
  public maxDate: MyDate = new MyDate(new Date(2090, 1));
  public date: MyDate;

  public model: any;

  public isMobile: boolean;
  public eventsLoaded: boolean = false;

  private disabledDaysCache: Map<MyDate, Boolean> = new Map<MyDate, Boolean>();

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
    this.subscribe(Event.RESERVATION_WORKER_SELECTED, () => {
      this.disabledDaysCache = new Map<MyDate, Boolean>();
    });
    this.subscribe(Event.RESERVATION_TIME_SELECTED, () => {
      this.valid = true;
    });
    this.onResize();
  }

  public isDurationInDays(): boolean {
    const service: ServiceMax = this.formService.calendarEvent.service;
    if (service.durationNotSpecified) {
      return service.durationMin.days && service.durationMin.days > 0;
    }
    return service.duration.days && service.duration.days > 0;
  }

  public ngOnInit() {
  }

  public init() {
    super.ngOnInit();
    this.formService.calendarEvent.dateAndTimeAndIds = [];
    // TODO template is loaded async make sure that its loaded
    let from: YearMonth;
    let till: YearMonth;
    if (this.formService.calendarEvent.service.type === ServiceType.COURSE) {
      // If you change this, change also the key for cleaning cache!
      // as key is done base on the dates
      from = YearMonth.toYearMonth(new Date());
      till = YearMonth.toYearMonth(new Date()).plusMonths(10);
    } else if (new Date().getDate() > 20) {
      from = YearMonth.toYearMonth(new Date());
      till = YearMonth.toYearMonth(new Date());
    } else {
      // load long term events like vacations
      from = YearMonth.toYearMonth(new Date()).minusMonth();
      till = YearMonth.toYearMonth(new Date()).minusMonth();
    }
    this.formService.clearExistingEvents();
    this.eventsLoaded = false;
    this.formService.loadAlreadyExistingEventsForService(from, till, () => {
      this.today = new MyDate();

      if (this.formService.reservationConfig.reservationTimePostfix &&
        this.formService.reservationConfig.reservationTimePostfix > 1) {
        const maxDateWithPostfix: Date = new Date();
        maxDateWithPostfix.setDate(maxDateWithPostfix.getDate() + this.formService.reservationConfig.reservationTimePostfix);
        this.maxDate = new MyDate(maxDateWithPostfix);
      } else {
        // default reservationTimePostfix is 365 days
        const maxDateWithPostfix: Date = new Date();
        maxDateWithPostfix.setDate(maxDateWithPostfix.getDate() + 365);
        this.maxDate = new MyDate(maxDateWithPostfix);
      }

      if (!this.formService.calendarEvent.worker
        && this.formService.calendarEvent.service.type === ServiceType.APPOINTMENT) {
        this.formService.calendarEvent.worker = this.formService.business.workers.find(
          w => this.formService.calendarEvent.service.workers.includes(w.id));
      }

      if (!this.formService.calendarEvent.device
        && this.formService.calendarEvent.service.type === ServiceType.DEVICE) {
        this.formService.calendarEvent.device = this.formService.business.devices.find(
          d => this.formService.calendarEvent.service.devices.includes(d.id));
      }

      if (this.formService.openReservationForThisDate) {
        this.formService.calendarEvent.startDate = this.formService.openReservationForThisDate;
        this.date = this.formService.openReservationForThisDate;
        this.formService.openReservationFormForDate = null;
      } else if (this.formService.calendarEvent.startDate) {
        this.date = this.formService.calendarEvent.startDate;
      } else {
        const selectedDefaultDate: Date = new Date();
        if (this.formService.reservationConfig.reservationTimePrefix &&
          this.formService.reservationConfig.reservationTimePrefix >= 1) {
          selectedDefaultDate.setDate(new Date().getDate() + (this.formService.reservationConfig.reservationTimePrefix / 24));
        } else {
          selectedDefaultDate.setDate(new Date().getDate());
        }
        this.date = new MyDate(selectedDefaultDate);
        this.formService.calendarEvent.startDate = this.date;
      }
      this.formService.calculateTimesOnDateChange(this.date);
      this.eventsLoaded = true;
    });
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth <= 767) { // 767 its because otherwise datepicker and time picker are bellow each other and it look ugly
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public get serviceType(): typeof ServiceType {
    return ServiceType;
  }

  public isDayEnableForCourse(date: MyDate): boolean {
    const coursesByDate = this.formService.eventHolderService.getEventsByDate(date);
    if (coursesByDate && coursesByDate.length > 0) {
      // Filter out courses without capacity
      const coursesWithCapacity = coursesByDate.filter(course => course.hasCapacity);
      return coursesWithCapacity.length > 0;
    }
    return false;
  }

  public onMonthChange($event: NgbDatepickerNavigateEvent, callback?: () => void): void {
    const myDate = new MyDate();
    myDate.month = $event.next.month;
    myDate.year = $event.next.year;
    this.doOnMonthChange(myDate, 1, () => {
      if (callback) {
        callback();
      }
    });
  }

  public doOnMonthChange(date: MyDate, defaultDay: number, callback: () => void): void {
    this.eventsLoaded = false;
    if (!this.date) {
      this.date = new MyDate();
      this.date.day = 1;
    }
    if (!MyDate.isCurrentMonth(date)) {
      this.date.day = defaultDay;
    }
    this.date.month = date.month;
    this.date.year = date.year;
    this.formService.loadAlreadyExistingEventsForService(
      new YearMonth(date.year, date.month),
      new YearMonth(date.year, date.month),
      () => {
        this.eventsLoaded = true;
        this.formService.calculateTimesOnDateChange(this.date);
        callback();
      }
    );
  }

  public isDayDisabled(date: MyDate): boolean {
    const isDisabled = this.disabledDaysCache.get(date);
    if (isDisabled === undefined) {
      const dayDisabled: boolean = this.isDayDisabledEvaluation(date);
      this.disabledDaysCache.set(date, Boolean(dayDisabled));
      return dayDisabled;
    }
    return isDisabled.valueOf();
  }

  public isDayDisabledForWholeDay(date: MyDate): boolean {
    const isDisabled = this.disabledDaysCache.get(date);
    if (isDisabled === undefined) {
      const dayDisabled: boolean = this.isDayDisabledEvaluationForWholeDay(date);
      this.disabledDaysCache.set(date, Boolean(dayDisabled));
      return dayDisabled;
    }
    return isDisabled.valueOf();
  }

  private isDayDisabledEvaluationForWholeDay(date: MyDate): boolean {

    if (MyDate.isBefore(date, this.today) || MyDate.isEqual(date, this.today)) {
      return true;
    }
    if (date.month !== this.date.month) {
      return true;
    }

    try {
      let serviceProviders: ServiceProvider[] = [];
      const calendarEvent = this.formService.calendarEvent;
      const serviceType: ServiceType = calendarEvent.service.type;
      if (serviceType === ServiceType.COURSE) {
        return false;
      }
      if (serviceType === ServiceType.APPOINTMENT) {
        if (calendarEvent.worker) {
          serviceProviders.push(calendarEvent.worker);
        } else {
          serviceProviders = this.formService.getWorkers();
        }
      } else if (serviceType === ServiceType.DEVICE) {
        if (calendarEvent.device) {
          serviceProviders.push(calendarEvent.device);
        } else {
          serviceProviders = this.formService.getDevices();
        }
      }
      return this.formService.doesDaysHaveAnyEventOrItsClosed(date, serviceProviders, this.formService.calendarEvent.service.duration.days);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  private isDayDisabledEvaluation(date: MyDate): boolean {

    if (MyDate.isBefore(date, this.today)) {
      return true;
    }
    if (date.month !== this.date.month) {
      return true;
    }

    try {
      let serviceProviders: ServiceProvider[] = [];
      const calendarEvent = this.formService.calendarEvent;
      const serviceType: ServiceType = calendarEvent.service.type;
      if (serviceType === ServiceType.COURSE) {
        return false;
      }
      if (serviceType === ServiceType.APPOINTMENT) {
        if (calendarEvent.worker) {
          serviceProviders.push(calendarEvent.worker);
        } else {
          serviceProviders = this.formService.getWorkers();
        }
      } else if (serviceType === ServiceType.DEVICE) {
        if (calendarEvent.device) {
          serviceProviders.push(calendarEvent.device);
        } else {
          serviceProviders = this.formService.getDevices();
        }
      }
      return !this.formService.doesDayHaveAnyTimeWindow(date, serviceProviders);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  public validate(): boolean {
    if (this.formService.calendarEvent.service.type === ServiceType.APPOINTMENT ||
      this.formService.calendarEvent.service.type === ServiceType.DEVICE) {
      if (this.isDurationInDays() && this.formService.calendarEvent.startDate) {
        return true;
      }
      if (!this.isDurationInDays() &&
        this.formService.calendarEvent.startDate &&
        this.formService.calendarEvent.startTime &&
        this.formService.calendarEvent.dateAndTimeAndIds &&
        this.formService.calendarEvent.dateAndTimeAndIds.length > 0
      ) {
        return true;
      }
    } else if (this.formService.calendarEvent.service.type === ServiceType.COURSE &&
      this.formService.calendarEvent.id &&
      this.formService.calendarEvent.dateAndTimeAndIds &&
      this.formService.calendarEvent.dateAndTimeAndIds.length > 0
  ) {
      return true;
    }
    return false;
  }
}
