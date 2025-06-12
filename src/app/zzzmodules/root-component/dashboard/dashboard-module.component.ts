import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {NavigationStart, Router, RouterOutlet} from '@angular/router';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {AuthService} from '../../../../../projects/notado-lib/src/lib/security/service/auth.service';
import {WizardService} from '../../../service/wizard.service';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {NavbarService} from '../../../service/navbar.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {AutoRedirectService} from '../../../service/auto-redirect.service';
import {DashboardService} from '../../../service/dashboard.service';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {Event} from '../../../../../projects/notado-lib/src/lib/util/event.enum';
import {environment} from '../../../environments/environment';
import {
  DashboardMenuHorizontalComponent
} from '../../../component/dashboard/menu/dashboard-menu-horizontal/dashboard-menu-horizontal.component';
import {NgForOf, NgIf} from '@angular/common';
import {
  DashboardMenuHorizontalMobileComponent
} from '../../../component/dashboard/menu/dashboard-menu-horizontal-mobile/dashboard-menu-horizontal-mobile.component';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {DashboardMenuVerticalComponent} from '../../../component/dashboard/menu/dashboard-menu-vertical/dashboard-menu-vertical.component';
import {
  DashboardMenuVerticalSimpleComponent
} from '../../../component/dashboard/menu/dashboard-menu-vertical-simple/dashboard-menu-vertical-simple.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'dashboard-module',
  templateUrl: './dashboard-module.component.html',
  styleUrls: ['./dashboard-module.component.scss'],
  imports: [
    DashboardMenuHorizontalComponent,
    NgIf,
    DashboardMenuHorizontalMobileComponent,
    NgbAlert,
    NgForOf,
    DashboardMenuVerticalComponent,
    DashboardMenuVerticalSimpleComponent,
    RouterOutlet,
    TranslateModule
  ],
  standalone: true
})
export class DashboardModuleComponent extends MySubscribable implements OnInit {

  public route: string = '';
  public environment: any;
  public isMobile: boolean;

  @ViewChild('paymentModal')
  public paymentModal: any;

  constructor(
    public spinnerService: SpinnerService,
    public authService: AuthService,
    public wizardService: WizardService,
    public userService: UserService,
    public broadcastService: BroadcastService,
    public alertService: AlertService,
    public router: Router,
    public navbarService: NavbarService,
    public modalService: ModalService,
    public autoRedirectService: AutoRedirectService, // init the service to activate subscribe
    public dashboardService: DashboardService, // init the service to activate subscribe
    public languageService: LanguageService,
  ) {
    super(broadcastService);
    this.authService.loadUser();
    this.onResize();

    this.environment = environment;
  }

  ngOnInit() {
    this.languageService.initLanguage();
    // scroll on top when redirect
    this.router.events.subscribe(
      (evt) => {
        window.scrollTo(0, 0);
        if (evt instanceof NavigationStart) {
          this.route = evt.url;
          if (this.route === '/') {
            this.route = '/intro';
          }
        }
      });

    this.subscribe(Event.USER_AFTER_PAYMENT, () => {
      this.modalService.close();
      this.modalService.open(this.paymentModal);
    });

  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public goToPayment(): void {
    this.router.navigate(['dashboard/payment']);
    this.modalService.close();
  }

}
