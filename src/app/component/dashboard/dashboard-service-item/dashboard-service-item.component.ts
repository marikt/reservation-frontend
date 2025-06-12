import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceMax} from '../../../../../projects/notado-lib/src/lib/model/service-max';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {ServiceType} from '../../../../../projects/notado-lib/src/lib/enum/service-type';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {StripeIntegrationService} from '../../../service/stripe-integration-service';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {
  FormServiceItemWithDescriptionWindowComponent
} from '../../../../../projects/notado-lib/src/lib/component/form-window/form-service-item-with-description-window/form-service-item-with-description-window.component';
import {JsonPipe, NgIf, NgSwitchCase} from '@angular/common';
import {DashboardServiceItemBasicComponent} from './dashboard-service-item-basic/dashboard-service-item-basic.component';
import {DashboardServiceItemAdvanceComponent} from './dashboard-service-item-advance/dashboard-service-item-advance.component';
import {DashboardServiceItemNotificationComponent} from './dashboard-service-item-notification/dashboard-service-item-notification.component';
import {DashboardServiceItemAutomationComponent} from './dashboard-service-item-automation/dashboard-service-item-automation.component';
import {DashboardServiceItemPaymentComponent} from './dashboard-service-item-payment/dashboard-service-item-payment.component';
import {DashboardServiceItemLocationComponent} from './dashboard-service-item-location/dashboard-service-item-location.component';
import {DashboardServiceItemDurationComponent} from './dashboard-service-item-duration/dashboard-service-item-duration.component';
import {DashboardButtonCustomWebComponent} from '../button/dashboard-button-custom-web/dashboard-button-custom-web.component';
import {FormService} from '../../../../../projects/notado-lib/src/lib/service/form.service';
import {DashboardServiceItemKeyguruComponent} from './dashboard-service-item-keyguru/dashboard-service-item-keyguru.component';
import {KeyguruIntegrationService} from '../../../service/keyguru-integration-service';
import {
  DashboardServiceItemCustomFieldComponent
} from './dashboard-service-item-custom-field/dashboard-service-item-custom-field.component';
import {FormConfigService} from '../../../service/form-config.service';
import {
  DashboardReservationCardCustomComponent
} from '../reservation-form/dashboard-reservation-card-custom/dashboard-reservation-card-custom.component';

@Component({
  selector: 'app-dashboard-service-item',
  templateUrl: './dashboard-service-item.component.html',
  styleUrls: ['./dashboard-service-item.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule,
    FormServiceItemWithDescriptionWindowComponent,
    NgIf,
    DashboardServiceItemBasicComponent,
    DashboardServiceItemAdvanceComponent,
    DashboardServiceItemNotificationComponent,
    DashboardServiceItemAutomationComponent,
    DashboardServiceItemPaymentComponent,
    DashboardServiceItemLocationComponent,
    DashboardServiceItemDurationComponent,
    DashboardButtonCustomWebComponent,
    DashboardServiceItemKeyguruComponent,
    DashboardServiceItemCustomFieldComponent,
    JsonPipe,
    DashboardReservationCardCustomComponent,
    NgSwitchCase
  ],
  standalone: true
})
export class DashboardServiceItemComponent implements OnInit {

  public showValidation: boolean;
  public service: ServiceMax;
  public serviceId: number;
  public calendars: Calendar[] = [];
  public calendar: Calendar = new Calendar();
  public activeCard: string = 'BASIC';
  public paymentEnabled: boolean = false;
  public hover: boolean = false;


  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public http: HttpService,
    private route: ActivatedRoute,
    public router: Router,
    public modalService: ModalService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public stripeIntegrationService: StripeIntegrationService,
    public keyguruIntegrationService: KeyguruIntegrationService,
    public formService: FormService,
    public formConfigService: FormConfigService,
  ) {

  }

  ngOnInit() {
    this.http.get(Api.SERVICE + '/' + this.route.snapshot.params.serviceId, (service: ServiceMax) => {
      this.service = service;
    });
    this.keyguruIntegrationService.init();
    this.formService.loadTemplateForDashboard(this.dashboardService.business);
    this.stripeIntegrationService.init(() => {
      if (this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).price) {
        this.paymentEnabled = true;
      } else {
        this.paymentEnabled = false;
      }
    });
  }

  public get serviceType(): typeof ServiceType {
    return ServiceType;
  }

}
