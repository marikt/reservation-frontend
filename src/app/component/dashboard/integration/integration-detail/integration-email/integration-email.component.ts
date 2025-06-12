import {Component, Input} from '@angular/core';
import {IntegrationCoreComponent} from '../integration-core/integration-core.component';
import {IntegrationData} from '../../../../../model/integration/integration-data';
import {ModalService} from '../../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../../../service/dashboard.service';
import {BroadcastService} from '../../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Api} from '../../../../../../../projects/notado-lib/src/lib/enum/api';
import {AlertService} from '../../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {LanguageService} from '../../../../../../../projects/notado-lib/src/lib/service/language.service';
import {IntegrationTemplateComponent} from '../integration-template/integration-template.component';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-integration-email',
  templateUrl: './integration-email.component.html',
  styleUrls: ['./integration-email.component.scss'],
  imports: [
    IntegrationTemplateComponent,
    FormsModule,
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class IntegrationEmailComponent extends IntegrationCoreComponent {

  @Input('integrationData')
  public integrationData: IntegrationData = new IntegrationData();

  public showValidation: boolean = false;
  public showTestSuccess: boolean = false;
  public showTestFail: boolean = false;

  constructor(
    public modalService: ModalService,
    public languageService: LanguageService,
    public http: HttpService,
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService) {
    super(http, dashboardService, broadcastService);

  }

  ngOnInit(): void {
  }

  public testConnection(): void {
    this.showTestSuccess = false;
    this.showTestFail = false;
    this.connect(() => {
      this.http.get(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id + '/test-email-integration',
        () => {
          this.showTestSuccess = true;
          setTimeout(() => {
            this.showTestSuccess = false;
          }, 60000);
        },
        () => {
          this.showTestFail = true;
          setTimeout(() => {
            this.showTestFail = false;
          }, 60000);
        }
      )
    });
  }
}
