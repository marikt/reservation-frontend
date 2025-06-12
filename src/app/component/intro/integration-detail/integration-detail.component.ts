import {Component, OnInit} from '@angular/core';
import {IntegrationData} from '../../../model/integration/integration-data';
import {IntegrationType} from '../../../../../projects/notado-lib/src/lib/util/integration-type';
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';
import {IntegrationItemComponent} from '../integration-item/integration-item.component';

@Component({
  selector: 'app-integration-detail',
  templateUrl: './integration-detail.component.html',
  styleUrls: ['./integration-detail.component.scss'],
  imports: [
    TranslateModule,
    NgForOf,
    IntegrationItemComponent
  ],
  standalone: true
})
export class IntegrationDetailComponent implements OnInit {

  public integrations: IntegrationData[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.createIntegrations();
  }

  private createIntegrations() {
    const integrationTypes = Object.keys(IntegrationType).filter((item) => {
      return isNaN(Number(item));
    });

    for (const integrationType of integrationTypes) {
      const integrationData: IntegrationData = new IntegrationData();

      switch (integrationType) {
        case IntegrationType.SMS_MANAGER:
          integrationData.name = 'sms_manager';
          integrationData.label = 'SMS Manager';
          integrationData.url = 'https://smsmanager.cz/';
          integrationData.color = 'rgb(169, 27, 67)';
          break;
        case IntegrationType.KEYGURU:
          integrationData.name = 'keyguru';
          integrationData.label = 'Keyguru';
          integrationData.url = 'https://www.keyguru.cz/';
          integrationData.color = 'rgb(245, 246, 248)';
          break;
        case IntegrationType.GMAIL:
          integrationData.name = 'gmail';
          integrationData.label = 'Gmail';
          integrationData.url = 'https://mail.google.com/';
          integrationData.color = 'rgb(245, 246, 248)';
          break;
        case IntegrationType.TWILIO:
          integrationData.name = 'twilio';
          integrationData.label = 'Twilio';
          integrationData.url = 'https://www.twilio.com/';
          integrationData.color = 'rgb(240, 51, 75)';
          break;
        case IntegrationType.STRIPE:
          integrationData.name = 'stripe';
          integrationData.label = 'Stripe';
          integrationData.url = 'https://stripe.com/';
          integrationData.color = 'rgb(104, 118, 226)';
          break;
        case IntegrationType.CONTACTS:
          integrationData.name = 'contact';
          integrationData.label = 'Google Contact';
          integrationData.url = 'https://contacts.google.com/';
          integrationData.color = 'rgb(245, 246, 248)';
          break;
        case IntegrationType.GOOGLE_CALENDAR:
          integrationData.name = 'calendar';
          integrationData.label = 'Google Calendar';
          integrationData.url = 'https://calendar.google.com';
          integrationData.classTextSuccess = 'text-success';
          integrationData.color = 'rgb(245, 246, 248)';
          break;
        case IntegrationType.SLACK:
          integrationData.name = 'slack';
          integrationData.label = 'Slack';
          integrationData.url = 'https://slack.com/';
          integrationData.classTextSuccess = 'text-white';
          integrationData.color = 'rgb(73, 23, 74)';
          break;
        case IntegrationType.EMAIL:
          integrationData.name = 'email';
          integrationData.label = 'Email';
          integrationData.color = 'rgb(245, 246, 248)';
          break;
        case IntegrationType.CRON:
          integrationData.name = 'cron';
          integrationData.label = 'Cron';
          integrationData.url = 'https://cron.com/';
          integrationData.color = 'rgb(245, 246, 248)';
          break;
      }
      integrationData.desc = integrationType;
      this.integrations.push(integrationData);
    }


  }

}


//   TWILIO = 'TWILIO',
//   SMS_MANAGER = 'SMS_MANAGER',
//   STRIPE = 'STRIPE',
//   CONTACTS = 'CONTACTS',
//   GOOGLE_CALENDAR = 'GOOGLE_CALENDAR',
//   GMAIL = 'GMAIL',
//   SLACK = 'SLACK'




