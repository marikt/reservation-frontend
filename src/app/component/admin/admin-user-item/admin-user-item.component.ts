import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../../../projects/notado-lib/src/lib/model/user';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {DashboardService} from '../../../service/dashboard.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {AdminService} from '../../../service/admin.service';
import {ResponseType} from '../../../../../projects/notado-lib/src/lib/enum/response-type.enum';
import {Business} from '../../../../../projects/notado-lib/src/lib/model/business';
import {NgForOf, NgIf} from '@angular/common';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-admin-user-item',
  templateUrl: './admin-user-item.component.html',
  styleUrls: ['./admin-user-item.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule
  ],
  standalone: true
})
export class AdminUserItemComponent implements OnInit {

  public user: User;
  public businesses: Business[] = [];
  public password: string;
  public timezone: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpService,
    public modalService: ModalService,
    public dashboardService: DashboardService,
    public spinnerService: SpinnerService,
    public alertService: AlertService,
    private adminService: AdminService,
  ) {
  }

  ngOnInit() {
    this.user = this.adminService.users[this.route.snapshot.params.idx];
    this.http.get(Api.ADMIN + '/' + this.user.id + '/password',
      (password) => {
        this.password = password
      },
      null,
      ResponseType.TEXT);
    this.loadBusiness();
  }

  public deleteUser(): void {
    this.http.delete(Api.USER + '/' + this.user.id, () => {
      this.modalService.close();
      this.router.navigate(['/dashboard/admin-user']);
    });
  }

  private loadBusiness(): void {
    this.http.get(Api.BUSINESS + '/by-user/' + this.user.id, (businesses: Business[]) => {
      this.businesses = businesses;

      if (this.businesses && this.businesses.length > 0) {
        this.http.get(Api.TIMEZONE + '/' + this.businesses[0].id,
          (timezone: string) => {
            this.timezone = timezone;
          },
          () => {
          },
          ResponseType.TEXT);
      }
    });
  }

  public recreateTemplate(businessId: number): void {
    this.http.get(Api.ADMIN + '/create-business-template/' + businessId, () => {
    });
  }

  public recreateTemplateBackground(businessId: number) {
    this.http.get(Api.ADMIN + '/create-business-template-background/' + businessId, () => {
    });

  }
}
