import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {DashboardService} from '../../../service/dashboard.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {AdminService} from '../../../service/admin.service';
import {NgForOf, NgIf} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    DashboardCardComponent,
    DashboardCardLabelComponent,
    RouterLink
  ],
  standalone: true
})
export class AdminUserComponent implements OnInit {

  constructor(
    public modalService: ModalService,
    public dashboardService: DashboardService,
    public spinnerService: SpinnerService,
    public alertService: AlertService,
    public adminService: AdminService,
  ) {
  }

    ngOnInit() {
        this.adminService.loadUsers();
    }

}
