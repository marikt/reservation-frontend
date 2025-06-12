import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {MetaService} from '../../../service/meta.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {ReservationConfig} from '../../../../../projects/notado-lib/src/lib/model/reservation-config';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {TypeaheadService} from '../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {NgIf} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {FormsModule} from '@angular/forms';
import {NgbPopover, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {CalendarDropdownWithRefreshComponent} from '../../util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {DashboardPopoverHelpComponent} from '../dashboard-popover-help/dashboard-popover-help.component';

@Component({
  selector: 'app-dashboard-reservation-config',
  templateUrl: './dashboard-reservation-config.component.html',
  styleUrls: ['./dashboard-reservation-config.component.scss'],
  imports: [
    NgIf,
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule,
    FormsModule,
    NgbTypeahead,
    NgbPopover,
    RouterLink,
    CalendarDropdownWithRefreshComponent,
    DashboardPopoverHelpComponent
  ],
  standalone: true
})
export class DashboardReservationConfigComponent implements OnInit {

  public reservationConfig: ReservationConfig;
  public timeWindowAdaptToServiceDuration: boolean;
  public timeWindowFrom: boolean;

  public calendars: Calendar[] = [];
  public calendar: Calendar = new Calendar();
  public archiveCalendar: Calendar = new Calendar();
  public activeCard: string = 'TIME_LIMIT';


  constructor(public dashboardService: DashboardService,
              public typeaheadService: TypeaheadService,
              public http: HttpService,
              public router: Router,
              public alertService: AlertService,
              public translate: TranslateService,
              public metaService: MetaService,
              public languageService: LanguageService,
              public server: Server,
              public preventDoubleClickService: PreventDoubleClickService) {
    this.http.get(Api.RESERVATION_CONFIG + '/' + this.dashboardService.business.id,
      (reservationConfig: ReservationConfig) => {
        this.reservationConfig = reservationConfig;
        this.timeWindowFrom = (this.reservationConfig.timeWindowFrom && this.reservationConfig.timeWindowFrom === 'END');
        if (!this.reservationConfig.timeWindowSize) {
          this.timeWindowAdaptToServiceDuration = true;
        }
        if (this.dashboardService.business.googleCalendarConnected) {
          this.loadCalendars();
        }
      });
  }

  ngOnInit(): void {
  }

  public saveReservationConfig() {
    this.preventDoubleClickService.preventFor();
    if (this.timeWindowFrom) {
      this.reservationConfig.timeWindowFrom = 'END';
    } else {
      this.reservationConfig.timeWindowFrom = 'START';
    }

    if (this.timeWindowAdaptToServiceDuration) {
      this.reservationConfig.timeWindowSize = null;
    }

    this.http.put(Api.RESERVATION_CONFIG + '/' + this.dashboardService.business.id, this.reservationConfig, () => {
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });
  }

  public loadCalendars(): void {
    const businessId = this.dashboardService.business.id;
    this.http.get(Api.CALENDAR + '/all/' + businessId, (calendars: Calendar[]) => {
      this.calendars = calendars;
      if (!this.calendars) {
        this.calendars = [];
      }
      for (const calendar of this.calendars) {
        if (calendar && calendar.id === this.reservationConfig.archiveReservationCalendar) {
          this.calendar = calendar;
        }
        if (calendar && calendar.id === this.reservationConfig.archiveReservationCalendar) {
          this.archiveCalendar = calendar;
        }
      }
    });
  }

  public selectSwitchCalendar(calendar: Calendar): void {
    this.archiveCalendar = calendar;
    this.reservationConfig.archiveReservationCalendar = calendar.id;
  }

  public clearSwitchCalendar(): void {
    this.reservationConfig.archiveReservationCalendar = null;
    this.archiveCalendar = new Calendar();
  }

}
