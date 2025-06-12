import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {DashboardService} from '../../../service/dashboard.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {GoogleCalendarService} from '../../../service/google-calendar.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {GoogleConnectPopupInfoComponent, GoogleConnectType} from './google-connect-popup-info/google-connect-popup-info.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-google-calendar-connect-business-item',
  templateUrl: './google-calendar-connect-business-item.component.html',
  styleUrls: ['./google-calendar-connect-business-item.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    GoogleConnectPopupInfoComponent
  ],
  standalone: true
})
export class GoogleCalendarConnectBusinessItemComponent implements OnInit {

  @Input('label')
  public label: string;

  constructor(
    public alertService: AlertService,
    public http: HttpService,
    public modalService: ModalService,
    public dashboardService: DashboardService,
    public spinnerService: SpinnerService,
    public googleCalendarService: GoogleCalendarService,
    public translate: TranslateService
  ) {
  }

  ngOnInit() {
  }

  public get googleConnectType(): typeof GoogleConnectType {
    return GoogleConnectType;
  }
}
