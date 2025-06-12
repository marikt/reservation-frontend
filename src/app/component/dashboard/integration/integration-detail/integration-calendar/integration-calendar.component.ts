import {Component, Input} from '@angular/core';
import {ModalService} from '../../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {IntegrationData} from '../../../../../model/integration/integration-data';
import {Event} from '../../../../../../../projects/notado-lib/src/lib/util/event.enum';
import {BroadcastService} from '../../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {IntegrationCoreComponent} from '../integration-core/integration-core.component';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../../../service/dashboard.service';
import {IntegrationTemplateComponent} from '../integration-template/integration-template.component';
import {RouterLink} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-integration-calendar',
  templateUrl: './integration-calendar.component.html',
  styleUrls: ['./integration-calendar.component.scss'],
  imports: [
    IntegrationTemplateComponent,
    RouterLink,
    TranslateModule
  ],
  standalone: true
})
export class IntegrationCalendarComponent extends IntegrationCoreComponent {

  @Input('integrationData')
  public integrationData: IntegrationData = new IntegrationData();

  constructor(public modalService: ModalService,
              public http: HttpService,
              public dashboardService: DashboardService,
              public broadcastService: BroadcastService) {
    super(http, dashboardService, broadcastService);
  }

  ngOnInit(): void {
    this.subscribe(Event.GOOGLE_CALENDAR_SUCCESSFULLY_CONNECTED, () => {

    });
  }

}
