import {Component} from '@angular/core';
import {WizardService} from '../../../service/wizard.service';
import {MetaService} from '../../../service/meta.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {BusinessWizardRootComponent} from '../business-wizard-root.component';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {LocalStorageService} from '../../../../../projects/notado-lib/src/lib/service/local-storage.service';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {StringUtil} from '../../../../../projects/notado-lib/src/lib/util/string-util';

@Component({
  selector: 'app-business-wizard-url',
  templateUrl: './business-wizard-url.component.html',
  styleUrls: ['../business-wizard-root.component.scss', './business-wizard-url.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    NgIf,
    FormsModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true
})
export class BusinessWizardUrlComponent extends BusinessWizardRootComponent {
  public urlAlreadyExists: boolean = false;

  constructor(
    public wizardService: WizardService,
    public metaService: MetaService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public route: ActivatedRoute,
    public localStorage: LocalStorageService,
    public alertService: AlertService) {
    super(alertService, broadcastService, http, route, router);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public onSubmit() {
    this.wizardService.business.url = StringUtil.cleanupUrl(this.wizardService.business.url);
    this.http.put(Api.BUSINESS + '/' + this.wizardService.business.id, this.wizardService.business);
    this.wizardService.next('business-wizard-opening');
  }
}
