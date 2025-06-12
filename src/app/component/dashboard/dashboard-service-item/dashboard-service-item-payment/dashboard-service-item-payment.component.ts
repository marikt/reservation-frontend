import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router} from '@angular/router';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {StripeIntegrationService} from '../../../../service/stripe-integration-service';
import {DashboardServiceItemCommonComponent} from '../dashboard-service-item-common.component';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {LineService} from '../../../../service/line.service';
import {ServiceService} from '../../../../service/service.service';
import {StripePriceDropdownComponent} from '../../../util/stripe-price-dropdown/stripe-price-dropdown.component';
import {StripePrice} from '../../../../../../projects/notado-lib/src/lib/model/stripe-price';

@Component({
  selector: 'app-dashboard-service-item-payment',
  templateUrl: './dashboard-service-item-payment.component.html',
  styleUrls: ['../dashboard-service-item.component.scss'],
    imports: [
        FormsModule,
        NgIf,
        TranslateModule,
        NgbPopover,
        StripePriceDropdownComponent
    ],
  standalone: true
})
export class DashboardServiceItemPaymentComponent extends DashboardServiceItemCommonComponent  implements OnInit {

  public paymentEnabled: boolean = false;
  public stripePriceName: string;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public modalService: ModalService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public stripeIntegrationService: StripeIntegrationService,
    public preventDoubleClickService: PreventDoubleClickService,
    public lineService: LineService,
    public serviceService: ServiceService
  ) {
    super(
      dashboardService,
      alertService,
      broadcastService,
      http,
      router,
      modalService,
      translate,
      preventDoubleClickService,
      lineService,
      serviceService);
  }

  ngOnInit() {
    this.stripeIntegrationService.init(() => {
      if (this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).price) {
        this.paymentEnabled = true;
      } else {
        this.paymentEnabled = false;
      }
    });
  }

  public clearPrice() {
    if (!this.paymentEnabled) {
      this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).price = null;
    }
  }

  public loadPrice(stripePrices: StripePrice[]) {
    if (!stripePrices || !this.service) {
      return;
    }
    for (const stripePrice of stripePrices) {
      if (stripePrice.id === this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).price) {
        this.stripePriceName = stripePrice.productName + ': ' + stripePrice.price + ',-';
        return;
      }
    }
  }

  public setPrice(stripePrice: StripePrice) {
    this.stripePriceName = stripePrice.productName + ': ' + stripePrice.price + ',-';
    this.service.price = stripePrice.price;
    this.stripeIntegrationService.getStripeIntegrationBusinessConfig(this.service.id).price = stripePrice.id
  }

  public saveServiceAndPayment() {
    this.stripeIntegrationService.saveStripeIntegration();
    this.saveService();
  }
}
