import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {WizardService} from '../../../service/wizard.service';
import {MetaService} from '../../../service/meta.service';
import {Service} from '../../../../../projects/notado-lib/src/lib/model/service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {BusinessWizardRootComponent} from '../business-wizard-root.component';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-business-wizard-service-name',
  templateUrl: './business-wizard-service-name.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    NgIf,
    FormsModule,
    TranslateModule
  ],
  standalone: true
})
export class BusinessWizardServiceNameComponent extends BusinessWizardRootComponent {

  constructor(
    public wizardService: WizardService,
    public route: ActivatedRoute,
    public http: HttpService,
    public router: Router,
    public metaService: MetaService,
    public alertService: AlertService,
    public broadcastService: BroadcastService) {
    super(alertService, broadcastService, http, route, router);
  }

  public ngOnInit() {
    super.ngOnInit();
    if (!this.wizardService.services[this.idx]) {
      this.initNewService();
    }
  }

  private initNewService() {
    const service: Service = new Service();
    service.businessId = this.wizardService.business.id;
    this.wizardService.services[this.idx] = service;
  }

  onSubmit() {
    const service: Service = this.wizardService.services[this.idx];
    if (service.id) {
      this.http.put(Api.SERVICE + '/' + service.id, service, () => {
        this.wizardService.next('business-wizard-service-duration/' + this.idx);
      });
    } else {
      this.http.post(Api.SERVICE, service, (createdService) => {
        this.wizardService.services[this.idx] = createdService;
        this.wizardService.next('business-wizard-service-duration/' + this.idx);
      });
    }
  }

  public goToWorkerName() {
    this.wizardService.next('business-wizard-worker-name/0');
  }
}
