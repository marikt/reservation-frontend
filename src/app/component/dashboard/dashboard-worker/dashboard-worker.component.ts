import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {MetaService} from '../../../service/meta.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {Worker} from '../../../../../projects/notado-lib/src/lib/model/worker';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgForOf, NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {DragulaModule} from 'ng2-dragula';
import {WorkerService} from '../../../service/worker.service';

@Component({
  selector: 'app-dashboard-worker',
  templateUrl: './dashboard-worker.component.html',
  styleUrls: ['./dashboard-worker.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule,
    RouterLink,
    NgForOf,
    NgIf,
    NgbTooltip,
    DragulaModule
  ],
  standalone: true
})
export class DashboardWorkerComponent implements OnInit {
  public workers: Worker[];

  constructor(
    public dashboardService: DashboardService,
    public http: HttpService,
    public router: Router,
    public alertService: AlertService,
    public metaService: MetaService,
    public server: Server,
    public modalService: ModalService,
    public translate: TranslateService,
    public preventDoubleClickService: PreventDoubleClickService,
    public workerService: WorkerService
  ) {
  }

  ngOnInit() {
    this.http.get(Api.WORKER + '/by-business/' + this.dashboardService.business.id, (workers: Worker[]) => {
      this.workers = workers;
    });
  }

  public saveOrder() {
    this.preventDoubleClickService.preventFor();
    const workersOrder: number[] = [];
    for (const worker of this.workers) {
      workersOrder.push(worker.id);
    }
    this.http.put(Api.WORKER + '/order', workersOrder, () => {
      this.modalService.close();
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });
  }

  public handleImageNotLoaded(worker: Worker) {
    console.error('handleImageNotLoaded()');
    worker.fullPathImg = null;
  }

}
