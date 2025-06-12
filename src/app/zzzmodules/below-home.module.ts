import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NotadoCommonModule} from './other-modules/notado-common.module';

import {AudienceComponent} from '../component/intro/audience/audience.component';
import {WhyUsComponent} from '../component/intro/why-us/why-us.component';
import {IntroGoogleContactsSimpleComponent} from '../component/intro/intro-google-contacts-simple/intro-google-contacts-simple.component';
import {FormAdjustmentSimpleComponent} from '../component/intro/form-adjustment-simple/form-adjustment-simple.component';
import {PaymentWhileBookingSimpleComponent} from '../component/intro/payment-while-booking-simple/payment-while-booking-simple.component';
import {NotificationSimpleComponent} from '../component/intro/notification-simple/notification-simple.component';
import {IntegrationSimpleComponent} from '../component/intro/integration-simple/integration-simple.component';
import {LoosingCustomerComponent} from '../component/intro/loosing-customer/loosing-customer.component';
import {CookieDisclaimerComponent} from '../component/intro/cookie-disclaimer/cookie-disclaimer.component';
import {CustomerManagementAnimatedComponent} from '../component/intro/customer-management-animated/customer-management-animated.component';
import {BelowHomeComponent} from '../component/intro/below-home/below-home.component';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {
  IntroCalendarAvailabilitySimpleComponent
} from '../component/intro/intro-calendar-availability-simple/intro-calendar-availability-simple.component';
import {NotadoLibModule} from '../../../projects/notado-lib/src/lib/notado-lib.module';
import {FaqHomeComponent} from '../component/intro/faq-home/faq-home.component';

@NgModule({
  imports: [
    BelowHomeComponent, RouterModule,
    NotadoCommonModule,
    NotadoLibModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HammerModule,
    NgbModule, AudienceComponent,
    FaqHomeComponent,
    WhyUsComponent,
    IntroGoogleContactsSimpleComponent,
    FormAdjustmentSimpleComponent,
    PaymentWhileBookingSimpleComponent,
    NotificationSimpleComponent,
    IntegrationSimpleComponent,
    LoosingCustomerComponent,
    CookieDisclaimerComponent,
    CustomerManagementAnimatedComponent,
    IntroCalendarAvailabilitySimpleComponent],
  providers: [
    // secure module
    NgbModal,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class BelowHomeModule {

}
