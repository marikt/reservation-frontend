import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-form-config-button',
  templateUrl: './dashboard-form-config-button.component.html',
  styleUrls: ['./dashboard-form-config-button.component.scss'],
  imports: [
    NgIf,
    TranslateModule
  ],
  standalone: true
})
export class DashboardFormConfigButtonComponent implements OnInit {

  @Input('window')
  public window: ReservationWindow;

  constructor(public dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

}
