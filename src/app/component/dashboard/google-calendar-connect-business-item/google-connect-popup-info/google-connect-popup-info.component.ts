import {Component, Input, OnInit} from '@angular/core';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {SpinnerService} from '../../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {GoogleCalendarService} from '../../../../service/google-calendar.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-google-connect-popup-info',
  templateUrl: './google-connect-popup-info.component.html',
  styleUrls: ['./google-connect-popup-info.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class GoogleConnectPopupInfoComponent implements OnInit {


  @Input('type')
  public type: GoogleConnectType;
  public connectionInProgress: boolean = false;


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

  public resetGoogleCalendarToken(): void {
    this.startConnectionSpinner();
    // this.spinnerService.show(this.translate.instant('LOADING.CONNECTION_TO_CALENDAR'), 'fas fa-arrows-alt-h');
    this.googleCalendarService.resetGoogleCalendarToken();
  }

  public requestGoogleCalendarToken(): void {
    this.startConnectionSpinner();
    // this.spinnerService.show(this.translate.instant('LOADING.CONNECTION_TO_CALENDAR'), 'fas fa-arrows-alt-h');
    this.googleCalendarService.requestGoogleCalendarToken();
  }

  private startConnectionSpinner() {
    this.connectionInProgress = true;
    setTimeout(() => {
      this.connectionInProgress = false;
    }, 10_000);
  }

  public get googleConnectType(): typeof GoogleConnectType {
    return GoogleConnectType;
  }
}

export enum GoogleConnectType {
  CONNECT, RESET
}
