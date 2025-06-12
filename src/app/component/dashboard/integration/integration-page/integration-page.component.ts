import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {IntegrationData} from '../../../../model/integration/integration-data';
import {SmsManagerIntegrationConfig} from '../../../../model/integration/sms-manager-integration-config';
import {TwilioIntegrationConfig} from '../../../../model/integration/twilio-integration-config';
import {IntegrationType} from '../../../../../../projects/notado-lib/src/lib/util/integration-type';
import {DashboardCardComponent} from '../../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../../template/dashboard-card-label/dashboard-card-label.component';
import {NgForOf, NgIf} from '@angular/common';
import {IntegrationCardComponent} from '../integration-card/integration-card.component';

@Component({
  selector: 'app-integration-page',
  templateUrl: './integration-page.component.html',
  styleUrls: ['./integration-page.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    NgForOf,
    IntegrationCardComponent,
    NgIf
  ],
  standalone: true
})
export class IntegrationPageComponent implements OnInit {

  public integrationDataArray: IntegrationData[] = [];

  constructor(public http: HttpService,
              public dashboardService: DashboardService,
  ) {
  }

  ngOnInit(): void {
    this.loadIntegrationData();
  }

  private loadIntegrationData(): void {
    this.http.get(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id,
      (integrationDataArray: IntegrationData[]) => {
        this.integrationDataArray = integrationDataArray;
        this.setDefaultValues();
      });
  }

  private setDefaultValues() {
    for (const integrationData of this.integrationDataArray) {
      switch (integrationData.type) {
        case IntegrationType.SMS_MANAGER:
          integrationData.name = 'sms_manager';
          integrationData.url = 'https://smsmanager.cz/';
          integrationData.color = 'rgb(169, 27, 67)';
          integrationData.classTextSuccess = 'text-white';
          integrationData.classTextDanger = 'text-white';
          if (!integrationData.config) {
            integrationData.config = new SmsManagerIntegrationConfig();
          }
          break;
        case IntegrationType.KEYGURU:
          integrationData.name = 'keyguru';
          integrationData.color = 'white';
          integrationData.url = 'https://keyguru.cz/';
          integrationData.classTextSuccess = 'text-success';
          integrationData.classTextDanger = 'text-danger';
          break;
        case IntegrationType.EMAIL:
          integrationData.name = 'email';
          integrationData.color = 'white';
          integrationData.classTextSuccess = 'text-success';
          integrationData.classTextDanger = 'text-danger';
          break;
        case IntegrationType.TWILIO:
          integrationData.name = 'twilio';
          integrationData.url = 'https://www.twilio.com/';
          integrationData.classTextSuccess = 'text-white';
          integrationData.classTextDanger = 'text-white';
          if (!integrationData.config) {
            integrationData.config = new TwilioIntegrationConfig();
          }
          integrationData.color = 'rgb(240, 51, 75)';
          break;
        case IntegrationType.STRIPE:
          integrationData.name = 'stripe';
          integrationData.url = 'https://stripe.com/';
          integrationData.color = 'rgb(104, 118, 226)';
          integrationData.classTextSuccess = 'text-white';
          integrationData.classTextDanger = 'text-white';
          break;
        case IntegrationType.CONTACTS:
          integrationData.name = 'contact';
          integrationData.url = 'https://contacts.google.com/';
          integrationData.color = 'white';
          integrationData.classTextSuccess = 'text-success';
          integrationData.classTextDanger = 'text-danger';
          break;
        case IntegrationType.GOOGLE_CALENDAR:
          integrationData.name = 'calendar';
          integrationData.url = 'https://calendar.google.com';
          integrationData.classTextSuccess = 'text-success';
          integrationData.color = 'white';
          integrationData.classTextDanger = 'text-danger';
          break;
        case IntegrationType.SLACK:
          integrationData.name = 'slack';
          integrationData.url = 'https://slack.com/';
          integrationData.classTextSuccess = 'text-white';
          integrationData.color ='rgb(73, 23, 74)';
          integrationData.classTextDanger = 'text-white';
          break;
      }
    }
  }
}
