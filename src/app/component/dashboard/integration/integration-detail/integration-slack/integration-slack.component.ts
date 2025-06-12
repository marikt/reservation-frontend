import {Component, Input} from '@angular/core';
import {IntegrationCoreComponent} from '../integration-core/integration-core.component';
import {IntegrationData} from '../../../../../model/integration/integration-data';
import {ModalService} from '../../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../../../service/dashboard.service';
import {BroadcastService} from '../../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {IntegrationTemplateComponent} from '../integration-template/integration-template.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-integration-slack',
  templateUrl: './integration-slack.component.html',
  styleUrls: ['./integration-slack.component.scss'],
  imports: [
    IntegrationTemplateComponent,
    FormsModule,
    TranslateModule,
    NgIf,
    NgbTooltip
  ],
  standalone: true
})
export class IntegrationSlackComponent extends IntegrationCoreComponent {

  @Input('integrationData')
  public integrationData: IntegrationData = new IntegrationData();

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
