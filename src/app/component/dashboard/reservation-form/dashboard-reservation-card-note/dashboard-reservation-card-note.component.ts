import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {DemoService} from '../../../../service/demo.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-dashboard-reservation-card-note',
  templateUrl: './dashboard-reservation-card-note.component.html',
  styleUrls: ['./dashboard-reservation-card-note.component.scss'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class DashboardReservationCardNoteComponent implements OnInit {

    constructor(public dashboardService: DashboardService,
                public demoService: DemoService) {
    }

    ngOnInit() {
    }

}
