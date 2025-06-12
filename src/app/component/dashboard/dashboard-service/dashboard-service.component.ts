import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {Router, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {MetaService} from '../../../service/meta.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {Service} from '../../../../../projects/notado-lib/src/lib/model/service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgForOf, NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {DaysHoursMinutesPipe} from '../../../../../projects/notado-lib/src/lib/pipe/hours-minutes.pipe';
import {DragulaModule} from 'ng2-dragula';
import {ServiceService} from '../../../service/service.service';
import {ServiceType} from '../../../../../projects/notado-lib/src/lib/enum/service-type';

@Component({
  selector: 'app-dashboard-service',
  templateUrl: './dashboard-service.component.html',
  styleUrls: ['./dashboard-service.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule,
    NgForOf,
    RouterLink,
    NgIf,
    NgbTooltip,
    DaysHoursMinutesPipe,
    DragulaModule
  ],
  standalone: true
})
export class DashboardServiceComponent implements OnInit {

  public services: Service[];

  constructor(
    public dashboardService: DashboardService,
    public http: HttpService,
    public router: Router,
    public alertService: AlertService,
    public metaService: MetaService,
    public modalService: ModalService,
    public server: Server,
    public translate: TranslateService,
    public preventDoubleClickService: PreventDoubleClickService,
    public serviceService: ServiceService

  ) {

  }

  ngOnInit() {
    this.http.get(Api.SERVICE + '/by-business/' + this.dashboardService.business.id, (services: Service[]) => {
      this.services = services.filter(s => s.type !== ServiceType.COUPON);
    });
  }

  public saveOrder() {
    this.preventDoubleClickService.preventFor();
    const servicesOrder: number[] = [];
    for (const service of this.services) {
      servicesOrder.push(service.id);
    }
    this.http.put(Api.SERVICE + '/order', servicesOrder, () => {
      this.modalService.close();
      this.dashboardService.loadBusiness();
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });
  }

  public handleImageNotLoaded(service: Service) {
    console.error('handleImageNotLoaded()');
    service.fullPathImg = null;
  }

}
