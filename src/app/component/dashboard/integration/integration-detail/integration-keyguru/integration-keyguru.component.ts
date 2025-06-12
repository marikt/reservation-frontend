import {Component, Input} from '@angular/core';
import {IntegrationCoreComponent} from '../integration-core/integration-core.component';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../../../service/dashboard.service';
import {ModalService} from '../../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {IntegrationData} from '../../../../../model/integration/integration-data';
import {BroadcastService} from '../../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {IntegrationTemplateComponent} from '../integration-template/integration-template.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-integration-keyguru',
  templateUrl: './integration-keyguru.component.html',
  styleUrls: ['./integration-keyguru.component.scss'],
  imports: [
    IntegrationTemplateComponent,
    FormsModule,
    TranslateModule,
    NgbTooltip,
    NgIf
  ],
  standalone: true
})
export class IntegrationKeyguruComponent extends IntegrationCoreComponent {

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
