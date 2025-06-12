import {Component} from '@angular/core';
import {Event} from '../../projects/notado-lib/src/lib/util/event.enum';
import {MySubscribable} from '../../projects/notado-lib/src/lib/util/my-subscribable';
import {DashboardService} from './service/dashboard.service';
import {Router, RouterOutlet} from '@angular/router';
import {AutoRedirectService} from './service/auto-redirect.service';
import {LanguageService} from '../../projects/notado-lib/src/lib/service/language.service';
import {BroadcastService} from '../../projects/notado-lib/src/lib/service/broadcast.service';
import {AuthService} from '../../projects/notado-lib/src/lib/security/service/auth.service';
import {CONST} from '../../projects/notado-lib/src/lib/util/const';
import {SpinnerService} from '../../projects/notado-lib/src/lib/service/spinner.service';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../../projects/notado-lib/src/lib/service/local-storage.service';
import {HomeComponent} from './component/intro/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    HomeComponent
  ],
  standalone: true
})
export class AppComponent extends MySubscribable {

  constructor(public router: Router,
              public dashboardService: DashboardService, // init the service to activate subscribe
              public autoRedirectService: AutoRedirectService, // init the service to activate subscribe
              public languageService: LanguageService,
              public spinnerService: SpinnerService,
              public broadcastService: BroadcastService,
              private translate: TranslateService,
              private localStorage: LocalStorageService,
              public authService: AuthService) {
    super(broadcastService);
    setTimeout(() => {
        this.authService.loadUser();
      },
      50);

    this.languageService.initLanguage();
    this.subscribe(Event.USER_LOADED, () => {
      const pathname: string = window.location.pathname;
      console.log('xxxxxxxxxxxxxxxxxxxxx')
      console.log('pathname: ' + pathname)

      if (localStorage.get(CONST.GOOGLE_CONNECT_IN_PROGRESS)) {
        localStorage.remove(CONST.GOOGLE_CONNECT_IN_PROGRESS);
        this.spinnerService.show();
        setTimeout(() => {
            this.spinnerService.hide();
            window.location.reload()
          },
          3000);
      }
      if (pathname.includes('form-thanks-paid')) {
      } else if (pathname.includes('form-paid-error')) {
      } else if (pathname.includes('dashboard/dashboard-reservation-form')) {
      } else if (pathname.includes('faq')) {
      } else if (pathname.includes('reservation/cancel')) {
      } else if (pathname.includes('reservation/confirm')) {
      } else if (pathname.includes('reservation/refresh-cache')) {
      } else if (pathname.includes('dashboard/payment-success')) {
      } else if (pathname.includes('form/')) {
        // DO NOT REDIRECT TO LANDING
      } else {
        if (this.localStorage.get(CONST.NEW_USER)) {
          this.router.navigate(['/wizard/business-wizard-start']);
          // this.router.navigate(['/wizard/business-wizard-google-connect']);
        } else {
          // this.router.navigate(['/faq/cs/intro']);
          this.router.navigate(['/dashboard/dashboard-landing']);
          // this.router.navigate(['/dashboard/dashboard-button']);
        }
      }


    });
  }

}
