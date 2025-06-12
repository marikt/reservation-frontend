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
import {KeyguruIntegrationService} from '../../../../service/keyguru-integration-service';
import {KeyguruDrawerDropdownComponent} from '../../../util/keyguru-drawer-dropdown/keyguru-drawer-dropdown.component';
import {KeyguruDrawer} from '../../../../../../projects/notado-lib/src/lib/model/keyguru-drawer';

@Component({
  selector: 'app-dashboard-service-item-keyguru',
  templateUrl: './dashboard-service-item-keyguru.component.html',
  styleUrls: ['../dashboard-service-item.component.scss'],
  imports: [
    FormsModule,
    NgIf,
    TranslateModule,
    NgbPopover,
    StripePriceDropdownComponent,
    KeyguruDrawerDropdownComponent
  ],
  standalone: true
})
export class DashboardServiceItemKeyguruComponent extends DashboardServiceItemCommonComponent implements OnInit {

  public paymentEnabled: boolean = false;
  public keyguruName: string;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public modalService: ModalService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public keyguruIntegrationService: KeyguruIntegrationService,
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
    this.keyguruIntegrationService.init();
  }

  public loadDrawer(keyguruDrawers: KeyguruDrawer[]) {
    if (!keyguruDrawers || !this.service) {
      return;
    }
    for (const keyguruDrawer of keyguruDrawers) {
      if (keyguruDrawer.id === this.keyguruIntegrationService.getKeyguruIntegrationBusinessConfig(this.service.id).drawerId) {
        this.keyguruName = keyguruDrawer.name;
        return;
      }
    }
  }

  public setDrawer(stripePrice: StripePrice) {
    this.keyguruName = stripePrice.productName;
    this.service.price = stripePrice.price;
    this.keyguruIntegrationService.getKeyguruIntegrationBusinessConfig(this.service.id).drawerId = stripePrice.id
  }

  public saveServiceAndKeyguru() {
    this.keyguruIntegrationService.saveKeyguruIntegration();
    this.saveService();
  }
}
