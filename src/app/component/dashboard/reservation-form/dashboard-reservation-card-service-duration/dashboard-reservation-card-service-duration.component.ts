import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {DemoService} from '../../../../service/demo.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {Duration} from '../../../../../../projects/notado-lib/src/lib/model/duration';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard-reservation-card-service-duration',
  templateUrl: './dashboard-reservation-card-service-duration.component.html',
  styleUrls: ['./dashboard-reservation-card-service-duration.component.scss'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class DashboardReservationCardServiceDurationComponent implements OnInit {
  public duration: number = 2;

  @Output() valueChange: EventEmitter<number> = new EventEmitter();


  constructor(public demoService: DemoService,
              public dashboardService: DashboardService) {
  }

  ngOnInit() {
  }

  onValueChange() {
    this.valueChange.emit(this.duration);
  }
}
