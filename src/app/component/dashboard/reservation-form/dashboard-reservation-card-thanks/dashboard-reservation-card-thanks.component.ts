import {Component, Input, OnInit} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-reservation-card-thanks',
  templateUrl: './dashboard-reservation-card-thanks.component.html',
  styleUrls: ['./dashboard-reservation-card-thanks.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    TranslateModule
  ],
  standalone: true
})
export class DashboardReservationCardThanksComponent implements OnInit {

  @Input('window')
  public window: ReservationWindow;

  constructor(public demoService: DemoService,
              public dashboardService: DashboardService) {

  }

  ngOnInit() {
  }

}
