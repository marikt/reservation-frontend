import {Component, OnInit} from '@angular/core';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';

@Component({
  selector: 'app-dashboard-voucher',
  templateUrl: './dashboard-voucher.component.html',
  styleUrls: ['./dashboard-voucher.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent
  ],
  standalone: true
})
export class DashboardVoucherComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
