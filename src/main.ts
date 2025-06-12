import './polyfills';
import 'rxjs';
import 'hammerjs';
import {enableProdMode, importProvidersFrom} from '@angular/core';

import {createTranslateLoader} from './app/app.module';
import {environment} from './app/environments/environment';
import {Env} from '../projects/notado-lib/src/lib/enum/env';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {bootstrapApplication, BrowserModule, HammerModule, provideProtractorTestingSupport} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideAnimations} from '@angular/platform-browser/animations';
import {NotadoCommonModule} from './app/zzzmodules/other-modules/notado-common.module';
import {CommonModule} from '@angular/common';
import {NotadoLibModule} from '../projects/notado-lib/src/lib/notado-lib.module';
import {FormMode} from '../projects/notado-lib/src/lib/util/form-mode.enum';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BelowHomeModule} from './app/zzzmodules/below-home.module';
import {AppComponent} from './app/app.component';
import {AppRoutingModule} from './app/app-routing.module';
import {provideNgxStripe} from 'ngx-stripe';
import {provideEnvironmentNgxMask} from 'ngx-mask';

if (environment.environment === Env.PRODUCTION) {
  enableProdMode();
}


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AppRoutingModule,
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      NotadoCommonModule,
      CommonModule,
      HammerModule,
      NotadoLibModule.forRoot(environment.environment, FormMode.DEMO),
      TranslateModule.forRoot({
        defaultLanguage: 'cs',
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
      NotadoCommonModule.forRoot(),
      BelowHomeModule),
    NgbModal,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideProtractorTestingSupport(),
    provideNgxStripe(),
    provideEnvironmentNgxMask()
  ]
})
  .catch(err => console.log(err));
