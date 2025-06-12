import {Component, Input, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-reservation-card-service',
  templateUrl: './dashboard-reservation-card-service.component.html',
  styleUrls: ['./dashboard-reservation-card-service.component.scss'],
  imports: [
    NgIf,
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class DashboardReservationCardServiceComponent implements OnInit {


  @Input('window')
  public window: ReservationWindow;
  public currencyName: string;


  constructor(public demoService: DemoService,
              public dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.currencyName = this.dashboardService.business.currency;
  }

}
