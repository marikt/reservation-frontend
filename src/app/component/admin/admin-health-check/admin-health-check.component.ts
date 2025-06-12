import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {DashboardService} from '../../../service/dashboard.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {HealthCheckResult} from '../../../model/health-check-result';
import {NgForOf, NgIf} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';

@Component({
  selector: 'app-admin-health-check',
  templateUrl: './admin-health-check.component.html',
  styleUrls: ['./admin-health-check.component.scss'],
  imports: [
    NgForOf,
    NgIf,
    DashboardCardComponent,
    DashboardCardLabelComponent
  ],
  standalone: true
})
export class AdminHealthCheckComponent implements OnInit {

  public healthCheckResults: HealthCheckResult[] = [];

  constructor(
    public http: HttpService,
    public modalService: ModalService,
    public dashboardService: DashboardService,
    public spinnerService: SpinnerService,
    public alertService: AlertService,
  ) {
  }

  ngOnInit(): void {
    this.http.get(Api.ADMIN + '/health-check', (data => this.healthCheckResults = data));
  }

  requestRefreshToken(businessId: number) {
    this.http.get(Api.ADMIN + "/refresh-token/" + businessId, (data => this.healthCheckResults = data));
  }
}
