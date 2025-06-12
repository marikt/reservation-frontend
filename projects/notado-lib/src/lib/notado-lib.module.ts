import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormContactComponent} from './component/form/form-contact/form-contact.component';
import {FormDateComponent} from './component/form/form-date/form-date.component';
import {FormServiceComponent} from './component/form/form-service/form-service.component';
import {FormSummaryComponent} from './component/form/form-summary/form-summary.component';
import {FormThanksComponent} from './component/form/form-thanks/form-thanks.component';
import {DaysHoursMinutesPipe} from './pipe/hours-minutes.pipe';
import {TextShortPipe} from './pipe/text-short.pipe';
import {FormsModule} from '@angular/forms';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NgbDatepickerI18n, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatepickerCzTranslate} from './util/custom-datepicker-cz-translate';
import {FormVoucherComponent} from './component/form/form-voucher/form-voucher.component';
import {FormMode} from './util/form-mode.enum';
import {ModeService} from '../config/mode.service';
import {ModeServiceProd} from '../config/mode.service.prod';
import {FormService} from './service/form.service';
import {FormServiceProd} from './service/form.service.prod';
import {TimeToStringPipe} from './pipe/time-to-string.pipe';
import {MinutesToTimePipe} from './pipe/minutes-to-time.pipe';
import {FormTimeComponent} from './component/form/other/form-time/form-time.component';
import {FormNoteComponent} from './component/form/form-note/form-note.component';
import {Env} from './enum/env';
import {Server} from '../config/server';
import {ServerTest} from '../config/server.test';
import {ServerProd} from '../config/server.prod';
import {FormServiceGroupComponent} from './component/form/form-service-group/form-service-group.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageBarComponent} from './component/language-bar/language-bar.component';
import {
  FormTemplateFullscreenComponent
} from './component/form-type/fullscreen/form-template-fullscreen/form-template-fullscreen.component';
import {FormPaidThanksComponent} from './component/form/form-paid-thanks/form-paid-thanks.component';
import {FormPaidErrorComponent} from './component/form/form-paid-error/form-paid-error.component';
import {FormContactWindowComponent} from './component/form-window/form-contact-window/form-contact-window.component';
import {FormServiceWindowComponent} from './component/form-window/form-service-window/form-service-window.component';
import {
  FormServiceGroupItemWindowComponent
} from './component/form-window/form-service-group-item-window/form-service-group-item-window.component';
import {FormServiceGroupWindowComponent} from './component/form-window/form-service-group-window/form-service-group-window.component';
import {FormSummaryWindowComponent} from './component/form-window/form-summary-window/form-summary-window.component';
import {FormVoucherWindowComponent} from './component/form-window/form-voucher-window/form-voucher-window.component';
import {FormNoteWindowComponent} from './component/form-window/form-note-window/form-note-window.component';
import {FormThanksWindowComponent} from './component/form-window/form-thanks-window/form-thanks-window.component';
import {FormWorkerWindowComponent} from './component/form-window/form-worker-window/form-worker-window.component';
import {FormDeviceWindowComponent} from './component/form-window/form-device-window/form-device-window.component';
import {FormPaidThanksWindowComponent} from './component/form-window/form-paid-thanks-window/form-paid-thanks-window.component';
import {FormPaidErrorWindowComponent} from './component/form-window/form-paid-error-window/form-paid-error-window.component';
import {LanguageBarMobileComponent} from './component/language-bar-mobile/language-bar-mobile.component';
import {FormTodoItemsComponent} from './component/form-todo-items/form-todo-items.component';
import {FormCourseItemComponent} from './component/form/other/form-course-item/form-course-item.component';
import {FormCustomComponent} from './component/form/form-custom/form-custom.component';
import {FormCustomWindowComponent} from './component/form-window/form-custom-window/form-custom-window.component';
import {
  ButtonConfigFullscreenComponent
} from './component/form-type/fullscreen/button-config-fullscreen/button-config-fullscreen.component';
import {
  FormServiceItemWithDescriptionWindowComponent
} from './component/form-window/form-service-item-with-description-window/form-service-item-with-description-window.component';
import {ReservationToServiceComponent} from './component/reservation-to/reservation-to-service/reservation-to-service.component';
import {ButtonConfigWidgetComponent} from './component/form-type/widget/button-config-widget/button-config-widget.component';
import {FormTemplateWidgetComponent} from './component/form-type/widget/form-template-widget/form-template-widget.component';
import {FormHeaderWidgetComponent} from './component/form-type/widget/form-header-widget/form-header-widget.component';
import {FormFooterWidgetComponent} from './component/form-type/widget/form-footer-widget/form-footer-widget.component';
import {CommonModule, registerLocaleData} from '@angular/common';
import {SafeUrlStylePipe} from './pipe/safe-url-style.pipe';
import {FormBusinessBranchWindowComponent} from './component/form-window/form-business-branch/form-business-branch-window.component';
import {
  FormBusinessBranchItemWindowComponent
} from './component/form-window/form-business-branch-item-window/form-business-branch-item-window.component';
import {FormBusinessBranchComponent} from './component/form/form-business-branch/form-business-branch.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {SetAsOwnerComponent} from './component/other/set-as-owner/set-as-owner.component';
import {CalendarAvailabilityComponent} from './component/calendar-availability/calendar-availability/calendar-availability.component';
import localeCS from '@angular/common/locales/cs';
import localeSK from '@angular/common/locales/sk';
import localeES from '@angular/common/locales/es';
import localeEN from '@angular/common/locales/en';
import localePL from '@angular/common/locales/pl';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {FormTemplateSimpleComponent} from './component/form-type/simple/form-template-simple/form-template-simple.component';
import {
  BookingDetailFullscreenComponent
} from './component/form-type/fullscreen/booking-detail-fullscreen/booking-detail-fullscreen.component';
import {VerticalBookingProgressComponent} from './component/form-type/simple/vertical-booking-progress/vertical-booking-progress.component';
import {ReservationToDateComponent} from './component/reservation-to/reservation-to-date/reservation-to-date.component';
import {ReservationToCourseComponent} from './component/reservation-to/reservation-to-course/reservation-to-course.component';
import {FormUrlPipe} from './pipe/form-url.pipe';
import {SafeUrlForFormPipe} from './pipe/safe-url-for-form.pipe';
import {HoursDaysLabelPipe} from './pipe/hours-days-label.pipe';
import {HoursDaysPipe} from './pipe/hours-days.pipe';
import {FormDurationWindowComponent} from './component/form-window/form-duration-window/form-duration-window.component';
import {FormDurationComponent} from './component/form/form-duration/form-duration.component';
import {DurationToStringPipe} from './pipe/duration-to-string.pipe';
import {
  FormDateWindowForAppointmentAndDeviceComponent
} from './component/form-window/form-date-window/form-date-window-for-appointment-and-device/form-date-window-for-appointment-and-device.component';
import {
  FormDateWindowForCourseComponent
} from './component/form-window/form-date-window/form-date-window-for-course/form-date-window-for-course.component';
import {FormDateWindowComponent} from './component/form-window/form-date-window/form-date-window.component';
import {
  CalendarAvailabilityReadOnlyComponent
} from './component/calendar-availability/calendar-availability-read-only/calendar-availability-read-only.component';
import {DateToStringPipe} from './pipe/date-to-string.pipe';
import {FormDateAndTimeItemComponent} from './component/form/other/form-date-and-time-item/form-date-and-time-item.component';
import {
  FormDateWindowForAppointmentAndDeviceDayDurationComponent
} from './component/form-window/form-date-window/form-date-window-for-appointment-and-device-day-duration/form-date-window-for-appointment-and-device-day-duration.component';
import {RatingPipe} from './pipe/rating.pipe';
import {
  ReservationToServiceGroupComponent
} from './component/reservation-to/reservation-to-service-group/reservation-to-service-group.component';
import {SetBusinessForTestComponent} from './component/for-test/set-business-for-test.component';
import {NotificationOnCancelService} from './service/notification-on-cancel.service';

