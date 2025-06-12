import {Injectable} from '@angular/core';
import {Api} from '../../../projects/notado-lib/src/lib/enum/api';
import {IntegrationType} from '../../../projects/notado-lib/src/lib/util/integration-type';
import {IntegrationData} from '../model/integration/integration-data';
import {DashboardService} from './dashboard.service';
import {HttpService} from '../../../projects/notado-lib/src/lib/service/http.service';
import {MySubscribable} from '../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../projects/notado-lib/src/lib/util/event.enum';
import {AlertService} from '../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {PreventDoubleClickService} from '../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {KeyguruIntegrationServiceConfig} from '../model/integration/keyguru-integration-service-config';
import {KeyguruIntegrationBusinessConfig} from '../model/integration/keyguru-integration-business-config';

@Injectable({
  providedIn: 'root'
})
export class KeyguruIntegrationService extends MySubscribable {
  public keyguruIntegrationBusinessConfig: KeyguruIntegrationBusinessConfig;
  public integrationData: IntegrationData;

  public constructor(private dashboardService: DashboardService,
                     private http: HttpService,
                     public broadcastService: BroadcastService,
                     private alertService: AlertService,
                     public translate: TranslateService,
                     public preventDoubleClickService: PreventDoubleClickService
  ) {
    super(broadcastService);
    this.subscribe(Event.INTEGRATION_UPDATE, (integrationData: IntegrationData) => {
      if (integrationData.type === IntegrationType.KEYGURU) {
        this.integrationData = integrationData;
      }
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
    this.http.get(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id + '/' + IntegrationType.KEYGURU,
      (integrationData: IntegrationData) => {
        this.integrationData = integrationData;
        if (!this.integrationData.config) {
          this.integrationData.config = new KeyguruIntegrationBusinessConfig();
        }
        this.keyguruIntegrationBusinessConfig = this.integrationData.config;
        if (callback) {
          callback();
        }
      });
  }

  public getKeyguruIntegrationBusinessConfig(serviceId: number): KeyguruIntegrationServiceConfig {
    if (!this.keyguruIntegrationBusinessConfig.keyguruServices) {
      this.keyguruIntegrationBusinessConfig.keyguruServices = [];
    }
    for (const keyguruService of this.keyguruIntegrationBusinessConfig.keyguruServices) {
      if (!keyguruService) {
        continue;
      }
      if (keyguruService.serviceId === serviceId) {
        return keyguruService;
      }
    }
    const newKeyguruService: KeyguruIntegrationServiceConfig = new KeyguruIntegrationServiceConfig();
    newKeyguruService.serviceId = serviceId;
    this.keyguruIntegrationBusinessConfig.keyguruServices.push(newKeyguruService);
    return newKeyguruService;
  }

  public saveKeyguruIntegration(): void {
    this.http.put(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id, this.integrationData,
      (integrationData) => {
        this.integrationData = integrationData;
        this.keyguruIntegrationBusinessConfig = this.integrationData.config;
        this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
      });
  }

  public isKeyguruConnectedAndValid(): boolean {
    if (!this.integrationData) {
      return false;
    }
    return this.integrationData.connected && this.integrationData.valid;
  }
}
