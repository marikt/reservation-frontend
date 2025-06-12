import {ErrorHandler, NgModule} from '@angular/core';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NotadoCommonModule} from './other-modules/notado-common.module';
import {ReservationCancelComponent} from '../component/reservation/reservation-cancel/reservation-cancel.component';
import {ReservationModuleComponent} from './root-component/reservation/reservation-module.component';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {HammerModule} from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {ClearCacheExternalPageComponent} from '../component/reservation/clear-cache-external-page/clear-cache-external-page.component';
import {ReservationConfirmComponent} from '../component/reservation/reservation-confirm/reservation-confirm.component';


const routes: Routes =
  [{
    path: '',
    component: ReservationModuleComponent,
    children: [
      {path: 'cancel/:reservation_data', component: ReservationCancelComponent},
      {path: 'cancel/:language/:reservation_data', component: ReservationCancelComponent},
      {path: 'confirm/:reservation_data', component: ReservationConfirmComponent},
      {path: 'confirm/:language/:reservation_data', component: ReservationConfirmComponent},
      {path: 'refresh-cache/:business-id', component: ClearCacheExternalPageComponent}
    ]
  }];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes),
    NotadoCommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HammerModule,
    NgbModule, ReservationModuleComponent,
    ReservationCancelComponent,
    ReservationConfirmComponent,
    ClearCacheExternalPageComponent],
  providers: [
    NgbModal,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class ReservationModule {

}