registerLocaleData(localeCS);
registerLocaleData(localeSK);
registerLocaleData(localeES);
registerLocaleData(localeEN);
registerLocaleData(localePL);

@NgModule({
  exports: [
    FormContactComponent,
    FormDurationComponent,
    FormDateComponent,
    FormTimeComponent,
    FormCourseItemComponent,
    FormServiceComponent,
    FormServiceGroupComponent,
    FormSummaryComponent,
    FormVoucherComponent,
    FormCustomComponent,
    FormNoteComponent,
    FormThanksComponent,
    FormTodoItemsComponent,
    FormBusinessBranchComponent,
    FormContactWindowComponent,
    FormDateWindowForAppointmentAndDeviceComponent,
    FormDateWindowForAppointmentAndDeviceDayDurationComponent,
    FormDateWindowForCourseComponent,
    FormServiceWindowComponent,
    FormServiceItemWithDescriptionWindowComponent,
    FormServiceGroupItemWindowComponent,
    FormServiceGroupWindowComponent,
    FormBusinessBranchWindowComponent,
    FormBusinessBranchItemWindowComponent,
    FormSummaryWindowComponent,
    FormVoucherWindowComponent,
    FormCustomWindowComponent,
    FormNoteWindowComponent,
    FormThanksWindowComponent,
    FormWorkerWindowComponent,
    FormDeviceWindowComponent,
    FormDurationWindowComponent,
    FormPaidThanksWindowComponent,
    FormPaidErrorWindowComponent,
    FormDateAndTimeItemComponent,
    ReservationToServiceComponent,
    ReservationToServiceGroupComponent,
    SetBusinessForTestComponent,
    ReservationToDateComponent,
    ReservationToCourseComponent,
    ButtonConfigWidgetComponent,
    FormTemplateWidgetComponent,
    // pipes
    DurationToStringPipe,
    DaysHoursMinutesPipe,
    HoursDaysPipe,
    HoursDaysLabelPipe,
    TextShortPipe,
    TimeToStringPipe,
    DateToStringPipe,
    MinutesToTimePipe,
    RatingPipe,
    FormHeaderWidgetComponent,
    FormFooterWidgetComponent,
    FormDateWindowComponent,
  ], imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    TranslateModule,
    ColorPickerModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormContactComponent,
    FormDurationComponent,
    FormDateComponent,
    FormTimeComponent,
    FormCourseItemComponent,
    FormServiceComponent,
    FormServiceGroupComponent,
    FormSummaryComponent,
    FormVoucherComponent,
    FormCustomComponent,
    FormNoteComponent,
    FormThanksComponent,
    FormTodoItemsComponent,
    FormBusinessBranchComponent,
    FormContactWindowComponent,
    FormDateWindowComponent,
    FormDateAndTimeItemComponent,
    FormDateWindowForAppointmentAndDeviceComponent,
    FormDateWindowForAppointmentAndDeviceDayDurationComponent,
    FormDateWindowForCourseComponent,
    FormServiceWindowComponent,
    FormServiceItemWithDescriptionWindowComponent,
    FormServiceGroupItemWindowComponent,
    FormServiceGroupWindowComponent,
    FormBusinessBranchWindowComponent,
    FormBusinessBranchItemWindowComponent,
    FormSummaryWindowComponent,
    FormVoucherWindowComponent,
    FormCustomWindowComponent,
    FormNoteWindowComponent,
    FormThanksWindowComponent,
    FormWorkerWindowComponent,
    FormDeviceWindowComponent,
    FormDurationWindowComponent,
    FormPaidThanksWindowComponent,
    FormPaidErrorWindowComponent,
    DurationToStringPipe,
    DaysHoursMinutesPipe,
    RatingPipe,
    HoursDaysPipe,
    HoursDaysLabelPipe,
    TextShortPipe,
    TimeToStringPipe,
    DateToStringPipe,
    MinutesToTimePipe,
    ButtonConfigFullscreenComponent,
    LanguageBarComponent,
    LanguageBarMobileComponent,
    FormTemplateFullscreenComponent,
    FormPaidThanksComponent,
    FormPaidErrorComponent,
    ReservationToServiceComponent,
    ReservationToDateComponent,
    ReservationToCourseComponent,
    ButtonConfigWidgetComponent,
    FormTemplateWidgetComponent,
    FormHeaderWidgetComponent,
    FormFooterWidgetComponent,
    FormFooterWidgetComponent,
    CalendarAvailabilityComponent,
    CalendarAvailabilityReadOnlyComponent,
    SetAsOwnerComponent,
    FormTemplateSimpleComponent,
    ReservationToServiceGroupComponent,
    SetBusinessForTestComponent,
    SafeUrlStylePipe,
    HoursDaysPipe,
    HoursDaysLabelPipe,
    SafeUrlForFormPipe,
    FormUrlPipe,
    BookingDetailFullscreenComponent,
    VerticalBookingProgressComponent,
    FormDateWindowComponent],
  providers: [
    TranslateService,
    NotificationOnCancelService,
    NgbModal,
    [{provide: NgbDatepickerI18n, useClass: CustomDatepickerCzTranslate}],
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class NotadoLibModule {

  public static forRoot(
    environment: Env,
    mode: FormMode): ModuleWithProviders<NotadoLibModule> {

    return {
      ngModule: NotadoLibModule,
      providers: [
        {
          provide: ModeService,
          useClass: mode === FormMode.PRODUCTION ? ModeServiceProd : ModeService
        },
        {
          provide: FormService,
          useClass: mode === FormMode.PRODUCTION ? FormServiceProd : FormService
        },
        {
          provide: Server,
          useClass: environment === Env.DEV ? Server : (environment === Env.TEST ? ServerTest : ServerProd)
        }
      ]
    };
  }

  constructor() {
  }

}
