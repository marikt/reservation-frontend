import {ErrorHandler, NgModule} from '@angular/core';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NotadoCommonModule} from './other-modules/notado-common.module';
import {ReservationModuleComponent} from './root-component/reservation/reservation-module.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {HammerModule} from '@angular/platform-browser';

import {ReactiveFormsModule} from '@angular/forms';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {PaymentSuccessComponent} from '../component/payment/payment-success/payment-success.component';


const routes: Routes =
  [{
    path: '',
    component: ReservationModuleComponent,
    children: [
      /**
       * DO NOT CHANGE !!!
       * Any changes needs to be updated in backend: PaymentService.createPaymentSession.builder.setSuccessUrl
       */
      {
        path: 'payment-success/:session_id', component: PaymentSuccessComponent
      }

    ]
  }];


@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes),
    NotadoCommonModule,
    ReactiveFormsModule,
    CommonModule,
    HammerModule,
    NgbModule, PaymentSuccessComponent],
  providers: [
    NgbModal,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class PaymentModule {

}
