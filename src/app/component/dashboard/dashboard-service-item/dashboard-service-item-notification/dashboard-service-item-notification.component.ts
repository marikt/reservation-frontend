import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../service/dashboard.service';
import { AlertService } from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import { HttpService } from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import { Router, RouterLink } from '@angular/router';
import { ModalService } from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DashboardServiceItemCommonComponent } from '../dashboard-service-item-common.component';
import { BroadcastService } from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import { PreventDoubleClickService } from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import { FormsModule } from '@angular/forms';
import { VideoTutorialComponent } from '../../../video-tutorial/video-tutorial.component';
import { NgForOf, NgIf } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { KeywordHighlighterComponent } from '../../../util/keyword-highlighter/keyword-highlighter.component';
import { LineService } from '../../../../service/line.service';
import { ServiceService } from '../../../../service/service.service';

@Component({
  selector: 'app-dashboard-service-item-notification',
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
  templateUrl: './dashboard-service-item-notification.component.html',
  styleUrls: ['../dashboard-service-item.component.scss']
})
export class DashboardServiceItemNotificationComponent extends DashboardServiceItemCommonComponent implements OnInit {
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
    public lineService: LineService,
    public serviceService: ServiceService
  ) {
    super(
      dashboardService,
      alertService,
      broadcastService,
      http,
      router,
      modalService,
      translate,
      preventDoubleClickService,
      lineService,
      serviceService);
  }

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
    
    if (!this.service.notificationMsg) {
      this.service.notificationMsg = '';
    }
  }
}
