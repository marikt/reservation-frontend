import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {LanguageService} from '../../../projects/notado-lib/src/lib/service/language.service';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  public showMainBar: boolean;
  public showFooter: boolean;
  public showMainBarSimple: boolean;
  public showDashboardBar: boolean;
  public showSimpleDashboardBar: boolean;
  public showEducationButton: boolean;
  public showWizardSkipButton: boolean;
  public showBlogLabel: boolean;

  private subscription: Subscription;

  /**
   *  this service handles logic when the navbar should appear
   *  we have showMainBar (horizontal bar in the main page) & showDashboardBar (vertical bar on dashboard)
   */
  constructor(
    private router: Router,
    public http: HttpService,
    public languageService: LanguageService,
  ) {
    this.subscription = router.events.subscribe((val) => {
      // see also
      if (!(val instanceof NavigationEnd)) {
        return;
      }
      const navigationEnd = val as NavigationEnd;
      if (
        navigationEnd.url.includes('add-business') ||
        navigationEnd.url.includes('business-wizard') ||
        navigationEnd.url.includes('tutorial') ||
        navigationEnd.url.includes('dashboard') ||
        navigationEnd.url.includes('admin') ||
        navigationEnd.url.includes('google-calendar') ||
        navigationEnd.url.includes('/licence') ||
        navigationEnd.url.includes('/privacy-policy') ||
        navigationEnd.url.includes('/release-notes') ||
        navigationEnd.url.includes('/demo') ||
        navigationEnd.url === '/dashboard/payment' ||
        navigationEnd.url === '/dashboard/payment/discount' ||
        navigationEnd.url.includes('/payment-test') ||
        navigationEnd.url.includes('/signup') ||
        navigationEnd.url.includes('/form')
      ) {
        this.showMainBar = false;
      } else {
        this.showMainBar = true;
      }

      if (
        navigationEnd.url.includes('/signup')
      ) {
        this.showFooter = false;
      } else {
        this.showFooter = true;
      }

      if (navigationEnd.url.includes('blog')) {
        this.showBlogLabel = true;
      } else {
        this.showBlogLabel = false;
      }


      if (
        navigationEnd.url.includes('/privacy-policy') ||
        navigationEnd.url.includes('/release-notes') ||
        navigationEnd.url === '/dashboard/payment' ||
        navigationEnd.url === '/dashboard/payment/discount' ||
        navigationEnd.url.includes('/licence')
      ) {
        this.showMainBarSimple = true;
      } else {
        this.showMainBarSimple = false;
      }

      if (
        navigationEnd.url.includes('/dashboard-button-custom-web') ||
        navigationEnd.url === '/dashboard/dashboard-reservation-form' ||
        navigationEnd.url === '/dashboard/payment' ||
        navigationEnd.url === '/dashboard/payment/discount' ||
        navigationEnd.url.includes('/payment-test')
      ) {
        this.showSimpleDashboardBar = true;
      } else {
        this.showSimpleDashboardBar = false;
      }

      if (
        (navigationEnd.url.includes('dashboard') && !this.showSimpleDashboardBar) ||
        navigationEnd.url.includes('admin')
      ) {
        this.showDashboardBar = true;
      } else {
        this.showDashboardBar = false;
      }

      this.showEducationButton = false;

      if (
        navigationEnd.url.includes('wizard') &&
        !(
          navigationEnd.url.includes('business-wizard-join') ||
          navigationEnd.url.includes('business-wizard-url')
        )
      ) {
        this.showWizardSkipButton = true;
      } else {
        this.showWizardSkipButton = false;
      }

    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
