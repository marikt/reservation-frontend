import {Component, Input} from '@angular/core';
import {IntegrationCoreComponent} from '../integration-core/integration-core.component';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../../../service/dashboard.service';
import {ModalService} from '../../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {IntegrationData} from '../../../../../model/integration/integration-data';
import {BroadcastService} from '../../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {IntegrationTemplateComponent} from '../integration-template/integration-template.component';
import {FormsModule} from '@angular/forms';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-integration-twilio',
  templateUrl: './integration-twilio.component.html',
  styleUrls: ['./integration-twilio.component.scss'],
  imports: [
    IntegrationTemplateComponent,
    FormsModule,
    NgbTooltip,
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class IntegrationTwilioComponent extends IntegrationCoreComponent {

  @Input('integrationData') declare integrationData: IntegrationData;

  public showValidation: boolean = false;

  constructor(
    public modalService: ModalService,
    public http: HttpService,
    public dashboardService: DashboardService,
    public broadcastService: BroadcastService) {
    super(http, dashboardService, broadcastService);
  }

  ngOnInit(): void {
  }

}
