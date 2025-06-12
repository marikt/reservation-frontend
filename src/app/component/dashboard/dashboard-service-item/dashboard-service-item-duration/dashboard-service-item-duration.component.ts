import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router} from '@angular/router';
import {TypeaheadService} from '../../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {ResizeImageService} from '../../../../service/resize-image.service';
import {Server} from '../../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Duration} from '../../../../../../projects/notado-lib/src/lib/model/duration';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {DashboardServiceItemCommonComponent} from '../dashboard-service-item-common.component';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {LineService} from '../../../../service/line.service';
import {ServiceService} from '../../../../service/service.service';

@Component({
  selector: 'app-dashboard-service-item-duration',
  templateUrl: './dashboard-service-item-duration.component.html',
  styleUrls: ['../dashboard-service-item.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class DashboardServiceItemDurationComponent extends DashboardServiceItemCommonComponent implements OnInit {

  public durationInDays: boolean = false;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public typeaheadService: TypeaheadService,
    public modalService: ModalService,
    public resizeImageService: ResizeImageService,
    public server: Server,
    public translate: TranslateService,
    public languageService: LanguageService,
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
    if (this.service.durationMin == null) {
      this.service.durationMin = new Duration(0, 1, 0);
    }
    if (this.service.durationMax == null) {
      this.service.durationMax = new Duration(0, 5, 0);
    }

    if (this.service.durationNotSpecified) {
      this.durationInDays = this.service.durationMin.days > 0;
    } else {
      this.durationInDays = this.service.duration && (this.service.duration.days > 0);
    }
  }

  public deleteUnusedDurationParts() {
    if (this.durationInDays) {
      this.service.duration.days = 0;
      this.service.durationMin.days = 0;
      this.service.durationMax.days = 0;
    } else {
      this.service.duration.hours = 0;
      this.service.duration.minutes = 0;

      this.service.durationMin.hours = 0;
      this.service.durationMin.minutes = 0;

      this.service.durationMax.hours = 0;
      this.service.durationMax.minutes = 0;
    }
  }
}
