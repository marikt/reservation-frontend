import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {ForHairdresserComponent} from '../component/intro/menu/for-hairdresser/for-hairdresser.component';
import {ForSalonComponent} from '../component/intro/menu/for-salon/for-salon.component';
import {ForYogaComponent} from '../component/intro/menu/for-yoga/for-yoga.component';
import {ForCourseComponent} from '../component/intro/menu/for-course/for-course.component';
import {ForDeviceComponent} from '../component/intro/menu/for-device/for-device.component';
import {ForDoctorComponent} from '../component/intro/menu/for-doctor/for-doctor.component';
import {ForCarRepairComponent} from '../component/intro/menu/for-car-repair/for-car-repair.component';
import {ForOtherServicesComponent} from '../component/intro/menu/for-other-services/for-other-services.component';
import {CommonModule} from '@angular/common';
import {ForAudienceModuleComponent} from './root-component/for-audience/for-audience-module.component';
import {NotadoCommonModule} from './other-modules/notado-common.module';

import {ForSportsGroundComponent} from '../component/intro/menu/for-sports-ground/for-sports-ground.component';
import {ForAudienceComponent} from '../component/intro/menu/for-audience/for-audience.component';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {Error404Component} from '../component/error/404/error404.component';
import {ForMassageComponent} from '../component/intro/menu/for-massage/for-massage.component';
import {ForBeautyComponent} from '../component/intro/menu/for-beauty/for-beauty.component';
import {ForEducationComponent} from '../component/intro/menu/for-education/for-education.component';
import {ForEventsComponent} from '../component/intro/menu/for-events/for-events.component';
import {ForHealthComponent} from '../component/intro/menu/for-health/for-health.component';
import {ForSportComponent} from '../component/intro/menu/for-sport/for-sport.component';
import {ForIndustryComponent} from '../component/intro/menu/for-industry/for-industry.component';


const routes: Routes =
  [{
    path: '',
    component: ForAudienceModuleComponent,
    children: [
      // menu
      {path: ':language/for-beauty', component: ForBeautyComponent},
      {path: ':language/for-education', component: ForEducationComponent},
      {path: ':language/for-events', component: ForEventsComponent},
      {path: ':language/for-health', component: ForHealthComponent},
      {path: ':language/for-sport', component: ForSportComponent},
      {path: ':language/for-hairdresser', component: ForHairdresserComponent},
      {path: ':language/for-salon', component: ForSalonComponent},
      {path: ':language/for-massage', component: ForMassageComponent},
      {path: ':language/for-yoga', component: ForYogaComponent},
      {path: ':language/for-course', component: ForCourseComponent},
      {path: ':language/for-device', component: ForDeviceComponent},
      {path: ':language/for-doctor', component: ForDoctorComponent},
      {path: ':language/for-car-repair', component: ForCarRepairComponent},
      {path: ':language/for-other-services', component: ForOtherServicesComponent},
      {path: ':language/for-sports-ground', component: ForSportsGroundComponent},

      {path: '**', component: Error404Component}
    ]
  }];


@NgModule({
    exports: [RouterModule], imports: [RouterModule.forChild(routes),
    NotadoCommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HammerModule,
    NgbModule, ForAudienceModuleComponent,
    ForAudienceComponent,
    ForIndustryComponent,
    ForBeautyComponent,
    ForEducationComponent,
    ForEventsComponent,
    ForHealthComponent,
    ForSportComponent,
    ForHairdresserComponent,
    ForMassageComponent,
    ForSalonComponent,
    ForDoctorComponent,
    ForYogaComponent,
    ForCarRepairComponent,
    ForCourseComponent,
    ForDeviceComponent,
    ForOtherServicesComponent,
    ForCourseComponent,
    ForYogaComponent,
    ForSportsGroundComponent,
    ForDeviceComponent], providers: [
        // secure module
        NgbModal,
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandlerService
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class ForAudienceModule {

}
