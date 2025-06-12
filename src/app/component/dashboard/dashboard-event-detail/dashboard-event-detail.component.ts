import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgbPopover, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {
  GoToGoogleCalendarSettingPopupComponent
} from '../../util/go-to-google-calendar-setting-popup/go-to-google-calendar-setting-popup.component';
import {FormsModule} from '@angular/forms';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';

@Component({
  selector: 'app-dashboard-event-detail',
  templateUrl: './dashboard-event-detail.component.html',
  styleUrls: ['./dashboard-event-detail.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    NgIf,
    DashboardCardComponent,
    TranslateModule,
    NgForOf,
    NgbTooltip,
    NgSwitch,
    NgSwitchCase,
    GoToGoogleCalendarSettingPopupComponent,
    FormsModule,
    NgbPopover
  ],
  standalone: true
})
export class DashboardEventDetailComponent implements OnInit {
  public notadoId: string;
  public eventHistoryRecords: EventHistoryRecord[] = [];

  constructor(public dashboardService: DashboardService,
              private http: HttpService,
              public languageService: LanguageService,
              public broadcastService: BroadcastService) {
  }

  ngOnInit() {
  }

  public showHistory() {
    this.eventHistoryRecords = [];
    const notadoIdMatch = this.notadoId.match(/\[NOTADO_ID: ([^\]]+)\]/);
    const extractedNotadoId = notadoIdMatch ? notadoIdMatch[1] : this.notadoId;
    this.http.get(Api.CALENDAR_EVENT + '/event-detail/' + this.dashboardService.business.id + '/' + extractedNotadoId, (eventHistoryRecords: EventHistoryRecord[]) => {
        this.eventHistoryRecords = eventHistoryRecords;
      },
      (error) => {
        console.error(error);
      });
  }
}

export class EventHistoryRecord {
  public action: string;
  public date: string;
  public user: string;
}

