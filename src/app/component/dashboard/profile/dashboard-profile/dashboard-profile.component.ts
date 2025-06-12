import {Component, OnInit} from '@angular/core';
import {MySubscribable} from '../../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {UserService} from '../../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {Router} from '@angular/router';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {MetaService} from '../../../../service/meta.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {AuthService} from '../../../../../../projects/notado-lib/src/lib/security/service/auth.service';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {ResponseType} from '../../../../../../projects/notado-lib/src/lib/enum/response-type.enum';
import {DashboardService} from '../../../../service/dashboard.service';
import {PaymentPlan} from '../../../../util/payment-plan';
import {SpinnerService} from '../../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardLabelComponent} from '../../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../../template/dashboard-card/dashboard-card.component';
import {FormsModule} from '@angular/forms';
import {NgbCollapse, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-profile',
  templateUrl: './dashboard-profile.component.html',
  styleUrls: ['./dashboard-profile.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    FormsModule,
    TranslateModule,
    NgbCollapse,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgIf
  ],
  standalone: true
})
export class DashboardProfileComponent extends MySubscribable implements OnInit {

  public isCollapsedAdvance: boolean = true;
  showValidation: boolean;


  constructor(
    public userService: UserService,
    public router: Router,
    public broadcastService: BroadcastService,
    public dashboardService: DashboardService,
    public metaService: MetaService,
    public authService: AuthService,
    public http: HttpService,
    public spinnerService: SpinnerService,
    public languageService: LanguageService,
    public translate: TranslateService,
    private alertService: AlertService,
    public preventDoubleClickService: PreventDoubleClickService
  ) {
    super(broadcastService);
  }

  ngOnInit() {
  }

  public saveUserAccount() {
    this.preventDoubleClickService.preventFor();
    this.userService.update(this.userService.user, () => {
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });
    this.userService.user.newPassword = '';
  }

  public goToBillingPortal(): void {
    this.spinnerService.show(this.translate.instant('LOADING.PAYMENT_PORTAL'), 'fab fa-cc-stripe');
    this.http.get(Api.PAYMENT + '/' + this.userService.user.id + '/billing-portal-url',
      (url: string) => {
        window.open(url, '_self');
      },
      () => {},
      ResponseType.TEXT);
  }

  public get paymentPlan(): typeof PaymentPlan {
    return PaymentPlan;
  }


  changeLanguage(language: string) {
    this.languageService.setLanguageAndRedirectToUrlLang(language)
    this.dashboardService.business.language = language;
    this.dashboardService.saveBusiness();
  }
}
