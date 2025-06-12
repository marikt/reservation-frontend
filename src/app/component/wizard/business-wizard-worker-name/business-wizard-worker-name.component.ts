import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {WizardService} from '../../../service/wizard.service';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {MetaService} from '../../../service/meta.service';
import {Worker} from '../../../../../projects/notado-lib/src/lib/model/worker';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {BusinessWizardRootComponent} from '../business-wizard-root.component';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BusinessWizardLeftComponent} from '../business-wizard-left/business-wizard-left.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-business-wizard-worker-name',
  templateUrl: './business-wizard-worker-name.component.html',
  styleUrls: ['../business-wizard-root.component.scss'],
  imports: [
    BusinessWizardLeftComponent,
    FormsModule,
    TranslateModule,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class BusinessWizardWorkerNameComponent extends BusinessWizardRootComponent {

  constructor(
    public wizardService: WizardService,
    public route: ActivatedRoute,
    public alertService: AlertService,
    public http: HttpService,
    public userService: UserService,
    public router: Router,
    public broadcastService: BroadcastService) {
    super(alertService, broadcastService, http, route, router);
  }

  public ngOnInit() {
    super.ngOnInit();
    if (!this.wizardService.workers[this.idx]) {
      this.initNewWorker();
    }
  }

  public onSubmit() {
    const worker: Worker = this.wizardService.workers[this.idx];
    if (worker.id) {
      this.http.put(Api.WORKER + '/' + worker.id, worker);
      this.afterProcessUpdate(worker);
    } else {
      this.http.post(Api.WORKER, worker, (createdWorker) => {
        this.wizardService.workers[this.idx] = createdWorker;
        this.afterProcessUpdate(createdWorker);
      });
    }
  }

  private initNewWorker() {
    const worker: Worker = new Worker();
    worker.businessId = this.wizardService.business.id;
    this.wizardService.workers[this.idx] = worker;
  }

  private afterProcessUpdate(createdWorker: Worker) {
    const serviceIds: number[] = [];
    this.wizardService.services.forEach(s => {
      if (s.id) {
        serviceIds.push(s.id);
      }
    });
    this.http.put(Api.RELATION + '/' + createdWorker.id + '/service-relations-for-worker', serviceIds);
    this.wizardService.next('business-wizard-worker-name/' + this.getNextIndex());
    this.ngOnInit();
  }

}
