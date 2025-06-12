import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {IntegrationData} from '../../../../model/integration/integration-data';
import {IntegrationType} from '../../../../../../projects/notado-lib/src/lib/util/integration-type';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';
import {IntegrationStripeComponent} from '../integration-detail/integration-stripe/integration-stripe.component';
import {IntegrationCalendarComponent} from '../integration-detail/integration-calendar/integration-calendar.component';
import {IntegrationPeopleComponent} from '../integration-detail/integration-people/integration-people.component';
import {IntegrationTwilioComponent} from '../integration-detail/integration-twilio/integration-twilio.component';
import {IntegrationSmsmanagerComponent} from '../integration-detail/integration-smsmanager/integration-smsmanager.component';
import {IntegrationSlackComponent} from '../integration-detail/integration-slack/integration-slack.component';
import {IntegrationEmailComponent} from '../integration-detail/integration-email/integration-email.component';
import {IntegrationKeyguruComponent} from '../integration-detail/integration-keyguru/integration-keyguru.component';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-integration-card',
  templateUrl: './integration-card.component.html',
  styleUrls: ['./integration-card.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    IntegrationStripeComponent,
    NgSwitchCase,
    NgSwitch,
    IntegrationCalendarComponent,
    IntegrationPeopleComponent,
    IntegrationTwilioComponent,
    IntegrationSmsmanagerComponent,
    IntegrationSlackComponent,
    IntegrationEmailComponent,
    IntegrationKeyguruComponent,
    NgbTooltip
  ],
  standalone: true
})
export class IntegrationCardComponent implements OnInit {

  @Input('integrationData') integrationData: IntegrationData;

  constructor(public modalService: ModalService) {
  }

  ngOnInit(): void {
    if (!this.integrationData.config) {
      this.integrationData.config = {};
    }
  }

  public get integrationType(): typeof IntegrationType {
    return IntegrationType;
  }

}
