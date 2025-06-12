import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {Router} from '@angular/router';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {Business} from '../../../../../projects/notado-lib/src/lib/model/business';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-add-business',
  templateUrl: './dashboard-add-business.component.html',
  styleUrls: ['./dashboard-add-business.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    TranslateModule,
    NgForOf,
    NgIf,
    NgbTooltip
  ],
  standalone: true
})
export class DashboardAddBusinessComponent implements OnInit {


  constructor(
    public dashboardService: DashboardService,
    public router: Router,
    public spinnerService: SpinnerService,
    public http: HttpService,
    public userService: UserService,
    public translate: TranslateService,
    private languageService: LanguageService,
  ) {

  }

  ngOnInit(): void {
  }

  public addBusiness(): void {
    this.spinnerService.show(this.translate.instant('LOADING.CREATING_BUSINESS'), 'fas fa-store-alt');
    setTimeout(() => {
      const newBusiness: Business = new Business();
      newBusiness.userId = this.userService.user.id;

      newBusiness.language = this.languageService.language;
      newBusiness.currency = this.languageService.language === 'cz' ? 'Kč' : '€';

      this.http.post(Api.BUSINESS, newBusiness, (business: Business) => {

        // const smsMsg: NotificationMsg = new NotificationMsg();
        // smsMsg.msg = this.translate.instant('SMS_TO_CUSTOMER');
        // smsMsg.type = NotificationTypeEnum.SMS;
        // smsMsg.recipient = NotificationRecipientEnum.CUSTOMER;
        //
        // const emailMsg: NotificationMsg = new NotificationMsg();
        // emailMsg.msg = this.translate.instant('EMAIL_TO_CUSTOMER');
        // emailMsg.type = NotificationTypeEnum.EMAIL;
        // emailMsg.recipient = NotificationRecipientEnum.CUSTOMER;


        // this.http.post(Api.NOTIFICATION_MSG + '/' + business.id, smsMsg,
        //   () => {
        //   });
        // this.http.post(Api.NOTIFICATION_MSG + '/' + business.id, emailMsg,
        //   () => {
        //   });


        this.dashboardService.handleNewBusinessesCreatedFromDashboard(business);
        this.router.navigate(['/dashboard/dashboard-business']);
        setTimeout(() => {
          this.spinnerService.hide();
        }, 500);
      });
    }, 3000);
  }

  public goToBusinessDetail(idx: number) {
    this.dashboardService.switchBusiness(idx);
    this.router.navigate(['/dashboard/dashboard-landing']);
  }

}
