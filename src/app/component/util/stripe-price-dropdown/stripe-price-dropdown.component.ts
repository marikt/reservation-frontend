import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {
  NgbCollapse,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbPopover,
  NgbTooltip
} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {
  GoToGoogleCalendarSettingPopupComponent
} from '../go-to-google-calendar-setting-popup/go-to-google-calendar-setting-popup.component';
import {DashboardMenuAddItemComponent} from '../../dashboard/menu/dashboard-menu-add-item/dashboard-menu-add-item.component';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {IntegrationData} from '../../../model/integration/integration-data';
import {IntegrationType} from '../../../../../projects/notado-lib/src/lib/util/integration-type';
import {StripePrice} from '../../../../../projects/notado-lib/src/lib/model/stripe-price';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {RouterLink} from '@angular/router';
import {LoadingProgressComponent} from '../../dashboard/loading-progress/loading-progress.component';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {VideoGuideComponent} from '../../video-guide/video-guide.component';

@Component({
  selector: 'app-stripe-price-dropdown',
  templateUrl: './stripe-price-dropdown.component.html',
  styleUrls: ['./stripe-price-dropdown.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    NgbTooltip,
    FormsModule,
    NgbDropdownToggle,
    NgbDropdown,
    NgbDropdownMenu,
    NgForOf,
    NgbDropdownItem,
    NgbPopover,
    GoToGoogleCalendarSettingPopupComponent,
    NgbCollapse,
    DashboardMenuAddItemComponent,
    RouterLink,
    LoadingProgressComponent,
    VideoTutorialComponent,
    VideoGuideComponent,
    JsonPipe
  ],
  standalone: true
})
export class StripePriceDropdownComponent implements OnInit {

  @Input('label')
  public label: string;

  @Input('priceId')
  public priceId: string;

  @Input('showValidation')
  public showValidation: boolean;

  @Output('selectPriceAction')
  public selectPriceAction: EventEmitter<any> = new EventEmitter();

  @Output('loadPriceAction')
  public loadPriceAction: EventEmitter<any> = new EventEmitter();

  public priceName: string;
  public integrationData: IntegrationData;
  public isRecurring: boolean;
  public stripePrices: StripePrice[];

  constructor(public dashboardService: DashboardService,
              public translate: TranslateService,
              public spinnerService: SpinnerService,
              public modalService: ModalService,
              public preventDoubleClickService: PreventDoubleClickService,
              private http: HttpService) {
  }

  public ngOnInit() {
    this.spinnerService.startProgress(3_000);
    this.http.get(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id + '/' + IntegrationType.STRIPE,
      (integrationData: IntegrationData) => {
        this.integrationData = integrationData;
        if (!integrationData.connected) {
          return;
        }
        this.loadPrices();
      }
    );
  }

  public loadPrices() {
    this.http.get(Api.FORM_PAYMENT + '/' + this.dashboardService.business.id + '/price', (stripePrices: StripePrice[]) => {
      this.stripePrices = stripePrices;
      this.loadPriceAction.emit(stripePrices);
      for (const stripePrice of stripePrices) {
        if (stripePrice.id === this.priceId) {
          this.setPriceName(stripePrice);
          return;
        }
      }
    });
  }

  public setPriceName(stripePrice: StripePrice): void {
    this.priceName = stripePrice.productName + ': ' + stripePrice.price + ',-';
    this.isRecurring = stripePrice.recurring;
  }
}
