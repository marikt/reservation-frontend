import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Service} from '../../../../../projects/notado-lib/src/lib/model/service';
import {ServiceProvider} from '../../../../../projects/notado-lib/src/lib/model/service-provider';
import {Device} from '../../../../../projects/notado-lib/src/lib/model/device';
import {Worker} from '../../../../../projects/notado-lib/src/lib/model/worker';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {
  GoToGoogleCalendarSettingPopupComponent
} from '../../util/go-to-google-calendar-setting-popup/go-to-google-calendar-setting-popup.component';

@Component({
  selector: 'app-dashboard-calendar-usage',
  templateUrl: './dashboard-calendar-usage.component.html',
  styleUrls: ['./dashboard-calendar-usage.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    NgIf,
    DashboardCardComponent,
    TranslateModule,
    NgForOf,
    NgbTooltip,
    NgSwitch,
    NgSwitchCase,
    GoToGoogleCalendarSettingPopupComponent
  ],
  standalone: true
})
export class DashboardCalendarUsageComponent extends MySubscribable implements OnInit {

  public calendars: CalendarWithOwner[] = [];

  constructor(public dashboardService: DashboardService,
              private http: HttpService,
              public languageService: LanguageService,
              public broadcastService: BroadcastService) {
    super(broadcastService);
  }

  ngOnInit() {
      this.http.get(Api.CALENDAR + '/all-with-owners/' + this.dashboardService.business.id, (calendars: CalendarWithOwner[]) => {
        this.calendars = calendars;
        if (!this.calendars) {
          this.calendars = [];
        }
      });
  }

  getOwnerType(owner: any): string {
    if (owner instanceof Worker) {
      return 'worker';
    } else if (owner instanceof Device) {
      return 'device';
    } else if (owner instanceof Service) {
      return 'service';
    }
    return '';
  }
}


export class CalendarWithOwner extends Calendar {
  public owners: ServiceProvider[];
  public systemCalendar: boolean;
}
