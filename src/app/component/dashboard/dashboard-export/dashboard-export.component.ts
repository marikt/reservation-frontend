import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {ResponseType} from '../../../../../projects/notado-lib/src/lib/enum/response-type.enum';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {CalendarDropdownWithRefreshComponent} from '../../util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {TranslateModule} from '@ngx-translate/core';


@Component({
  selector: 'app-dashboard-export',
  templateUrl: './dashboard-export.component.html',
  styleUrls: ['./dashboard-export.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    CalendarDropdownWithRefreshComponent,
    TranslateModule
  ],
  standalone: true
})
export class DashboardExportComponent implements OnInit {

  public urlChanged: boolean;
  public initialUrl: string;
  public calendars: Calendar[] = [];
  public calendar: Calendar = new Calendar();
  public timezone: string = '';
  public initialTimezone: string = '';

  constructor(
    public http: HttpService,
    public dashboardService: DashboardService
  ) {
  }

  ngOnInit() {
    this.urlChanged = false;
    this.initialUrl = this.dashboardService.business.url;
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

  public loadCalendars(): void {
    const businessId = this.dashboardService.business.id;
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

  public exportCalendar(): void {
    const businessId = this.dashboardService.business.id;

    this.http.getCsv(Api.CALENDAR + '/export/' + businessId + '/' + this.calendar.id, () => {});
  }
}
