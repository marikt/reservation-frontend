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
import {FormsModule} from '@angular/forms';
import {User} from '../../../../../projects/notado-lib/src/lib/model/user';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';

@Component({
  selector: 'app-active-admin-user',
  templateUrl: './admin-active-user.component.html',
  styleUrls: ['./admin-active-user.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    DashboardCardComponent,
    DashboardCardLabelComponent,
    RouterLink,
    FormsModule
  ],
  standalone: true
})
export class AdminActiveUserComponent implements OnInit {

  constructor(
    public modalService: ModalService,
    public dashboardService: DashboardService,
    public spinnerService: SpinnerService,
    public alertService: AlertService,
    public adminService: AdminService,
    public http: HttpService,
  ) {
  }

  ngOnInit() {
    this.adminService.loadActiveUsers();
  }

  public saveUser(user: User): void {
    this.http.put(Api.USER + '/' + user.id, user, () => {
      this.alertService.addInfo('User Saved');
    });
  }
}
