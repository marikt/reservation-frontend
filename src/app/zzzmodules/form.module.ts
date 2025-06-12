import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {NgbDatepickerI18n, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ColorPickerModule} from 'ngx-color-picker';
import {NgxStripeModule} from 'ngx-stripe';

import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {CustomDatepickerCzTranslate} from '../../../projects/notado-lib/src/lib/util/custom-datepicker-cz-translate';
import {MinimaDark, MinimaLight} from '@alyle/ui/themes/minima';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {FormMode} from '../../../projects/notado-lib/src/lib/util/form-mode.enum';
import {LY_THEME} from '@alyle/ui';
import {FileUploadModule} from 'ng2-file-upload';
import {NotadoLibModule} from '../../../projects/notado-lib/src/lib/notado-lib.module';
import {environment} from '../environments/environment';
import {Env} from '../../../projects/notado-lib/src/lib/enum/env';
import {
  ReservationToServiceComponent
} from '../../../projects/notado-lib/src/lib/component/reservation-to/reservation-to-service/reservation-to-service.component';
import {FormContactComponent} from '../../../projects/notado-lib/src/lib/component/form/form-contact/form-contact.component';
import {
  FormServiceGroupComponent
} from '../../../projects/notado-lib/src/lib/component/form/form-service-group/form-service-group.component';
import {FormServiceComponent} from '../../../projects/notado-lib/src/lib/component/form/form-service/form-service.component';
import {FormDateComponent} from '../../../projects/notado-lib/src/lib/component/form/form-date/form-date.component';
import {FormVoucherComponent} from '../../../projects/notado-lib/src/lib/component/form/form-voucher/form-voucher.component';
import {FormCustomComponent} from '../../../projects/notado-lib/src/lib/component/form/form-custom/form-custom.component';
import {FormNoteComponent} from '../../../projects/notado-lib/src/lib/component/form/form-note/form-note.component';
import {FormSummaryComponent} from '../../../projects/notado-lib/src/lib/component/form/form-summary/form-summary.component';
import {FormThanksComponent} from '../../../projects/notado-lib/src/lib/component/form/form-thanks/form-thanks.component';
import {FormPaidThanksComponent} from '../../../projects/notado-lib/src/lib/component/form/form-paid-thanks/form-paid-thanks.component';
import {FormPaidErrorComponent} from '../../../projects/notado-lib/src/lib/component/form/form-paid-error/form-paid-error.component';
import {FormModuleComponent} from './root-component/from/form-module.component';
import {NotadoCommonModule} from './other-modules/notado-common.module';
import {
  FormBusinessBranchComponent
} from '../../../projects/notado-lib/src/lib/component/form/form-business-branch/form-business-branch.component';
import {
  CalendarAvailabilityComponent
} from '../../../projects/notado-lib/src/lib/component/calendar-availability/calendar-availability/calendar-availability.component';
import {SetAsOwnerComponent} from '../../../projects/notado-lib/src/lib/component/other/set-as-owner/set-as-owner.component';
import {
  ReservationToDateComponent
} from '../../../projects/notado-lib/src/lib/component/reservation-to/reservation-to-date/reservation-to-date.component';
import {
  ReservationToCourseComponent
} from '../../../projects/notado-lib/src/lib/component/reservation-to/reservation-to-course/reservation-to-course.component';
import {
  CalendarAvailabilityReadOnlyComponent
} from '../../../projects/notado-lib/src/lib/component/calendar-availability/calendar-availability-read-only/calendar-availability-read-only.component';
import {FormDurationComponent} from '../../../projects/notado-lib/src/lib/component/form/form-duration/form-duration.component';
import {NgxFileDropModule} from 'ngx-file-drop';
import {
  FormErrorUnknownComponent
} from '../../../projects/notado-lib/src/lib/component/form-error/form-error-unknown/form-error-unknown.component';
import {FormErrorComponent} from '../../../projects/notado-lib/src/lib/component/form-error/form-error/form-error.component';
import {SetBusinessForTestComponent} from '../../../projects/notado-lib/src/lib/component/for-test/set-business-for-test.component';
import {
  ReservationToServiceGroupComponent
} from '../../../projects/notado-lib/src/lib/component/reservation-to/reservation-to-service-group/reservation-to-service-group.component';

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
      component: FormModuleComponent,
      children: [
        {path: 'form-contact', component: FormContactComponent},
        {path: 'form-business-branch', component: FormBusinessBranchComponent},
        {path: 'form-service-group', component: FormServiceGroupComponent},
        {path: 'form-service', component: FormServiceComponent},
        {path: 'form-service-duration', component: FormDurationComponent},
        {path: 'form-date', component: FormDateComponent},
        {path: 'form-voucher', component: FormVoucherComponent},
        {path: 'form-custom', component: FormCustomComponent},
        {path: 'form-note', component: FormNoteComponent},
        {path: 'form-summary', component: FormSummaryComponent},
        {path: 'form-thanks', component: FormThanksComponent},
        {path: 'form-thanks-paid/:session_id', component: FormPaidThanksComponent},
        {path: 'form-paid-error/:session_id', component: FormPaidErrorComponent},
        {path: 'set-as-owner', component: SetAsOwnerComponent},
        {path: 'calendar-availability', component: CalendarAvailabilityComponent},
        {path: 'calendar-availability-read-only', component: CalendarAvailabilityReadOnlyComponent},
        {path: 'form-service-selected/:service', component: ReservationToServiceComponent},
        {path: 'form-service-selected/:service/:worker/:date', component: ReservationToServiceComponent},
        {path: 'form-service-group-selected/:service_group_id', component: ReservationToServiceGroupComponent},
        {path: 'form-date-selected/:date', component: ReservationToDateComponent},
        {path: 'form-course-selected/:service/:course/:remaining_capacity/:date', component: ReservationToCourseComponent},
        {path: 'form-error', component: FormErrorComponent},
        {path: 'form-error-unknown', component: FormErrorUnknownComponent},
        {path: 'set-test-business/:business_url/:redirect', component: SetBusinessForTestComponent},
      ]
    }
  ];

// !!! when adding new ulr add it into FormServiceAbstract.urlToValue

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes),
    NotadoCommonModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    NgxFileDropModule,
    FileUploadModule,
    // Set main theme
    // Add components
    CommonModule,
    HammerModule,
    //    NotadoLibModule.forRoot(environment.environment, FormMode.DEMO),
    // NotadoLibModule.forRoot(environment.environment, FormMode.PRODUCTION),
    NotadoLibModule.forRoot(environment.environment, FormMode.PRODUCTION),
    NgxStripeModule.forRoot(publicKey),
    FormModuleComponent],
  providers: [
    // secure module
    NgbModal,
    [
      {provide: NgbDatepickerI18n, useClass: CustomDatepickerCzTranslate}],
    {provide: LY_THEME, useClass: MinimaLight, multi: true}, // name: `minima-light`
    {provide: LY_THEME, useClass: MinimaDark, multi: true}, // name: `minima-dark`
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    provideHttpClient(withInterceptorsFromDi()),
  ]
})
export class FormModule {

}
