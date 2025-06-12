import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {NgbDatepickerI18n, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgxStripeModule} from 'ngx-stripe';

import {RouterModule, Routes} from '@angular/router';
import {DashboardLandingComponent} from '../component/dashboard/dashboard-landing/dashboard-landing.component';
import {
  DashboardServiceGroupItemComponent
} from '../component/dashboard/dashboard-service-group-item/dashboard-service-group-item.component';
import {
  DashboardMenuVerticalSimpleComponent
} from '../component/dashboard/menu/dashboard-menu-vertical-simple/dashboard-menu-vertical-simple.component';
import {DashboardCardLabelComponent} from '../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardButtonWixComponent} from '../component/dashboard/button/dashboard-button-wix/dashboard-button-wix.component';
import {DashboardFeedbackComponent} from '../component/dashboard/dashboard-feedback/dashboard-feedback.component';
import {CommonModule, registerLocaleData} from '@angular/common';
import {AdminUserComponent} from '../component/admin/admin-user/admin-user.component';
import {AdminSettingComponent} from '../component/admin/admin-setting/admin-setting.component';
import {CustomDatepickerCzTranslate} from '../../../projects/notado-lib/src/lib/util/custom-datepicker-cz-translate';
import {DashboardCustomerComponent} from '../component/dashboard/dashboard-customer/dashboard-customer.component';
import {DashboardNotificationComponent} from '../component/dashboard/dashboard-notification/dashboard-notification.component';
import {MinimaDark, MinimaLight} from '@alyle/ui/themes/minima';
import {DashboardMessageComponent} from '../component/dashboard/dashboard-message/dashboard-message.component';
import {
  DashboardReservationCardThanksComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-thanks/dashboard-reservation-card-thanks.component';
import {
  IntegrationSmsmanagerComponent
} from '../component/dashboard/integration/integration-detail/integration-smsmanager/integration-smsmanager.component';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {
  DashboardReservationFormGalleryComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-form/dashboard-reservation-form-gallery/dashboard-reservation-form-gallery.component';
import {
  DashboardReservationCardContactComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-contact/dashboard-reservation-card-contact.component';
import {DashboardCardComponent} from '../template/dashboard-card/dashboard-card.component';
import {
  DashboardFormWindowsComponent
} from '../component/dashboard/reservation-form/dashboard-form-windows/dashboard-form-windows.component';
import {DashboardMenuHorizontalComponent} from '../component/dashboard/menu/dashboard-menu-horizontal/dashboard-menu-horizontal.component';
import {
  DashboardReservationCardCustomComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-custom/dashboard-reservation-card-custom.component';
import {DashboardCardFooterComponent} from '../template/dashboard-card-footer/dashboard-card-footer.component';
import {
  IntegrationStripeComponent
} from '../component/dashboard/integration/integration-detail/integration-stripe/integration-stripe.component';
import {
  DashboardFormConfigCardComponent
} from '../component/dashboard/reservation-form/dashboard-form-config-card/dashboard-form-config-card.component';
import {DashboardBusinessComponent} from '../component/dashboard/dashboard-business/dashboard-business.component';
import {
  DashboardReservationCardServiceGroupComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-service-group/dashboard-reservation-card-service-group.component';
import {DashboardButtonWebnodeComponent} from '../component/dashboard/button/dashboard-button-webnode/dashboard-button-webnode.component';
import {DashboardMenuOtherComponent} from '../component/dashboard/menu/dashboard-menu-other/dashboard-menu-other.component';
import {IntegrationPageComponent} from '../component/dashboard/integration/integration-page/integration-page.component';
import {
  DashboardButtonCustomWebForServiceComponent
} from '../component/dashboard/button/dashboard-button-custom-web-for-service/dashboard-button-custom-web-for-service.component';
import {
  DashboardButtonCustomWebComponent
} from '../component/dashboard/button/dashboard-button-custom-web/dashboard-button-custom-web.component';
import {DashboardMenuSupportComponent} from '../component/dashboard/menu/dashboard-menu-support/dashboard-menu-support.component';
import {DashboardDeviceComponent} from '../component/dashboard/dashboard-device/dashboard-device.component';
import {IntegrationCardComponent} from '../component/dashboard/integration/integration-card/integration-card.component';
import {DashboardAddBusinessComponent} from '../component/dashboard/dashboard-add-business/dashboard-add-business.component';
import {DashboardMenuFormComponent} from '../component/dashboard/menu/dashboard-menu-form/dashboard-menu-form.component';
import {DashboardServiceComponent} from '../component/dashboard/dashboard-service/dashboard-service.component';
import {MarketingContactMarkerComponent} from '../component/admin/marketing-contact-marker/marketing-contact-marker.component';
import {DashboardButtonOtherComponent} from '../component/dashboard/button/dashboard-button-other/dashboard-button-other.component';
import {
  DashboardReservationFormComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-form/dashboard-reservation-form.component';
import {DashboardMenuBusinessComponent} from '../component/dashboard/menu/dashboard-menu-business/dashboard-menu-business.component';
import {DashboardWorkerItemComponent} from '../component/dashboard/dashboard-worker-item/dashboard-worker-item.component';
import {LY_THEME} from '@alyle/ui';
import {DashboardImgComponent} from '../component/dashboard/dashboard-img/dashboard-img.component';
import {DashboardValidationComponent} from '../component/dashboard/dashboard-validation/dashboard-validation.component';
import {
  DashboardButtonWordpressComponent
} from '../component/dashboard/button/dashboard-button-wordpress/dashboard-button-wordpress.component';
import {IntegrationStatusComponent} from '../component/dashboard/integration/integration-status/integration-status.component';
import {DashboardNotificationItemComponent} from '../component/dashboard/dashboard-notification-item/dashboard-notification-item.component';
import {
  IntegrationTemplateComponent
} from '../component/dashboard/integration/integration-detail/integration-template/integration-template.component';
import {
  DashboardButtonPlatformComponent
} from '../component/dashboard/button/dashboard-button-platform/dashboard-button-platform.component';
import {DashboardFormPaymentComponent} from '../component/dashboard/dashboard-form-payment/dashboard-form-payment.component';
import {FileUploadModule} from 'ng2-file-upload';
import {
  DashboardReservationCardVoucherComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-voucher/dashboard-reservation-card-voucher.component';
import {
  DashboardReservationCardTimeComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-time/dashboard-reservation-card-time.component';
import {
  DashboardButtonFacebookComponent
} from '../component/dashboard/button/dashboard-button-facebook/dashboard-button-facebook.component';
import {AdminHealthCheckComponent} from '../component/admin/admin-health-check/admin-health-check.component';
import {DashboardMenuVerticalComponent} from '../component/dashboard/menu/dashboard-menu-vertical/dashboard-menu-vertical.component';
import {DashboardDeviceItemComponent} from '../component/dashboard/dashboard-device-item/dashboard-device-item.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {DashboardWorkerComponent} from '../component/dashboard/dashboard-worker/dashboard-worker.component';
import {
  DashboardFormConfigButtonComponent
} from '../component/dashboard/reservation-form/dashboard-form-config-button/dashboard-form-config-button.component';
import {
  DashboardReservationCardDateComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-date/dashboard-reservation-card-date.component';
import {
  IntegrationSlackComponent
} from '../component/dashboard/integration/integration-detail/integration-slack/integration-slack.component';
import {DashboardVoucherComponent} from '../component/dashboard/dashboard-voucher/dashboard-voucher.component';
import {
  DashboardReservationCardComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card/dashboard-reservation-card.component';
import {
  DashboardButtonCloudPlatformComponent
} from '../component/dashboard/button/dashboard-button-cloud-platform/dashboard-button-cloud-platform.component';
import {DashboardServiceItemComponent} from '../component/dashboard/dashboard-service-item/dashboard-service-item.component';
import {
  DashboardReservationFormCustomComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-form/dashboard-reservation-form-custom/dashboard-reservation-form-custom.component';
import {DashboardApiComponent} from '../component/dashboard/dashboard-api/dashboard-api.component';
import {
  IntegrationTwilioComponent
} from '../component/dashboard/integration/integration-detail/integration-twilio/integration-twilio.component';
import {
  DashboardReservationCardNoteComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-note/dashboard-reservation-card-note.component';
import {DashboardProfileComponent} from '../component/dashboard/profile/dashboard-profile/dashboard-profile.component';
import {
  IntegrationPeopleComponent
} from '../component/dashboard/integration/integration-detail/integration-people/integration-people.component';
import {DashboardContactComponent} from '../component/dashboard/dashboard-contact/dashboard-contact.component';
import {
  DashboardReservationCardServiceComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-service/dashboard-reservation-card-service.component';
import {DashboardPathComponent} from '../component/dashboard/dashboard-path/dashboard-path.component';
import {DashboardServiceGroupComponent} from '../component/dashboard/dashboard-service-group/dashboard-service-group.component';
import {
  DashboardReservationCardSummaryComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-summary/dashboard-reservation-card-summary.component';
import {AdminUserItemComponent} from '../component/admin/admin-user-item/admin-user-item.component';
import {
  IntegrationCalendarComponent
} from '../component/dashboard/integration/integration-detail/integration-calendar/integration-calendar.component';
import {environment} from '../environments/environment';
import {Env} from '../../../projects/notado-lib/src/lib/enum/env';
import {DashboardModuleComponent} from './root-component/dashboard/dashboard-module.component';
import {GoogleCalendarConnectedComponent} from '../component/google-calendar/google-calendar-connected/google-calendar-connected.component';
import {GoogleCalendarFailComponent} from '../component/google-calendar/google-calendar-fail/google-calendar-fail.component';
import {PaymentComponent} from '../component/payment/payment/payment.component';
import {PaymentTestComponent} from '../component/payment/payment-test/payment-test.component';
import {FormModule} from './form.module';
import {NotadoLibModule} from '../../../projects/notado-lib/src/lib/notado-lib.module';
import {FormMode} from '../../../projects/notado-lib/src/lib/util/form-mode.enum';
import {TodolistItemComponent} from '../component/dashboard/todolist/todolist-item/todolist-item.component';
import {
  GoogleCalendarConnectBusinessItemComponent
} from '../component/dashboard/google-calendar-connect-business-item/google-calendar-connect-business-item.component';
import {IntPipe} from '../component/pipe/int-pipe';
import {OpeningItemComponent} from '../component/util/opening-item/opening-item.component';
import {NotadoCommonModule} from './other-modules/notado-common.module';

import {
  DashboardReservationConfigComponent
} from '../component/dashboard/dashboard-reservation-config/dashboard-reservation-config.component';
import {DashboardButtonWeeblyComponent} from '../component/dashboard/button/dashboard-button-weebly/dashboard-button-weebly.component';
import {
  DashboardBusinessBranchItemComponent
} from '../component/dashboard/dashboard-business-branch-item/dashboard-business-branch-item.component';
import {DashboardBusinessBranchComponent} from '../component/dashboard/dashboard-business-branch/dashboard-business-branch.component';
import {
  DashboardReservationCardBusinessBranchComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-business-branch/dashboard-reservation-card-business-branch.component';
import {AdminCacheComponent} from '../component/admin/admin-cache/admin-cache.component';
import {
  DashboardButtonSquarespaceComponent
} from '../component/dashboard/button/dashboard-button-squarespace/dashboard-button-squarespace.component';
import {CalendarDropdownWithRefreshComponent} from '../component/util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {Error404Component} from '../component/error/404/error404.component';
import {DashboardExportComponent} from '../component/dashboard/dashboard-export/dashboard-export.component';
import {AddHolidayModalComponent} from '../component/dashboard/module/add-holiday-modal/add-holiday-modal.component';
import {FaqItemComponent} from '../component/faq/faq/faq-item/faq-item.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {
  DashboardCalendarAvailabilityComponent
} from '../component/dashboard/dashboard-calendar-availability/dashboard-calendar-availability.component';
import localeCS from '@angular/common/locales/cs';
import localeSK from '@angular/common/locales/sk';
import localeES from '@angular/common/locales/es';
import localeEN from '@angular/common/locales/en';
import {
  IntegrationEmailComponent
} from '../component/dashboard/integration/integration-detail/integration-email/integration-email.component';
import {NgToggleModule} from 'ng-toggle-button';
import {DashboardCalendarUsageComponent} from '../component/dashboard/dashboard-calendar-usage/dashboard-calendar-usage.component';
import {
  DashboardServiceItemBasicComponent
} from '../component/dashboard/dashboard-service-item/dashboard-service-item-basic/dashboard-service-item-basic.component';
import {
  DashboardServiceItemAdvanceComponent
} from '../component/dashboard/dashboard-service-item/dashboard-service-item-advance/dashboard-service-item-advance.component';
import {
  DashboardServiceItemAutomationComponent
} from '../component/dashboard/dashboard-service-item/dashboard-service-item-automation/dashboard-service-item-automation.component';
import {
  DashboardServiceItemPaymentComponent
} from '../component/dashboard/dashboard-service-item/dashboard-service-item-payment/dashboard-service-item-payment.component';
import {
  DashboardReservationCardServiceDurationComponent
} from '../component/dashboard/reservation-form/dashboard-reservation-card-service-duration/dashboard-reservation-card-service-duration.component';
import {
  DashboardServiceItemDurationComponent
} from '../component/dashboard/dashboard-service-item/dashboard-service-item-duration/dashboard-service-item-duration.component';
import {DashboardMenuAddItemComponent} from '../component/dashboard/menu/dashboard-menu-add-item/dashboard-menu-add-item.component';
import {
  DashboardServiceItemLocationComponent
} from '../component/dashboard/dashboard-service-item/dashboard-service-item-location/dashboard-service-item-location.component';
import {LoadingProgressComponent} from '../component/dashboard/loading-progress/loading-progress.component';
import {
  DashboardMenuHorizontalMobileComponent
} from '../component/dashboard/menu/dashboard-menu-horizontal-mobile/dashboard-menu-horizontal-mobile.component';
import {DragulaModule} from 'ng2-dragula';
import {AdminActiveUserComponent} from '../component/admin/admin-active-user/admin-active-user.component';
import {DashboardCouponComponent} from '../component/dashboard/dashboard-coupon/dashboard-coupon.component';
import {DashboardCouponItemComponent} from '../component/dashboard/dashboard-coupon-item/dashboard-coupon-item.component';
import {LicenceComponent} from '../component/licence/licence.component';
import {PrivacyPolicyComponent} from '../component/privacy-policy/privacy-policy.component';
import {AdminLogComponent} from '../component/admin/admin-log/admin-log.component';
import {DashboardEventDetailComponent} from '../component/dashboard/dashboard-event-detail/dashboard-event-detail.component';
import {
  IntegrationKeyguruComponent
} from '../component/dashboard/integration/integration-detail/integration-keyguru/integration-keyguru.component';
import {FormUrlPipe} from '../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

registerLocaleData(localeCS);
registerLocaleData(localeSK);
registerLocaleData(localeES);
registerLocaleData(localeEN);

let publicKey;

if (environment.environment === Env.PRODUCTION) {
  publicKey = 'pk_live_51HIoBcFFiLVDY4VL1OIwzDyWAs1htVciVKQl7BvKbj02I4QHkHKYSF3DyUNsSK1UPJnCFKcipS8OoSvDCtu50Ktb00GrVeXtK0';
} else {
  publicKey = 'pk_test_51HkXziAuDZZ3454kJkLnoKXUaPyg2WKnzcBFiGc1F1gDoJajqHNvKPOm3rGR2uTLKVvIpcZlD098ItAOPi4etRAd00000PfKmd';
}


const routes: Routes =
  [

    {
      path: '',
      component: DashboardModuleComponent,
      children: [
        {path: 'dashboard-landing', component: DashboardLandingComponent},
        {path: 'dashboard-service', component: DashboardServiceComponent},
        {path: 'dashboard-coupon', component: DashboardCouponComponent},
        {path: 'dashboard-service-group', component: DashboardServiceGroupComponent},
        {path: 'dashboard-button-custom-web', component: DashboardButtonCustomWebComponent},
        {path: 'dashboard-button-platform', component: DashboardButtonPlatformComponent},
        {path: 'dashboard-button-cloud-platform', component: DashboardButtonCloudPlatformComponent},
        {path: 'dashboard-service-item/:serviceId', component: DashboardServiceItemComponent},
        {path: 'dashboard-coupon-item/:couponId', component: DashboardCouponItemComponent},
        {path: 'dashboard-service-group-item/:serviceGroupId', component: DashboardServiceGroupItemComponent},
        {path: 'dashboard-business-branch-item/:businessBranchId', component: DashboardBusinessBranchItemComponent},
        {path: 'dashboard-business-branch', component: DashboardBusinessBranchComponent},
        {path: 'dashboard-worker', component: DashboardWorkerComponent},
        {path: 'dashboard-worker-item/:workerId', component: DashboardWorkerItemComponent},
        {path: 'dashboard-device', component: DashboardDeviceComponent},
        {path: 'dashboard-device-item/:deviceId', component: DashboardDeviceItemComponent},
        {path: 'dashboard-img', component: DashboardImgComponent},
        {path: 'dashboard-business', component: DashboardBusinessComponent},
        {path: 'dashboard-voucher', component: DashboardVoucherComponent},
        {path: 'dashboard-profile', component: DashboardProfileComponent},
        {path: 'dashboard-customer', component: DashboardCustomerComponent},
        {path: 'dashboard-reservation-form', component: DashboardReservationFormComponent},
        {path: 'dashboard-reservation-form-payment', component: DashboardFormPaymentComponent},
        {path: 'dashboard-reservation-form-windows', component: DashboardFormWindowsComponent},
        {path: 'dashboard-add-business', component: DashboardAddBusinessComponent},
        {path: 'dashboard-message', component: DashboardMessageComponent},
        {path: 'dashboard-notification', component: DashboardNotificationComponent},
        {path: 'dashboard-notification-item/:idx', component: DashboardNotificationItemComponent},
        {path: 'dashboard-contact', component: DashboardContactComponent},
        {path: 'dashboard-feedback', component: DashboardFeedbackComponent},
        {path: 'dashboard-integration', component: IntegrationPageComponent},
        {path: 'dashboard-api', component: DashboardApiComponent},
        {path: 'dashboard-reservation-config', component: DashboardReservationConfigComponent},
        {path: 'dashboard-export', component: DashboardExportComponent},
        {path: 'dashboard-calendar-availability', component: DashboardCalendarAvailabilityComponent},
        {path: 'dashboard-calendar-usage', component: DashboardCalendarUsageComponent},
        {path: 'licence', component: LicenceComponent},
        {path: 'privacy-policy', component: PrivacyPolicyComponent},
        {path: 'dashboard-event-detail', component: DashboardEventDetailComponent},

        {path: 'google-calendar-connected', component: GoogleCalendarConnectedComponent},
        {path: 'google-calendar-fail', component: GoogleCalendarFailComponent},

        {path: 'payment/:promo', component: PaymentComponent},
        {path: 'payment', component: PaymentComponent},
        {path: 'payment-test', component: PaymentTestComponent},

        {path: 'admin-setting', component: AdminSettingComponent},
        {path: 'admin-cache', component: AdminCacheComponent},
        {path: 'admin-log', component: AdminLogComponent},
        {path: 'admin-user', component: AdminUserComponent},
        {path: 'admin-active-user', component: AdminActiveUserComponent},
        {path: 'admin-health-check', component: AdminHealthCheckComponent},
        {path: 'admin-marketing-contact-marker', component: MarketingContactMarkerComponent},
        {path: 'admin-user-item/:idx', component: AdminUserItemComponent},
        {path: '**', component: Error404Component}
      ]
    }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DragulaModule.forRoot(),
    NotadoCommonModule,
    FormModule, // <-- notado form
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgxFileDropModule,
    NotadoLibModule.forRoot(environment.environment, FormMode.DEMO),
    FileUploadModule,
    // Set main theme
    // Add components
    CommonModule,
    HammerModule,
    NgxStripeModule.forRoot(publicKey),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgToggleModule, DashboardModuleComponent,
    DashboardMenuHorizontalMobileComponent,
    GoogleCalendarConnectedComponent,
    GoogleCalendarFailComponent,
    LoadingProgressComponent,
    DashboardServiceComponent,
    DashboardWorkerComponent,
    DashboardDeviceComponent,
    DashboardDeviceItemComponent,
    DashboardServiceItemComponent,
    DashboardServiceItemBasicComponent,
    DashboardServiceItemPaymentComponent,
    DashboardServiceItemAdvanceComponent,
    DashboardServiceItemDurationComponent,
    DashboardServiceItemAutomationComponent,
    DashboardWorkerItemComponent,
    DashboardButtonCustomWebComponent,
    DashboardButtonWixComponent,
    DashboardButtonWordpressComponent,
    DashboardImgComponent,
    DashboardBusinessComponent,
    DashboardButtonPlatformComponent,
    DashboardButtonCloudPlatformComponent,
    DashboardButtonOtherComponent,
    DashboardButtonFacebookComponent,
    DashboardReservationFormComponent,
    DashboardReservationCardComponent,
    DashboardReservationCardContactComponent,
    DashboardReservationCardServiceComponent,
    DashboardReservationCardServiceDurationComponent,
    DashboardReservationCardDateComponent,
    DashboardReservationCardSummaryComponent,
    DashboardReservationCardThanksComponent,
    DashboardReservationCardTimeComponent,
    DashboardLandingComponent,
    DashboardCardComponent,
    DashboardCardLabelComponent,
    DashboardVoucherComponent,
    DashboardReservationCardVoucherComponent,
    DashboardReservationCardNoteComponent,
    DashboardReservationCardCustomComponent,
    DashboardProfileComponent,
    DashboardValidationComponent,
    DashboardPathComponent,
    DashboardFormWindowsComponent,
    DashboardAddBusinessComponent,
    DashboardServiceGroupComponent,
    DashboardServiceGroupItemComponent,
    DashboardReservationCardServiceGroupComponent,
    DashboardReservationCardBusinessBranchComponent,
    DashboardMessageComponent,
    DashboardNotificationComponent,
    DashboardNotificationItemComponent,
    DashboardContactComponent,
    DashboardFeedbackComponent,
    DashboardCustomerComponent,
    DashboardFormConfigCardComponent,
    DashboardFormConfigButtonComponent,
    DashboardFormPaymentComponent,
    DashboardCardFooterComponent,
    DashboardReservationFormCustomComponent,
    DashboardReservationFormGalleryComponent,
    DashboardApiComponent,
    DashboardButtonWebnodeComponent,
    DashboardButtonSquarespaceComponent,
    DashboardButtonWeeblyComponent,
    DashboardButtonCustomWebForServiceComponent,
    DashboardBusinessBranchComponent,
    DashboardBusinessBranchItemComponent,
    DashboardReservationConfigComponent,
    DashboardExportComponent,
    DashboardServiceItemLocationComponent,
    GoogleCalendarConnectBusinessItemComponent,
    DashboardCalendarAvailabilityComponent,
    DashboardMenuAddItemComponent,
    DashboardMenuVerticalComponent,
    DashboardMenuHorizontalComponent,
    DashboardMenuBusinessComponent,
    DashboardMenuFormComponent,
    DashboardMenuOtherComponent,
    DashboardMenuSupportComponent,
    DashboardMenuVerticalSimpleComponent,
    CalendarDropdownWithRefreshComponent,
    IntegrationStatusComponent,
    IntegrationCardComponent,
    IntegrationPageComponent,
    IntegrationSmsmanagerComponent,
    IntegrationTwilioComponent,
    IntegrationTemplateComponent,
    IntegrationStripeComponent,
    IntegrationPeopleComponent,
    IntegrationCalendarComponent,
    IntegrationKeyguruComponent,
    IntegrationEmailComponent,
    IntegrationSlackComponent,
    PaymentComponent,
    PaymentTestComponent,
    AdminUserComponent,
    AdminActiveUserComponent,
    AdminSettingComponent,
    AdminCacheComponent,
    AdminUserItemComponent,
    AdminHealthCheckComponent,
    MarketingContactMarkerComponent,
    TodolistItemComponent,
    OpeningItemComponent,
    IntPipe,
    FormUrlPipe,
    AddHolidayModalComponent,
    FaqItemComponent,
    DashboardCalendarUsageComponent],
  providers: [
    // secure module
    NgbModal,
    FormUrlPipe,
    [{provide: NgbDatepickerI18n, useClass: CustomDatepickerCzTranslate}],
    {provide: LY_THEME, useClass: MinimaLight, multi: true}, // name: `minima-light`
    {provide: LY_THEME, useClass: MinimaDark, multi: true}, // name: `minima-dark`
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class DashboardModule {

}
