import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {DemoService} from '../../../../service/demo.service';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-reservation-card-contact',
  templateUrl: './dashboard-reservation-card-contact.component.html',
  styleUrls: ['./dashboard-reservation-card-contact.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class DashboardReservationCardContactComponent implements OnInit {

  @Input('window')
  public window: ReservationWindow;

  constructor(
    public dashboardService: DashboardService,
    public demoService: DemoService
  ) {
  }

  ngOnInit() {
  }

}
