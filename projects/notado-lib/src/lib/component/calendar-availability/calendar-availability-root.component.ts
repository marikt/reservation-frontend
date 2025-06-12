import {Directive, HostListener, OnInit, ViewChild} from '@angular/core';
import {isSameDay, isSameMonth, startOfWeek} from 'date-fns';
import {Subject} from 'rxjs';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {EventForAvailability} from '../../model/event/event-for-availability';
import {FormService} from '../../service/form.service';
import {LanguageService} from '../../service/language.service';
import {HttpService} from '../../service/http.service';
import {Server} from '../../../config/server';
import {CalendarEventSearchCriteria} from '../../model/search/calendar-event-search-criteria';
import {ServiceType} from '../../enum/service-type';
import {Api} from '../../enum/api';
import {EventAction, EventColor} from 'calendar-utils';
import {OpeningDayRange} from '../../model/opening-day';
import {Time} from '../../model/time';
import {CalendarForAvailability, CalendarForAvailabilityType} from '../../model/calendar-for-availability';
import {ModalService} from '../../service/modal.service';
import {TranslateService} from '@ngx-translate/core';
import {FormUrlPipe} from '../../pipe/form-url.pipe';
import {NotificationOnCancelService} from '../../service/notification-on-cancel.service';


@Directive()
export abstract class CalendarAvailabilityRootComponent implements OnInit {
  public view: CalendarView = CalendarView.Week;
  public CalendarView = CalendarView;
  public viewDate: Date = new Date();
  public dayStartHour: number = 8;
  public dayEndHour: number = 18;
  public refresh: Subject<any> = new Subject();
  public events: CalendarEventWithCalendar[] = [];
  public busyEventsWeek: number = -1;
  public activeDayIsOpen: boolean = true;
  public calendarsForAvailability: CalendarForAvailability[];
  public selectedDate: Date;
  public busyEvents: CalendarEventWithCalendar[];

  public selectedEventWithCapacity: CalendarEventWithCalendar;
  @ViewChild('notificationModal', {static: false}) notificationModal: any;


  public daysInWeek = 7;
  @ViewChild('createEventModal')
  public createEventModal: any;
  @ViewChild('assignForCourseModal')
  public assignForCourseModal: any;
  @ViewChild('assignForAppointmentModal')
  public assignForAppointmentModal: any;
  public isMobile: boolean;

  protected constructor(public formService: FormService,
                        public languageService: LanguageService,
                        public http: HttpService,
                        public modalService: ModalService,
                        public translate: TranslateService,
                        public server: Server,
                        public notificationService?: NotificationOnCancelService) {
  }

  ngOnInit(): void {
    this.onResize();
    this.setViewDateToStartOfWeek();
    this.formService.loadBusinessAndTemplate(() => {
      if (this.formService.reservationConfig && this.formService.reservationConfig.defaultCalendarAvailabilityView) {
        this.view = this.formService.reservationConfig.defaultCalendarAvailabilityView;
      } else {
        this.view = CalendarView.Week;
      }

      const searchCriteria: CalendarEventSearchCriteria = new CalendarEventSearchCriteria();
      searchCriteria.business = this.formService.business.id;
      searchCriteria.type = ServiceType.APPOINTMENT;
      this.calendarsForAvailability = [];
      this.http.get(Api.CALENDAR_EVENT + '/search-for-calendar-availability/' + this.formService.business.id,
        (data: CalendarForAvailability[]) => {
          this.calendarsForAvailability = data;
          if (this.calendarsForAvailability) {
            for (const calendarForAvailability of this.calendarsForAvailability) {
              calendarForAvailability.show = true;
            }
            this.mapEvents();
          }
        });
      this.setDayConstraints();
    });
  }

  private setViewDateToStartOfWeek() {
    this.viewDate = startOfWeek(new Date(), {weekStartsOn: 1});
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
    if (window.innerWidth < 576) {
      this.daysInWeek = 2;
    } else if (window.innerWidth < 768) {
      this.daysInWeek = 3;
    } else if (window.innerWidth < 960) {
      this.daysInWeek = 5;
    } else {
      this.daysInWeek = 7;
    }
  }


  public dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    this.selectedDate = date;

