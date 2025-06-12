import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {DashboardService} from '../../../service/dashboard.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {TodoItemType} from '../../../../../projects/notado-lib/src/lib/enum/todo-item-type';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {
  GoogleConnectPopupInfoComponent,
  GoogleConnectType
} from '../google-calendar-connect-business-item/google-connect-popup-info/google-connect-popup-info.component';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard-path',
  templateUrl: './dashboard-path.component.html',
  styleUrls: ['./dashboard-path.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    RouterLink,
    GoogleConnectPopupInfoComponent
  ],
  standalone: true
})
export class DashboardPathComponent implements OnInit {

  @Input('googleCalendarConnected') public googleCalendarConnected: boolean;
  @Input('reservationButtonAdded') public reservationButtonAdded: boolean;

  public TodoItemType: TodoItemType;

  constructor(
    public http: HttpService,
    public dashboardService: DashboardService,
    public spinnerService: SpinnerService,
    public modalService: ModalService,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {
  }

  public get googleConnectType(): typeof GoogleConnectType {
    return GoogleConnectType;
  }

}
