import {Component, Input, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {DashboardService} from '../../../../service/dashboard.service';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {ReservationConfig} from '../../../../../../projects/notado-lib/src/lib/model/reservation-config';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-reservation-card-summary',
  templateUrl: './dashboard-reservation-card-summary.component.html',
  styleUrls: ['./dashboard-reservation-card-summary.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class DashboardReservationCardSummaryComponent implements OnInit {

  @Input('window')
  public window: ReservationWindow;

  public reservationConfig: ReservationConfig;

  constructor(public demoService: DemoService,
              public dashboardService: DashboardService,
              public http: HttpService
  ) {
    this.http.get(Api.RESERVATION_CONFIG + '/' + this.dashboardService.business.id,
      (reservationConfig: ReservationConfig) => {
        this.reservationConfig = reservationConfig;
      });
  }

  ngOnInit() {
  }

}
