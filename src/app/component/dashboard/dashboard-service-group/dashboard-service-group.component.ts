import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {MetaService} from '../../../service/meta.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {ServiceGroupMax} from '../../../../../projects/notado-lib/src/lib/model/service-group-max';
import {ServiceGroup} from '../../../../../projects/notado-lib/src/lib/model/service-group';
import {NgForOf, NgIf} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DaysHoursMinutesPipe} from '../../../../../projects/notado-lib/src/lib/pipe/hours-minutes.pipe';
import {DragulaModule} from 'ng2-dragula';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';

@Component({
  selector: 'app-dashboard-service-group',
  templateUrl: './dashboard-service-group.component.html',
  styleUrls: ['./dashboard-service-group.component.scss'],
    imports: [
        NgForOf,
        RouterLink,
        NgIf,
        TranslateModule,
        NgbTooltip,
        FormsModule,
        DashboardCardComponent,
        DashboardCardLabelComponent,
        DaysHoursMinutesPipe,
        DragulaModule
    ],
  standalone: true
})
export class DashboardServiceGroupComponent implements OnInit {

    public serviceGroups: ServiceGroup[];

    constructor(
        public dashboardService: DashboardService,
        public http: HttpService,
        public router: Router,
        public alertService: AlertService,
        public metaService: MetaService,
        public preventDoubleClickService: PreventDoubleClickService,
        public server: Server,
        public modalService: ModalService,
        public translate: TranslateService,
    ) {
    }

    ngOnInit() {
        this.http.get(Api.SERVICE_GROUP + '/by-business/' + this.dashboardService.business.id,
            (serviceGroups: ServiceGroup[]) => {
                this.serviceGroups = serviceGroups;
            });
    }

    public addServiceGroup(): void {
        const serviceGroup: ServiceGroupMax = new ServiceGroupMax();
        serviceGroup.businessId = this.dashboardService.business.id;
        this.http.post(Api.SERVICE_GROUP, serviceGroup, (createdServiceGroup: ServiceGroup) => {
            this.router.navigate(['/dashboard/dashboard-service-group-item', createdServiceGroup.id]);
        })
    }

  public saveOrder() {
    this.preventDoubleClickService.preventFor();
    const servicesOrder: number[] = [];
    for (const serviceGroup of this.serviceGroups) {
      servicesOrder.push(serviceGroup.id);
    }
    this.http.put(Api.SERVICE_GROUP + '/order', servicesOrder, () => {
      this.modalService.close();
      this.dashboardService.loadBusiness();
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });
  }

}
