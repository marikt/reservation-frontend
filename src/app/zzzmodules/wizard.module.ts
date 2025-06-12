import {ErrorHandler, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HammerModule} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NgxFileDropModule} from 'ngx-file-drop';

import {RouterModule, Routes} from '@angular/router';
import {BusinessWizardUrlComponent} from '../component/wizard/business-wizard-url/business-wizard-url.component';
import {BusinessWizardWorkerNameComponent} from '../component/wizard/business-wizard-worker-name/business-wizard-worker-name.component';
import {CommonModule} from '@angular/common';
import {FileUploadModule} from 'ng2-file-upload';
import {MinimaDark, MinimaLight} from '@alyle/ui/themes/minima';
import {
  BusinessWizardServiceDurationComponent
} from '../component/wizard/business-wizard-service-duration/business-wizard-service-duration.component';
import {BusinessWizardServiceImgComponent} from '../component/wizard/business-wizard-service-img/business-wizard-service-img.component';
import {BusinessWizardFinComponent} from '../component/wizard/business-wizard-fin/business-wizard-fin.component';
import {OpeningItemWizardComponent} from '../component/util/opening-item-wizard/opening-item-wizard.component';
import {BusinessWizardLeftComponent} from '../component/wizard/business-wizard-left/business-wizard-left.component';
import {LY_THEME} from '@alyle/ui';
import {BusinessWizardOpeningComponent} from '../component/wizard/business-wizard-opening/business-wizard-opening.component';
import {GlobalErrorHandlerService} from '../service/global-error-handler.service';
import {BusinessWizardServiceNameComponent} from '../component/wizard/business-wizard-service-name/business-wizard-service-name.component';
import {WizardModuleComponent} from './root-component/wizard/wizard-module.component';
import {NotadoCommonModule} from './other-modules/notado-common.module';
import {
  BusinessWizardGoogleConnectComponent
} from '../component/wizard/business-wizard-google-connect/business-wizard-google-connect.component';
import {BusinessWizardStartComponent} from '../component/wizard/business-wizard-start/business-wizard-start.component';


const routes: Routes =
  [
    {
      path: '',
      component: WizardModuleComponent,
      children: [
        {path: 'business-wizard-url', component: BusinessWizardUrlComponent},
        {path: 'business-wizard-opening', component: BusinessWizardOpeningComponent},
        {path: 'business-wizard-service-name/:idx', component: BusinessWizardServiceNameComponent},
        {path: 'business-wizard-service-duration/:idx', component: BusinessWizardServiceDurationComponent},
        {path: 'business-wizard-service-img/:idx', component: BusinessWizardServiceImgComponent},
        {path: 'business-wizard-worker-name/:idx', component: BusinessWizardWorkerNameComponent},
        {path: 'business-wizard-fin', component: BusinessWizardFinComponent},
        {path: 'business-wizard-start', component: BusinessWizardStartComponent},
        {path: 'business-wizard-google-connect', component: BusinessWizardGoogleConnectComponent}
      ]
    },
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    NotadoCommonModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    FileUploadModule,
    // Set main theme
    // Add components
    CommonModule,
    HammerModule, WizardModuleComponent,
    OpeningItemWizardComponent,
    BusinessWizardUrlComponent,
    BusinessWizardOpeningComponent,
    BusinessWizardServiceNameComponent,
    BusinessWizardServiceDurationComponent,
    BusinessWizardServiceImgComponent,
    BusinessWizardWorkerNameComponent,
    BusinessWizardLeftComponent,
    BusinessWizardFinComponent,
    BusinessWizardStartComponent,
    BusinessWizardGoogleConnectComponent],
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
export class WizardModule {

}