    if (this.isMobile) {
      const pipe = new FormUrlPipe();
      window.open(pipe.transform(this.formService.business.url) + '/form-date-selected/' + this.encodedURISelectedDate(), '_blank');
    } else {
      this.modalService.open(this.createEventModal, {size: 'lg'});
    }

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  public eventClicked($event: { event: any; sourceEvent: any }) {
    this.selectedDate = $event.event.start;
    this.selectedEventWithCapacity = $event.event;

    // Handle events with no remaining capacity
    if ($event.event.remainingCapacity <= 0) {
      // Show notification modal only for:
      // 1. Events of type COURSE with remainingCapacity = 0
      // 2. Events with notadoEvent = true and remainingCapacity = 0
      if (($event.event.type === ServiceType.COURSE || $event.event.notadoEvent === true) && this.notificationModal) {
        this.modalService.open(this.notificationModal, {
          size: 'sm',
          centered: true,
          backdrop: 'static',
          keyboard: false,
          windowClass: 'notification-modal-responsive'
        });
      }
      return;
    }

    if (this.isMobile) {
      const pipe = new FormUrlPipe();
      if (this.selectedEventWithCapacity.type === ServiceType.COURSE) {
        window.open(pipe.transform(this.formService.business.url) + '/form-course-selected/' + this.selectedEventWithCapacity.serviceId + '/' + this.selectedEventWithCapacity.id + '/' + this.selectedEventWithCapacity.remainingCapacity + '/' + this.encodedURISelectedDate(), '_blank');
      } else {
        window.open(pipe.transform(this.formService.business.url) + '/form-service-selected/' + this.selectedEventWithCapacity.serviceId + '/' + this.selectedEventWithCapacity.workerId + '/' + this.encodedURISelectedDate(), '_blank');
      }
    } else {
      if (this.selectedEventWithCapacity.type === ServiceType.COURSE) {
        this.modalService.open(this.assignForCourseModal, {size: 'lg'})
      } else {
        this.modalService.open(this.assignForAppointmentModal, {size: 'lg'})
      }
    }
  }

  public setView(view: CalendarView) {
    this.view = view;
    if (this.view === CalendarView.Week) {
      this.setViewDateToStartOfWeek();
    }
    this.mapEvents();

    // Wait for the events to be rendered before setting up badges
    if (this.view !== CalendarView.Month) {
      setTimeout(() => {
        if (this.setupBadgeDisplay) {
          this.setupBadgeDisplay();
        }
      }, 500);
    }
  }

  public closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
    this.mapEvents();

