import {ErrorHandler, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

import {MinimaDark, MinimaLight} from '@alyle/ui/themes/minima';
import {LY_THEME} from '@alyle/ui';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {Error404Component} from '../component/error/404/error404.component';
import {NotadoCommonModule} from './other-modules/notado-common.module';
import {FaqAttendeesComponent} from '../component/faq/faq/faq-items/faq-attendees/faq-attendees.component';
import {FaqModuleComponent} from './root-component/faq/faq-module.component';
import {FaqTemplateComponent} from '../component/faq/faq/faq-items/faq-template/faq-template.component';
import {FaqGoogleCalendarComponent} from '../component/faq/faq/faq-items/faq-google-calendar/faq-google-calendar.component';
import {FaqNotificationComponent} from '../component/faq/faq/faq-items/faq-notification/faq-notification.component';

import {FaqZoomComponent} from '../component/faq/faq/faq-items/faq-zoom/faq-zoom.component';
import {FaqVacationComponent} from '../component/faq/faq/faq-items/faq-vacation/faq-vacation.component';
import {FaqSpecificCloseDaysComponent} from '../component/faq/faq/faq-items/faq-specific-close-days/faq-specific-close-days.component';
import {FaqEditEventComponent} from '../component/faq/faq/faq-items/faq-edit-event/faq-edit-event.component';
import {FaqCancelEventComponent} from '../component/faq/faq/faq-items/faq-cancel-event/faq-cancel-event.component';
import {FaqPhoneBookingComponent} from '../component/faq/faq/faq-items/faq-phone_booking/faq-phone-booking.component';
import {FaqVoucherComponent} from '../component/faq/faq/faq-items/faq-voucher/faq-voucher.component';
import {FaqShareComponent} from '../component/faq/faq/faq-items/faq-share/faq-share.component';
import {FaqCourseComponent} from '../component/faq/faq/faq-items/faq-course/faq-course.component';
import {FaqMultipleBusinessComponent} from '../component/faq/faq/faq-items/faq-multiple-business/faq-multiple-business.component';
import {
  FaqButtonForEachServiceComponent
} from '../component/faq/faq/faq-items/faq-button-for-each-service/faq-button-for-each-service.component';
import {FaqCacheComponent} from '../component/faq/faq/faq-items/faq-cache/faq-cache.component';
import {FaqInvoiceComponent} from '../component/faq/faq/faq-items/faq-invoice/faq-invoice.component';
import {FaqSubscriptionCancelComponent} from '../component/faq/faq/faq-items/faq-subscription-cancel/faq-subscription-cancel.component';
import {FaqCustomerComponent} from '../component/faq/faq/faq-items/faq-customer/faq-customer.component';
import {
  FaqNotificationFromOwnEmailComponent
} from '../component/faq/faq/faq-items/faq-notification-from-own-email/faq-notification-from-own-email.component';
import {FaqOvertimeComponent} from '../component/faq/faq/faq-items/faq-overtime/faq-overtime.component';
import {FaqPaymentComponent} from '../component/faq/faq/faq-items/faq-payment/faq-payment.component';
import {FaqIntroComponent} from '../component/faq/faq/faq-items/faq-intro/faq-intro.component';
import {FaqTimeManagementComponent} from '../component/faq/faq/faq-items/faq-time-management/faq-time-management.component';
import {FaqTimezoneComponent} from '../component/faq/faq/faq-items/faq-timezone/faq-timezone.component';


const routes: Routes =
  [
    {
      path: '',
      component: FaqModuleComponent,
      children: [
        {
          path: ':language/intro',
          component: FaqIntroComponent
        },
        {
          path: ':language/attendees',
          component: FaqAttendeesComponent
        },
        {
          path: ':language/google-calendar',
          component: FaqGoogleCalendarComponent
        },
        {
          path: ':language/notification',
          component: FaqNotificationComponent
        },
        {
          path: ':language/notification-from-own-email',
          component: FaqNotificationFromOwnEmailComponent
        },
        {
          path: ':language/zoom',
          component: FaqZoomComponent
        },
        {
          path: ':language/vacation',
          component: FaqVacationComponent
        },
        {
          path: ':language/specific-close-days',
          component: FaqSpecificCloseDaysComponent
        },
        {
          path: ':language/edit-event',
          component: FaqEditEventComponent
        },
        {
          path: ':language/cancel-event',
          component: FaqCancelEventComponent
        },
        {
          path: ':language/timezone',
          component: FaqTimezoneComponent
        },
        {
          path: ':language/phone-booking',
          component: FaqPhoneBookingComponent
        },
        {
          path: ':language/voucher',
          component: FaqVoucherComponent
        },
        {
          path: ':language/share',
          component: FaqShareComponent
        },
        {
          path: ':language/course',
          component: FaqCourseComponent
        },
        {
          path: ':language/payment',
          component: FaqPaymentComponent
        },
        {
          path: ':language/multiple-business',
          component: FaqMultipleBusinessComponent
        },
        {
          path: ':language/button-for-each-service',
          component: FaqButtonForEachServiceComponent
        },
        {
          path: ':language/cache',
          component: FaqCacheComponent
        },
        {
          path: ':language/customer',
          component: FaqCustomerComponent
        },
        {
          path: ':language/invoice',
          component: FaqInvoiceComponent
        },
        {
          path: ':language/subscription-cancel',
          component: FaqSubscriptionCancelComponent
        },
        {
          path: ':language/overtime',
          component: FaqOvertimeComponent
        },
        {
          path: ':language/time-management',
          component: FaqTimeManagementComponent
        },
        {path: '**', component: Error404Component}
      ]
    },
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NotadoCommonModule,
    ReactiveFormsModule,
    // Set main theme
    // Add components
    CommonModule,
    HammerModule,
    FaqIntroComponent,
    FaqAttendeesComponent,
    FaqModuleComponent,
    FaqTemplateComponent,
    FaqGoogleCalendarComponent,
    FaqNotificationComponent,
    FaqZoomComponent,
    FaqVacationComponent,
    FaqSpecificCloseDaysComponent,
    FaqEditEventComponent,
    FaqCancelEventComponent,
    FaqPhoneBookingComponent,
    FaqVoucherComponent,
    FaqShareComponent,
    FaqCourseComponent,
    FaqMultipleBusinessComponent,
    FaqButtonForEachServiceComponent,
    FaqCacheComponent,
    FaqCustomerComponent,
    FaqInvoiceComponent,
    FaqSubscriptionCancelComponent,
    FaqNotificationFromOwnEmailComponent,
    FaqOvertimeComponent,
    FaqPaymentComponent,
    FaqTimeManagementComponent,
    FaqTimezoneComponent],
  providers: [
    // secure module
    NgbModal,
    {provide: LY_THEME, useClass: MinimaLight, multi: true}, // name: `minima-light`
    {provide: LY_THEME, useClass: MinimaDark, multi: true}, // name: `minima-dark`
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class FaqModule {

}
