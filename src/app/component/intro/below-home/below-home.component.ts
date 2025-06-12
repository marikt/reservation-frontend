import {Component, HostListener, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../projects/notado-lib/src/lib/util/set-meta';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {MetaService} from '../../../service/meta.service';
import {environment} from '../../../environments/environment';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {DemoService} from '../../../service/demo.service';
import {DemoType} from '../demo/demo.component';
import {FeedbackComponent} from '../feedback/feedback.component';
import {AudienceComponent} from '../audience/audience.component';
import {WhyUsComponent} from '../why-us/why-us.component';
import {IntroGoogleContactsSimpleComponent} from '../intro-google-contacts-simple/intro-google-contacts-simple.component';
import {FormAdjustmentSimpleComponent} from '../form-adjustment-simple/form-adjustment-simple.component';
import {PaymentWhileBookingSimpleComponent} from '../payment-while-booking-simple/payment-while-booking-simple.component';
import {NotificationSimpleComponent} from '../notification-simple/notification-simple.component';
import {IntroCalendarAvailabilitySimpleComponent} from '../intro-calendar-availability-simple/intro-calendar-availability-simple.component';
import {IntegrationSimpleComponent} from '../integration-simple/integration-simple.component';
import {FeaturesComponent} from '../features/features.component';
import {WhatWeKnowListComponent} from '../what-we-know-list/what-we-know-list.component';
import {LoosingCustomerComponent} from '../loosing-customer/loosing-customer.component';
import {FaqHomeComponent} from '../faq-home/faq-home.component';
import {CookieDisclaimerComponent} from '../cookie-disclaimer/cookie-disclaimer.component';
import {DemoModalComponent} from '../demo/demo-modal/demo-modal.component';
import {FooterComponent} from '../footer/footer.component';
import {NgIf} from '@angular/common';
import {NgxFlickeringGridComponent} from '@omnedia/ngx-flickering-grid';
import {TryButtonWithConfigComponent} from '../try-button-with-config/try-button-with-config.component';


@Component({
  selector: 'app-below-home',
  templateUrl: './below-home.component.html',
  standalone: true,
  imports: [
    TryButtonWithConfigComponent,
    TranslateModule,
    FeedbackComponent,
    AudienceComponent,
    WhyUsComponent,
    IntroGoogleContactsSimpleComponent,
    FormAdjustmentSimpleComponent,
    PaymentWhileBookingSimpleComponent,
    NotificationSimpleComponent,
    IntroCalendarAvailabilitySimpleComponent,
    IntegrationSimpleComponent,
    FeaturesComponent,
    WhatWeKnowListComponent,
    LoosingCustomerComponent,
    FaqHomeComponent,
    CookieDisclaimerComponent,
    DemoModalComponent,
    FooterComponent,
    NgIf,
    NgxFlickeringGridComponent
  ],
  styleUrls: ['./below-home.component.scss']
})
export class BelowHomeComponent implements OnInit, SetMeta {

  public state: string;
  public isMobile: boolean;
  public environment: any;

  constructor(
    public http: HttpService,
    public metaService: MetaService,
    public languageService: LanguageService,
    public translate: TranslateService,
    public demoService: DemoService,
  ) {
    this.environment = environment;

  }

  ngOnInit() {
    this.setMeta();
    this.onResize();
  }

  public setState(state: string): void {
    this.state = state;
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.INTRO');
  }

  public get demoTypeEnum(): typeof DemoType {
    return DemoType;
  }

}