    // Wait for the events to be rendered before setting up badges
    if (this.view !== CalendarView.Month) {
      setTimeout(() => {
        if (this.setupBadgeDisplay) {
          this.setupBadgeDisplay();
        }
      }, 500);
    }
  }

  public mapEvents(): void {
    this.events = [];
    for (const calendarForAvailability of this.calendarsForAvailability) {
      if (!calendarForAvailability || !calendarForAvailability.show) {
        continue;
      }
      const calendarsEventForAvailability: EventForAvailability[] = calendarForAvailability.calendarEventForAvailability;
      for (const eventForAvailability of calendarsEventForAvailability) {
        let eventTitle: string = this.createTitle(eventForAvailability);
        let color: string = calendarForAvailability.color;
        let cssClass: string = '';
        if (this.view !== CalendarView.Month) {
          cssClass = 'calendar-availability-common';
        }

        if (calendarForAvailability.type === CalendarForAvailabilityType.BUSINESS ||
          calendarForAvailability.type === CalendarForAvailabilityType.HOLIDAY) {
          color = '#fafafa';
          eventTitle = '';
          cssClass = 'calendar-availability-busy';
        }

        const ce: CalendarEventWithCalendar = {
          id: eventForAvailability.id,
          calendarId: eventForAvailability.calendarId,
          start: new Date(eventForAvailability.start),
          end: new Date(eventForAvailability.end),
          title: eventTitle,
          color: {
            primary: color,
            secondary: color
          },
          type: eventForAvailability.type,
          serviceId: eventForAvailability.serviceId,
          workerId: eventForAvailability.workerId,
          remainingCapacity: eventForAvailability.remainingCapacity,
          notadoEvent: eventForAvailability.notadoEvent,
          allDay: false,
          cssClass: cssClass,
          resizable: {
            beforeStart: false,
            afterEnd: false,
          },
          draggable: false,
        };
        this.events.push(ce);
      }
    }
    const busyEvents: CalendarEventWithCalendar[] = this.calculateBusyEvents();
    for (const busyEvent of busyEvents) {
      this.events.push(busyEvent);
    }
  }

  public shiftDays(direction: 'next' | 'prev') {
    const currentDay = this.viewDate.getDay();
    const shiftAmount = direction === 'next' ? 2 : -2;
    const newDate = new Date(this.viewDate);
    newDate.setDate(this.viewDate.getDate() + shiftAmount);
    this.viewDate = newDate;
  }

  public get calendarForAvailabilityType(): typeof CalendarForAvailabilityType {
    return CalendarForAvailabilityType;
  }

  private getCalendarForAvailability(calendarId: string): CalendarForAvailability {
    for (const calendarForAvailability of this.calendarsForAvailability) {
      if (calendarForAvailability.id === calendarId) {
        return calendarForAvailability;
      }
    }
    return null;
  }

  private formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  private createTitle(existingEvent: EventForAvailability) {
    let img = '';
    if (existingEvent && existingEvent.calendarId && this.getCalendarForAvailability(existingEvent.calendarId).img) {
      img = `<img
                      class="img-fluid rounded-circle position-top-right-corner"
                      src="${this.server.SERVER + this.getCalendarForAvailability(existingEvent.calendarId).img}"
                      style=""
                      width="17"
                />`;
    }

    const till = existingEvent.title.indexOf('|');

    const startTime = existingEvent.start ? this.formatTime(new Date(existingEvent.start)) : '';
    const endTime = existingEvent.end ? this.formatTime(new Date(existingEvent.end)) : '';
    const timeRange = startTime && endTime ? `<strong>${startTime} - ${endTime}</strong> <br>` : '';

    let title: string = existingEvent.title.substr(0, till === -1 ? existingEvent.title.length : till);
    title = timeRange + '<h6>' + title + '</h6>' + img;

    if (existingEvent.remainingCapacity &&
      existingEvent.remainingCapacity > 0) {
      title += '<div class="badge badge-light text-wrap position-top-left-corner">';
      title += existingEvent.remainingCapacity;
      title += ' ' + this.translate.instant('FORM.AVAILABILITY.CAPACITY');
      title += '</div>';
    } else {
      if (this.formService.reservationConfig.showNotificationButton &&
        (existingEvent.type === ServiceType.COURSE || existingEvent.notadoEvent === true)) {
        title += '<h6><div id="' + existingEvent.id + '" class="badge badge-dark text-wrap position-top-left-corner"> <i class="fas fa-bell"></i> ' +
          this.translate.instant('FORM.NOTIFY_ME_WHEN_AVAILABLE') +
          '</div></h6>';
      } else {
        title += '<div class="badge badge-dark text-wrap position-top-left-corner full-badge">' +
          this.translate.instant('FORM.AVAILABILITY.FULL') +
          '</div>';

      }
    }
    return title;
  }

  private setDayConstraints(): void {
    for (const openingDay of this.formService.business.openingDays) {
      for (const openingDayRange of openingDay.openingDayRanges) {
        this.dayStartHour = Math.min(openingDayRange.from.hours, this.dayStartHour);
        this.dayEndHour = Math.max(openingDayRange.till.hours, this.dayEndHour);
      }
    }
  }

  private calculateBusyEvents(): CalendarEventWithCalendar[] {
    if (
      this.busyEventsWeek === this.getWeek() ||
      this.view === CalendarView.Month) {
      return;
    }

    this.busyEventsWeek = this.getWeek()

    const busyEvents: CalendarEventWithCalendar[] = [];
    const openingDays = this.formService.business.openingDays;
    for (let i = -1; i < 2; i++) {
      const date: Date = new Date(this.viewDate);
      date.setDate(date.getDate() + (i * 7));
      for (const openingDay of openingDays) {
        const openingRanges = openingDay.openingDayRanges;

        if (openingDay.close) {
          const start = this.getDateOfWeek(date, openingDay.dayOfWeek);
          start.setHours(this.dayStartHour - 1);
          const end = this.getDateOfWeek(date, openingDay.dayOfWeek);
          end.setHours(this.dayEndHour - 1);
          const wholeDayBusyEvent: CalendarEventWithCalendar = {
            id: 'busy-day-' + openingDay.dayOfWeek + '-' + date.getTime(), // Add unique ID for Selenium testing
            title: this.translate.instant('COMMON.CLOSE'),
            calendarId: 'not available',
            start: start,
            end: end,
            cssClass: 'calendar-availability-busy',
            color: {
              primary: '#fafafa',
              secondary: '#fafafa'
            },
            allDay: false,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            draggable: false,
          };
          busyEvents.push(wholeDayBusyEvent);
          continue;
        }

        const busyRanges = this.invertOpeningRanges(openingRanges);
        for (const busyRange of busyRanges) {
          const start = this.getDateOfWeek(date, openingDay.dayOfWeek);
          start.setHours(busyRange.from.hours);
          start.setMinutes(busyRange.from.minutes);
          const end = this.getDateOfWeek(date, openingDay.dayOfWeek);
          end.setHours(busyRange.till.hours);
          end.setMinutes(busyRange.till.minutes);

          const busyEvent: CalendarEventWithCalendar = {
            id: 'busy-range-' + openingDay.dayOfWeek + '-' + start.getTime() + '-' + end.getTime(), // Add unique ID for Selenium testing
            title: '',
            calendarId: 'not available',
            start: start,
            end: end,
            color: {
              primary: '#fafafa',
              secondary: '#fafafa'
            },
            allDay: false,
            cssClass: 'calendar-availability-busy',
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
            draggable: false,
          };
          busyEvents.push(busyEvent);
        }
      }
    }
    return busyEvents;
  }

  private getWeek(): number {
    const dt = new Date(this.viewDate.getFullYear(), 0, 1);
    // @ts-ignore
    return Math.ceil((((this.viewDate - dt) / 86400000) + dt.getDay() + 1) / 7);
  }

  private getDateOfWeek(date: Date, dayOfWeek: string) {
    const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const targetDayIndex = daysOfWeek.indexOf(dayOfWeek);

    // Starting Monday not Sunday
    const resultDate: Date = new Date(date);
    resultDate.setDate((resultDate.getDate() - resultDate.getDay() + 1));
    for (let i = 0; i < daysOfWeek.length; i++) {
      if (i === targetDayIndex) {
        return resultDate;
      }
      resultDate.setDate(resultDate.getDate() + 1);
    }
    return resultDate;
  }

  private invertOpeningRanges(openingRanges: OpeningDayRange[]): OpeningDayRange[] {
    const busyRanges: OpeningDayRange[] = [];

    // Create an initial busy range that covers the entire day
    let currentBusyRange: OpeningDayRange;

    for (let i = 0; i < openingRanges.length; i++) {
      const openingDayRange: OpeningDayRange = openingRanges[i];

      if (currentBusyRange && !currentBusyRange.till) {
        currentBusyRange.till = openingDayRange.from;
        busyRanges.push(currentBusyRange);
      }
      currentBusyRange = new OpeningDayRange();
      currentBusyRange.from = openingDayRange.till;
      if (i === 0) {
        if (this.dayStartHour < openingDayRange.from.hours) {
          const range: OpeningDayRange = new OpeningDayRange();
          range.from = new Time(this.dayStartHour, 0);
          range.till = openingDayRange.from;
          busyRanges.push(range)
        }
        currentBusyRange.from = openingDayRange.till;
      }

      if (i === (openingRanges.length - 1)) {
        if (this.dayEndHour > openingDayRange.till.hours) {
          const range: OpeningDayRange = new OpeningDayRange();
          range.from = openingDayRange.till;
          range.till = new Time(this.dayEndHour, 0);
          busyRanges.push(range)
        }
      }
    }
    return busyRanges;
  }

  public encodedURISelectedDate(): string {
    return encodeURIComponent(this.selectedDate.toUTCString());
  }

  /**
   * Set up badge display for events with no capacity
   * This is implemented in the child component
   */
  protected setupBadgeDisplay(): void {
    // This method is implemented in the child component
  }
}

export class CalendarEventWithCalendar implements CalendarEvent {
  public calendarId: string;
  public id: string; // Make id required for Selenium testing
  public start: Date;
  public end?: Date;
  public type?: ServiceType;
  public serviceId?: number;
  public remainingCapacity?: number;
  public title: string;
  public color?: EventColor;
  public actions?: EventAction[];
  public allDay?: boolean;
  public cssClass?: string;
  public workerId?: number;
  public notadoEvent?: boolean;
  public resizable?: {
    beforeStart?: boolean;
    afterEnd?: boolean;
  };
  public draggable?: boolean;
}
