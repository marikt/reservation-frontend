import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {PublicApiComponent} from '../component/intro/public-api/public-api.component';
import {GoogleIntegrationComponent} from '../component/intro/google-integration/google-integration.component';
import {IntroGoogleContactsComponent} from '../component/intro/intro-google-contacts/intro-google-contacts.component';
import {PriceComparisonComponent} from '../component/intro/price-comparison/price-comparison.component';
import {ContactComponent} from '../component/intro/contact/contact.component';
import {OnlineReservationComponent} from '../component/intro/online-reservation/online-reservation.component';
import {PaymentWhileBookingComponent} from '../component/intro/payment-while-booking/payment-while-booking.component';
import {PriceMenuComponent} from '../component/intro/menu/price-menu/price-menu.component';
import {WhatWeKnowMenuComponent} from '../component/intro/menu/what-we-know-menu/what-we-know-menu.component';
import {ManagementOnGoogleComponent} from '../component/intro/management-on-google/management-on-google.component';
import {IntegrationDetailComponent} from '../component/intro/integration-detail/integration-detail.component';
import {BusinessWizardUrlComponent} from '../component/wizard/business-wizard-url/business-wizard-url.component';
import {BusinessWizardOpeningComponent} from '../component/wizard/business-wizard-opening/business-wizard-opening.component';
import {BusinessWizardServiceNameComponent} from '../component/wizard/business-wizard-service-name/business-wizard-service-name.component';
import {
  BusinessWizardServiceDurationComponent
} from '../component/wizard/business-wizard-service-duration/business-wizard-service-duration.component';
import {BusinessWizardServiceImgComponent} from '../component/wizard/business-wizard-service-img/business-wizard-service-img.component';
import {BusinessWizardFinComponent} from '../component/wizard/business-wizard-fin/business-wizard-fin.component';
import {CommonModule} from '@angular/common';
import {JoinComponent} from '../component/join/join.component';
import {AnimationImgComponent} from '../component/intro/intro-animation-img/animation-img/animation-img.component';
import {PrivacyPolicyComponent} from '../component/privacy-policy/privacy-policy.component';
import {BusinessWizardWorkerNameComponent} from '../component/wizard/business-wizard-worker-name/business-wizard-worker-name.component';
import {AutherrorComponent} from '../component/error/autherror/autherror.component';
import {GeneralErrorComponent} from '../component/error/general-error/general-error.component';
import {ReleaseNoteItemComponent} from '../component/intro/release-notes/release-note-item/release-note-item.component';
import {LicenceComponent} from '../component/licence/licence.component';
import {IntegrationItemComponent} from '../component/intro/integration-item/integration-item.component';
import {ReleaseNotesComponent} from '../component/intro/release-notes/release-notes.component';
import {MenuSimpleComponent} from '../component/menu-simple/menu-simple.component';
import {TrainingComponent} from '../component/intro/training/training.component';
import {ErrorComponent} from '../component/error/error.component';
import {
  AnimationReservationEventComponent
} from '../component/intro/intro-animation-img/animation-reservation-event/animation-reservation-event.component';
import {NotadoCommonModule} from './other-modules/notado-common.module';

import {NotificationComponent} from '../component/intro/notification/notification.component';
import {IntroModuleComponent} from './root-component/intro/intro-module.component';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {Error404Component} from '../component/error/404/error404.component';
import {WaysHowUseNotadoComponent} from '../component/intro/ways-how-use-notado/ways-how-use-notado.component';
import {FeaturesComponent} from '../component/intro/features/features.component';
import {CustomizableMsgComponent} from '../component/intro/customizable-msg/customizable-msg.component';
import {IntroCalendarAvailabilityComponent} from '../component/intro/intro-calendar-availability/intro-calendar-availability.component';
import {PriceItemComponent} from '../component/intro/menu/price-item/price-item.component';
import {SignupComponent} from '../component/signup/signup.component';


const routes: Routes =
  [{
    path: '',
    component: IntroModuleComponent,
    children: [

      {path: ':language/public-api', component: PublicApiComponent},
      {path: ':language/intro-google-integration', component: GoogleIntegrationComponent},
      {path: ':language/intro-google-contacts', component: IntroGoogleContactsComponent},
      {path: ':language/price-comparison', component: PriceComparisonComponent},
      {path: ':language/contact', component: ContactComponent},
      {path: ':language/online-reservation', component: OnlineReservationComponent},
      {path: ':language/payment-while-booking', component: PaymentWhileBookingComponent},
      {path: ':language/features', component: FeaturesComponent},
      {path: ':language/calendar-availability', component: IntroCalendarAvailabilityComponent},
      {path: ':language/customizable-msg', component: CustomizableMsgComponent},

      {path: ':language/price-menu', component: PriceMenuComponent},

      {path: ':language/what-we-know-menu', component: WhatWeKnowMenuComponent},
      {path: ':language/notification', component: NotificationComponent},
      {path: ':language/way-how-to-use', component: WaysHowUseNotadoComponent},
      {path: ':language/management-on-google', component: ManagementOnGoogleComponent},
      {path: ':language/integration', component: IntegrationDetailComponent},

      // business wizard
      {path: ':language/business-wizard-url', component: BusinessWizardUrlComponent},
      {path: ':language/business-wizard-opening', component: BusinessWizardOpeningComponent},

      {path: ':language/business-wizard-service-name/:idx', component: BusinessWizardServiceNameComponent},
      {path: ':language/business-wizard-service-duration/:idx', component: BusinessWizardServiceDurationComponent},
      {path: ':language/business-wizard-service-img/:idx', component: BusinessWizardServiceImgComponent},

      {path: ':language/business-wizard-worker-name/:idx', component: BusinessWizardWorkerNameComponent},
      {path: ':language/business-wizard-join', component: BusinessWizardFinComponent},

      {path: ':language/signup', component: SignupComponent},
      {path: ':language/join', component: JoinComponent},
      {path: ':language/join/:email/:password', component: JoinComponent},
      {path: ':language/licence', component: LicenceComponent},
      {path: ':language/privacy-policy', component: PrivacyPolicyComponent},


      {path: 'autherror', component: AutherrorComponent},
      {path: 'error', component: ErrorComponent},
      {path: 'general-error', component: GeneralErrorComponent},
      {path: 'release-notes', component: ReleaseNotesComponent},

      {
        path: '**', component: Error404Component
      },

    ]
  }];


@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild(routes),
    NotadoCommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HammerModule,
    NgbModule, IntroModuleComponent,
    JoinComponent,
    SignupComponent,
    ErrorComponent,
    LicenceComponent,
    AutherrorComponent,
    GeneralErrorComponent,
    PrivacyPolicyComponent,
    GoogleIntegrationComponent,
    PriceComparisonComponent,
    ReleaseNotesComponent,
    TrainingComponent,
    CustomizableMsgComponent,
    WhatWeKnowMenuComponent,
    PriceMenuComponent,
    PriceItemComponent,
    ManagementOnGoogleComponent,
    OnlineReservationComponent,
    MenuSimpleComponent,
    IntroGoogleContactsComponent,
    WaysHowUseNotadoComponent,
    ReleaseNoteItemComponent,
    PaymentWhileBookingComponent,
    PublicApiComponent,
    AnimationImgComponent,
    AnimationReservationEventComponent,
    IntegrationDetailComponent,
    IntegrationItemComponent,
    NotificationComponent,
    IntroCalendarAvailabilityComponent],
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
export class IntroModule {

}
