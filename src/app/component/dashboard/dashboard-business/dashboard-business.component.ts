import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router} from '@angular/router';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {MetaService} from '../../../service/meta.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {Event} from '../../../../../projects/notado-lib/src/lib/util/event.enum';
import {ResponseType} from '../../../../../projects/notado-lib/src/lib/enum/response-type.enum';
import {TypeaheadService} from '../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {UserConfigService} from '../../../service/user-config.service';
import {OpeningDay} from '../../../../../projects/notado-lib/src/lib/model/opening-day';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {
  GoogleCalendarConnectBusinessItemComponent
} from '../google-calendar-connect-business-item/google-calendar-connect-business-item.component';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {
  NgbDropdown,
  NgbDropdownButtonItem,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbTypeahead
} from '@ng-bootstrap/ng-bootstrap';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {CalendarDropdownWithRefreshComponent} from '../../util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {OpeningItemComponent} from '../../util/opening-item/opening-item.component';
import {SafeUrlPipe} from '../../../pipe/safe-url.pipe';
import {FormUrlPipe} from '../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

@Component({
  selector: 'app-dashboard-business',
  templateUrl: './dashboard-business.component.html',
  styleUrls: ['./dashboard-business.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    GoogleCalendarConnectBusinessItemComponent,
    FormsModule,
    TranslateModule,
    FormUrlPipe,
    NgIf,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbDropdownButtonItem,
    NgForOf,
    NgbTypeahead,
    VideoTutorialComponent,
    CalendarDropdownWithRefreshComponent,
    OpeningItemComponent,
    SafeUrlPipe,
  ],
  standalone: true
})
export class DashboardBusinessComponent extends MySubscribable implements OnInit {

  public activeCard: string = 'BASIC';

  public showValidation: boolean;
  public urlChanged: boolean;
  public initialUrl: string;
  public calendars: Calendar[] = [];
  public holidayCalendars: Calendar[] = [];
  public calendar: Calendar = new Calendar();
  public publicHolidayCalendar: Calendar = new Calendar();
  public publicHolidayOpen: boolean = true;
  public timezone: string = '';
  public initialTimezone: string = '';
  public currencies: string[] = [];
  public location: string;
  public openingDays: OpeningDay[];

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public http: HttpService,
    public router: Router,
    public broadcastService: BroadcastService,
    public metaService: MetaService,
    public translate: TranslateService,
    public typeaheadService: TypeaheadService,
    public userConfigService: UserConfigService,
    public preventDoubleClickService: PreventDoubleClickService
  ) {
    super(broadcastService);
    this.subscribe(Event.BUSINESS_OR_TEMPLATE_CHANGED,
      () => {
        this.init();
      });
  }

  ngOnInit() {
    this.init();
  }

  private extractSrcFromIframe(iframeHtml: string): string | null {
    const regex = /<iframe.*?src="(.*?)".*?><\/iframe>/;
    const match = iframeHtml.match(regex);
    return match ? match[1] : null;
  }

  private init() {
    this.calendars = [];
    this.holidayCalendars = [];
    this.calendar = new Calendar();
    this.publicHolidayCalendar = new Calendar();
    this.publicHolidayOpen = true;
    this.timezone = '';
    this.initialTimezone = '';
    this.urlChanged = false;
    this.initialUrl = this.dashboardService.business.url;

    if (this.dashboardService.business.location) {
      this.location = this.dashboardService.business.location;
    }
    this.http.get(Api.OPENING_DAY + '/for-business/' + this.dashboardService.business.id,
      (openingDays: OpeningDay[]) => {
        this.openingDays = openingDays;
      });

    this.loadCurrencies();
    if (this.dashboardService.business.googleCalendarConnected) {
      this.loadCalendars();
      this.http.get(Api.TIMEZONE + '/' + this.dashboardService.business.id,
        (timezone: string) => {
          this.timezone = timezone;
          this.initialTimezone = timezone;
        },
        () => {
        },
        ResponseType.TEXT);
    }
  }

  public selectCurrency(currency: string): void {
    this.dashboardService.business.currency = currency;
  }

  private loadCurrencies() {
    this.currencies.push('Kč');
    this.currencies.push('€');
    this.currencies.push('$');
    this.currencies.push('£');
    this.currencies.push('kr');
    this.currencies.push('CHF');
    this.currencies.push('kn');
    this.currencies.push('zł');
    this.currencies.push('₽');
    this.currencies.push('lei');
    this.currencies.push('kr');
    this.currencies.push('₺');
    this.currencies.push('₴');
  }

  public saveBusiness(): void {
    this.preventDoubleClickService.preventFor();
    if (this.dashboardService.business.googleCalendarConnected &&
      this.calendar.id) {
      this.dashboardService.business.calendarId = this.calendar.id;
    }
    if (this.dashboardService.business.googleCalendarConnected &&
      this.publicHolidayCalendar.id) {
      this.dashboardService.business.publicHolidayCalendarId = this.publicHolidayCalendar.id;
      this.publicHolidayOpen = false;
    }

    this.http.put(Api.OPENING_DAY + '/for-business/' + this.dashboardService.business.id, this.openingDays);
    this.dashboardService.saveBusiness(() => {
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });

    if (this.dashboardService.business.googleCalendarConnected && this.timezone && this.timezone !== this.initialTimezone) {
      this.http.put(Api.TIMEZONE + '/' + this.dashboardService.business.id,
        this.timezone,
        (timezoneWrapper) => {
          this.initialTimezone = timezoneWrapper.timezone;
          this.timezone = timezoneWrapper.timezone;
        },
        () => {
        }
      );
    }
  }

  public urlWasEdited($evet: string) {
    if (!this.initialUrl) {
      return;
    }
    if ($evet === this.initialUrl) {
      this.urlChanged = false;
    } else {
      this.urlChanged = true;
    }
  }

  public loadCalendars(): void {

    const businessId = this.dashboardService.business.id;

    this.http.get(Api.CALENDAR + '/holiday/' + businessId, (holidayCalendars: Calendar[]) => {
      this.holidayCalendars = holidayCalendars;
      if (!this.holidayCalendars) {
        this.holidayCalendars = [];
      }
      for (const holidayCalendar of this.holidayCalendars) {
        if (holidayCalendar && holidayCalendar.id === this.dashboardService.business.publicHolidayCalendarId) {
          this.publicHolidayCalendar = holidayCalendar;
          this.publicHolidayOpen = false;
        }
      }
    });

    this.http.get(Api.CALENDAR + '/all/' + businessId, (calendars: Calendar[]) => {
      this.calendars = calendars;
      if (!this.calendars) {
        this.calendars = [];
      }
      for (const calendar of this.calendars) {
        if (calendar && calendar.id === this.dashboardService.business.calendarId) {
          this.calendar = calendar;
        }
      }
    });
  }

  public selectCalendar($event: any): void {
    this.calendar = $event;
  }

  public selectCalendarForPublicHoliday($event: any) {
    this.publicHolidayCalendar = $event;
  }

  public publicHolidayCloseChange($event: Event) {
    if (this.publicHolidayOpen) {
      this.publicHolidayCalendar = new Calendar();
      this.dashboardService.business.publicHolidayCalendarId = null;
    }
  }

  public setBusinessLocation() {
    if (this.location && this.location.includes('<iframe')) {
      this.location = this.extractSrcFromIframe(this.location);
    }
    this.dashboardService.business.location = this.location;
  }

  public deleteBusinessCalendars() {
    this.dashboardService.business.calendarId = null;
    this.calendar = new Calendar();
  }
}
