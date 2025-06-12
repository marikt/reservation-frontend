import {Injectable} from '@angular/core';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {WorkerMax} from '../../../projects/notado-lib/src/lib/model/worker-max';
import {LineService} from './line.service';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../projects/notado-lib/src/lib/service/alert.service';
import {Worker} from '../../../projects/notado-lib/src/lib/model/worker';
import {TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../projects/notado-lib/src/lib/service/modal.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private lineService: LineService,
              private dashboardService: DashboardService,
              public router: Router,
              public http: HttpService,
              public alertService: AlertService,
              public translate: TranslateService,
              public modalService: ModalService,
  ) {
  }

  public addWorker() {
    const worker: WorkerMax = new WorkerMax();
    worker.businessId = this.dashboardService.business.id;
    this.http.post(Api.WORKER, worker, (createdWorker: WorkerMax) => {
        this.router.navigate(['/dashboard/dashboard-worker-item', createdWorker.id]);
        this.lineService.clean();
      }
    );
  }

  public deleteWorker(worker: Worker): void {
    this.http.delete(Api.WORKER + '/' + this.dashboardService.business.id + '/' + worker.id, () => {
      this.modalService.close();
      this.alertService.addInfo(this.translate.instant('ALERT.WORKER_DELETED'));
      this.router.navigate(['/dashboard/dashboard-landing']);
      this.lineService.clean();
    });
  }

}
