import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {DemoService} from '../../../../service/demo.service';
import {NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {DashboardReservationCardTimeComponent} from '../dashboard-reservation-card-time/dashboard-reservation-card-time.component';

@Component({
  selector: 'app-dashboard-reservation-card-date',
  templateUrl: './dashboard-reservation-card-date.component.html',
  styleUrls: ['./dashboard-reservation-card-date.component.scss'],
  imports: [
    NgbDatepicker,
    FormsModule,
    DashboardReservationCardTimeComponent
  ],
  standalone: true
})
export class DashboardReservationCardDateComponent implements OnInit {

    public date: { year: number; month: number };

    public timesMorning: string[];
    public timesNoon: string[];
    public timesAfternoon: string[];


    constructor(
        public dashboardService: DashboardService,
        public demoService: DemoService,
    ) {

    }

    ngOnInit() {

        this.timesMorning = [];
        this.timesMorning.push('8:00');
        this.timesMorning.push('9:30');
        this.timesMorning.push('10:40');

        this.timesNoon = [];
        this.timesNoon.push('11:00');
        this.timesNoon.push('12:30');
        this.timesNoon.push('13:30');

        this.timesAfternoon = [];
        this.timesAfternoon.push('15:30');
        this.timesAfternoon.push('18:00');
    }

}
