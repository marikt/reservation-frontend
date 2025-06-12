import {Component, Input} from '@angular/core';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../../../projects/notado-lib/src/lib/enum/api';
import {DashboardService} from '../../../../../service/dashboard.service';
import {IntegrationData} from '../../../../../model/integration/integration-data';
import {MySubscribable} from '../../../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../../../../../projects/notado-lib/src/lib/util/event.enum';

@Component({
  selector: 'app-integration-core',
  templateUrl: './integration-core.component.html',
  standalone: true,
  styleUrls: ['./integration-core.component.scss']
})
export class IntegrationCoreComponent extends MySubscribable {

  @Input('integrationData')
  public integrationData: IntegrationData = new IntegrationData();

  constructor(
    public http: HttpService,
    public dashboardService: DashboardService,
    public broadcastService: BroadcastService) {
    super(broadcastService);
  }

  public connect(callback?: () => void) {
    this.integrationData.connected = true;
    this.updateConfiguration(callback);
  }

  public disconnect() {
    this.integrationData.connected = false;
    this.updateConfiguration();
  }

  private updateConfiguration(callback?: () => void) {
    this.http.put(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id,
      this.integrationData,
      (data: IntegrationData) => {
        this.integrationData.config = data.config;
        this.integrationData.valid = data.valid;
        this.integrationData.connected = data.connected;
        this.fire(Event.INTEGRATION_UPDATE, data);
        callback();
      });
  }

}
