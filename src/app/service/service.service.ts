import {Injectable} from '@angular/core';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {ServiceMax} from '../../../projects/notado-lib/src/lib/model/service-max';
import {LineService} from './line.service';
import {DashboardService} from './dashboard.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {ModalService} from '../../../projects/notado-lib/src/lib/service/modal.service';
import {Service} from '../../../projects/notado-lib/src/lib/model/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private lineService: LineService,
              private dashboardService: DashboardService,
              public router: Router,
              public http: HttpService,
              public alertService: AlertService,
              public translate: TranslateService,
              public modalService: ModalService) {
  }

  public addService(): void {
    const service: ServiceMax = new ServiceMax();
    service.businessId = this.dashboardService.business.id;
    this.http.post(Api.SERVICE, service, (createdService) => {
      this.router.navigate(['/dashboard/dashboard-service-item', createdService.id]);
      this.lineService.clean();
    })
  }

  public deleteService(service: Service): void {
    this.http.delete(Api.SERVICE + '/' + service.id, () => {
      this.modalService.close();
      this.alertService.addInfo(this.translate.instant('ALERT.SERVICE_DELETED'));
      this.router.navigate(['/dashboard/dashboard-landing']);
      this.lineService.clean();
    });
  }

}
