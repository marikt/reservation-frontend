import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {DemoService} from '../../../../service/demo.service';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-reservation-card-voucher',
  templateUrl: './dashboard-reservation-card-voucher.component.html',
  styleUrls: ['./dashboard-reservation-card-voucher.component.scss'],
  imports: [
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class DashboardReservationCardVoucherComponent implements OnInit {

    constructor(
        public dashboardService: DashboardService,
        public demoService: DemoService
    ) {
    }

    ngOnInit() {
    }

}
