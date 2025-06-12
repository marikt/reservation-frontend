import {Injectable} from '@angular/core';
import {StripeIntegrationBusinessConfig} from '../model/integration/stripe-integration-business-config';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {IntegrationType} from '../../../projects/notado-lib/src/lib/util/integration-type';
import {IntegrationData} from '../model/integration/integration-data';
import {StripeIntegrationServiceConfig} from '../model/integration/stripe-integration-service-config';
import {DashboardService} from './dashboard.service';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';
import {AlertService} from '../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {PreventDoubleClickService} from '../../../projects/notado-lib/src/lib/service/prevent-double-click.service';

@Injectable({
  providedIn: 'root'
})
export class StripeIntegrationService extends MySubscribable {
  public stripeIntegrationBusinessConfig: StripeIntegrationBusinessConfig;
  public integrationData: IntegrationData;

  public constructor(private dashboardService: DashboardService,
                     private http: HttpService,
                     public broadcastService: BroadcastService,
                     private alertService: AlertService,
                     public translate: TranslateService,
                     public preventDoubleClickService: PreventDoubleClickService
  ) {
    super(broadcastService);
    this.subscribe(Event.BUSINESS_OR_TEMPLATE_CHANGED, () => {
      this.integrationData = null;
    });
  }

  public init(callback?: () => void): void {

    if (this.integrationData) {
      callback();
      return;
    }
    this.loadIntegrationConfig(callback);
  }

  public loadIntegrationConfig(callback?: () => void) {
    this.http.get(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id + '/' + IntegrationType.STRIPE,
      (integrationData: IntegrationData) => {
        this.integrationData = integrationData;
        if (!this.integrationData.config) {
          this.integrationData.config = new StripeIntegrationBusinessConfig();
        }
        this.stripeIntegrationBusinessConfig = this.integrationData.config;
        if (callback) {
          callback();
        }
      });
  }

  public getStripeIntegrationBusinessConfig(serviceId: number): StripeIntegrationServiceConfig {
    if (!this.stripeIntegrationBusinessConfig.stripeServices) {
      this.stripeIntegrationBusinessConfig.stripeServices = [];
    }
    for (const stripeService of this.stripeIntegrationBusinessConfig.stripeServices) {
      if (!stripeService) {
        continue;
      }
      if (stripeService.serviceId === serviceId) {
        return stripeService;
      }
    }
    const newStripeService: StripeIntegrationServiceConfig = new StripeIntegrationServiceConfig();
    newStripeService.serviceId = serviceId;
    this.stripeIntegrationBusinessConfig.stripeServices.push(newStripeService);
    return newStripeService;
  }

  public saveStripeIntegration(): void {
    this.http.put(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id, this.integrationData,
      (integrationData) => {
        this.integrationData = integrationData;
        this.stripeIntegrationBusinessConfig = this.integrationData.config;
        this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
      });
  }

}
