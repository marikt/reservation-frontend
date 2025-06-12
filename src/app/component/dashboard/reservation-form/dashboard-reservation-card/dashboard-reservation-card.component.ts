import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {NgSwitch, NgSwitchCase} from '@angular/common';
import {DashboardReservationCardContactComponent} from '../dashboard-reservation-card-contact/dashboard-reservation-card-contact.component';
import {
  DashboardReservationCardServiceGroupComponent
} from '../dashboard-reservation-card-service-group/dashboard-reservation-card-service-group.component';
import {
  DashboardReservationCardBusinessBranchComponent
} from '../dashboard-reservation-card-business-branch/dashboard-reservation-card-business-branch.component';
import {DashboardReservationCardServiceComponent} from '../dashboard-reservation-card-service/dashboard-reservation-card-service.component';
import {
  DashboardReservationCardServiceDurationComponent
} from '../dashboard-reservation-card-service-duration/dashboard-reservation-card-service-duration.component';
import {DashboardReservationCardDateComponent} from '../dashboard-reservation-card-date/dashboard-reservation-card-date.component';
import {DashboardReservationCardVoucherComponent} from '../dashboard-reservation-card-voucher/dashboard-reservation-card-voucher.component';
import {DashboardReservationCardCustomComponent} from '../dashboard-reservation-card-custom/dashboard-reservation-card-custom.component';
import {DashboardReservationCardNoteComponent} from '../dashboard-reservation-card-note/dashboard-reservation-card-note.component';
import {DashboardReservationCardSummaryComponent} from '../dashboard-reservation-card-summary/dashboard-reservation-card-summary.component';
import {DashboardReservationCardThanksComponent} from '../dashboard-reservation-card-thanks/dashboard-reservation-card-thanks.component';

@Component({
  selector: 'app-dashboard-reservation-card',
  templateUrl: './dashboard-reservation-card.component.html',
  styleUrls: ['./dashboard-reservation-card.component.scss'],
  imports: [
    NgSwitch,
    DashboardReservationCardContactComponent,
    DashboardReservationCardServiceGroupComponent,
    DashboardReservationCardBusinessBranchComponent,
    DashboardReservationCardServiceComponent,
    DashboardReservationCardServiceDurationComponent,
    DashboardReservationCardDateComponent,
    DashboardReservationCardVoucherComponent,
    DashboardReservationCardCustomComponent,
    DashboardReservationCardNoteComponent,
    DashboardReservationCardSummaryComponent,
    DashboardReservationCardThanksComponent,
    NgSwitchCase
  ],
  standalone: true
})
export class DashboardReservationCardComponent implements OnInit {

    @Input('window')
    public window: ReservationWindow;

    constructor(public dashboardService: DashboardService) {
    }

    ngOnInit() {
    }

}
