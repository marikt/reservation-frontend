import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {MetaService} from '../../../service/meta.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {NgForOf, NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {IntegrationType} from '../../../../../projects/notado-lib/src/lib/util/integration-type';
import {IntegrationData} from '../../../model/integration/integration-data';
import {IntegrationImgComponent} from '../integration/integration-img/integration-img.component';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {DragulaModule} from 'ng2-dragula';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {Service} from '../../../../../projects/notado-lib/src/lib/model/service';
import {ServiceType} from '../../../../../projects/notado-lib/src/lib/enum/service-type';
import {ServiceMax} from '../../../../../projects/notado-lib/src/lib/model/service-max';
import {DaysHoursMinutesPipe} from '../../../../../projects/notado-lib/src/lib/pipe/hours-minutes.pipe';
import {StripeCoupon} from '../../../../../projects/notado-lib/src/lib/model/stripe-coupon';
import {VideoGuideComponent} from '../../video-guide/video-guide.component';

@Component({
  selector: 'app-dashboard-coupon',
  templateUrl: './dashboard-coupon.component.html',
  styleUrls: ['./dashboard-coupon.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    TranslateModule,
    NgForOf,
    RouterLink,
    NgIf,
    NgbTooltip,
    IntegrationImgComponent,
    DragulaModule,
    DaysHoursMinutesPipe,
    VideoGuideComponent
  ],
  standalone: true
})
export class DashboardCouponComponent implements OnInit {
  public coupons: Service[];
  public integrationData: IntegrationData;
  public noStripeCoupons: boolean = false;

  constructor(
    public dashboardService: DashboardService,
    public http: HttpService,
    public router: Router,
    public alertService: AlertService,
    public metaService: MetaService,
    public server: Server,
    public modalService: ModalService,
    public preventDoubleClickService: PreventDoubleClickService,
    public translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.http.get(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id + '/' + IntegrationType.STRIPE,
      (integrationData: IntegrationData) => {
        this.integrationData = integrationData;

        this.http.get(Api.SERVICE + '/by-business/' + this.dashboardService.business.id, (services: Service[]) => {
          this.coupons = services.filter(service => service.type === ServiceType.COUPON);
        });
      });

    this.checkStripeCoupons();
  }

  private checkStripeCoupons() {
    this.http.get(Api.FORM_PAYMENT + '/' + this.dashboardService.business.id + '/coupon', (stripeCoupons: StripeCoupon[]) => {
      if (!stripeCoupons || stripeCoupons.length === 0) {
        this.noStripeCoupons = true;
        setTimeout(() => {
          this.checkStripeCoupons();
        }, 16_000)
      } else {
        this.noStripeCoupons = false;
      }
    });
  }

  public addCoupon(): void {
    const service: ServiceMax = new ServiceMax();
    service.type = ServiceType.COUPON;
    service.businessId = this.dashboardService.business.id;
    service.name = 'coupon';
    this.http.post(Api.SERVICE, service, (createdService) => {
      this.router.navigate(['/dashboard/dashboard-coupon-item', createdService.id]);
    })
  }

  public saveOrder() {
    this.preventDoubleClickService.preventFor();
    const couponsOrder: number[] = [];
    for (const coupon of this.coupons) {
      couponsOrder.push(coupon.id);
    }
    this.http.put(Api.SERVICE + '/order', couponsOrder, () => {
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
