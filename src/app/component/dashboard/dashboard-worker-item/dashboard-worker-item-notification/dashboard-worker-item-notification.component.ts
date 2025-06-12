import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { VideoTutorialComponent } from '../../../video-tutorial/video-tutorial.component';
import { KeywordHighlighterComponent } from '../../../util/keyword-highlighter/keyword-highlighter.component';
import { Worker } from '../../../../../../projects/notado-lib/src/lib/model/worker';
import { DashboardService } from '../../../../service/dashboard.service';
import { AlertService } from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import { BroadcastService } from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import { HttpService } from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import { PreventDoubleClickService } from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import { Api } from '../../../../../../projects/notado-lib/src/lib/enum/api';
import { LineService } from '../../../../service/line.service';
import { WorkerService } from '../../../../service/worker.service';

@Component({
  selector: 'app-dashboard-worker-item-notification',
  standalone: true,
  imports: [
    FormsModule,
    TranslateModule,
    VideoTutorialComponent,
    NgIf,
    NgbTooltip,
    NgForOf,
    KeywordHighlighterComponent,
    RouterLink
  ],
  templateUrl: './dashboard-worker-item-notification.component.html',
  styleUrls: ['../dashboard-worker-item.component.scss']
})
export class DashboardWorkerItemNotificationComponent implements OnInit {
  @Input() worker: Worker;
  
  private tagsTemplate: string[] = [];

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public modalService: ModalService,
    public translate: TranslateService,
    public preventDoubleClickService: PreventDoubleClickService,
    private lineService: LineService,
    public workerService: WorkerService
  ) {}

  ngOnInit() {
    this.tagsTemplate.push('#služba');
    this.tagsTemplate.push('#zaměstnanec');
    this.tagsTemplate.push('#email-zaměstnance');
    this.tagsTemplate.push('#telefon-zaměstnance');
    this.tagsTemplate.push('#datum-rezervace');
    this.tagsTemplate.push('#čas-rezervace');
    this.tagsTemplate.push('#cena');
    this.tagsTemplate.push('#link-zrušení-rezervace');

    this.tagsTemplate.push('#service');
    this.tagsTemplate.push('#employee');
    this.tagsTemplate.push('#employee-email');
    this.tagsTemplate.push('#employee-phone');
    this.tagsTemplate.push('#date');
    this.tagsTemplate.push('#time');
    this.tagsTemplate.push('#price');
    this.tagsTemplate.push('#business');
    this.tagsTemplate.push('#reservation-cancel');
    this.tagsTemplate.push('#zoom');
    
    if (!this.worker.notificationMsg) {
      this.worker.notificationMsg = '';
    }
  }

  public saveWorker() {
    this.preventDoubleClickService.preventFor();
    this.lineService.clean();
    
    this.http.put(Api.WORKER + '/' + this.worker.id, this.worker,
      () => {
        this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
      }, (error) => {
        console.log(error);
      }
    );
  }
}
