import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {MetaService} from '../../../service/meta.service';
import {Server} from '../../../../../projects/notado-lib/src/config/server';
import {Customer} from '../../../model/customer';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {CustomerLabel} from '../../../model/customer-label';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {
  GoogleCalendarConnectBusinessItemComponent
} from '../google-calendar-connect-business-item/google-calendar-connect-business-item.component';
import {FormsModule} from '@angular/forms';
import {NgbCollapse, NgbDropdown, NgbDropdownButtonItem, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuState} from '../../util/menu-state';
import {CustomerDropdownComponent} from '../../util/customer-dropdown/customer-dropdown.component';

@Component({
  selector: 'app-dashboard-customer',
  templateUrl: './dashboard-customer.component.html',
  styleUrls: ['./dashboard-customer.component.scss'],
  animations: [
    trigger('popupMenu', [
      state('OPEN', style({
        opacity: 1
      })),
      state('CLOSE', style({
        opacity: 0
      })),
      transition('OPEN => CLOSE', [
        animate('0.2s')
      ]),
      transition('CLOSE => OPEN', [
        animate('0.2s')
      ]),
    ]),
  ],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    TranslateModule,
    GoogleCalendarConnectBusinessItemComponent,
    FormsModule,
    NgbDropdownToggle,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownButtonItem,
    NgbCollapse,
    NgForOf,
    NgIf,
    JsonPipe,
    NgbDropdownItem,
    CustomerDropdownComponent
  ],
  standalone: true
})
export class DashboardCustomerComponent implements OnInit {

  public customers: Customer[];
  public blacklistedCustomers: Customer[];
  public whitelistedCustomers: Customer[];
  public customerLabels: CustomerLabel[];
  public customerLabel: CustomerLabel;
  public blacklistLabel: CustomerLabel;
  public whitelistLabel: CustomerLabel;
  public readyToRefresh: boolean = true;
  public activeCard: string = 'CONTACTS';

  constructor(public dashboardService: DashboardService,
              public http: HttpService,
              public router: Router,
              public alertService: AlertService,
              public metaService: MetaService,
              public translate: TranslateService,
              public preventDoubleClickService: PreventDoubleClickService,
              public server: Server) {
  }

  ngOnInit(): void {
    this.init();
  }

  public init() {
    if (this.dashboardService.business.googleCalendarConnected) {
      this.customerLabel = new CustomerLabel();
      this.customerLabel.id = this.dashboardService.business.contactLabelId;
      this.customerLabel.name = this.dashboardService.business.contactLabel;

      this.blacklistLabel = new CustomerLabel();
      this.blacklistLabel.id = this.dashboardService.business.blacklistLabelId;
      this.blacklistLabel.name = this.dashboardService.business.blacklistLabel;

      this.whitelistLabel = new CustomerLabel();
      this.whitelistLabel.id = this.dashboardService.business.whitelistLabelId;
      this.whitelistLabel.name = this.dashboardService.business.whitelistLabel;

      this.loadLabels();
    }
  }

  public loadLabels() {
    this.http.get(Api.CUSTOMER + '/labels/' + this.dashboardService.business.id, (customerLabels) => {
        this.customerLabels = customerLabels;
        if (this.customerLabel == null && this.customerLabels && this.customerLabels.length > 0) {
          this.customerLabel = this.customerLabels[0];
        }
        this.loadCustomers();
        this.loadBlacklistedCustomers();
        this.loadWhitelistedCustomers();
      }
    );
  }

  public loadCustomers() {
    if (this.customerLabel.id) {
      const labelId = this.customerLabel.id.replace('/', '_');
      this.http.get(Api.CUSTOMER + '/' + this.dashboardService.business.id + '/' + labelId, (customers) => {
          this.customers = customers;
        }
      );
    }
  }

  public loadBlacklistedCustomers() {
    if (this.blacklistLabel && this.blacklistLabel.id) {
      const labelId = this.blacklistLabel.id.replace('/', '_');
      this.http.get(Api.CUSTOMER + '/' + this.dashboardService.business.id + '/' + labelId, (customers) => {
          this.blacklistedCustomers = customers;
        }
      );
    } else {
      this.blacklistedCustomers = [];
    }
  }

  public loadWhitelistedCustomers() {
    if (this.whitelistLabel && this.whitelistLabel.id) {
      const labelId = this.whitelistLabel.id.replace('/', '_');
      this.http.get(Api.CUSTOMER + '/' + this.dashboardService.business.id + '/' + labelId, (customers) => {
          this.whitelistedCustomers = customers;
        }
      );
    } else {
      this.whitelistedCustomers = [];
    }
  }

  public save(): void {
    this.preventDoubleClickService.preventFor();
    this.dashboardService.business.contactLabel = this.customerLabel.name;
    this.dashboardService.business.contactLabelId = this.customerLabel.id;

    if (this.blacklistLabel) {
      this.dashboardService.business.blacklistLabel = this.blacklistLabel.name;
      this.dashboardService.business.blacklistLabelId = this.blacklistLabel.id;
    }

    if (this.whitelistLabel) {
      this.dashboardService.business.whitelistLabel = this.whitelistLabel.name;
      this.dashboardService.business.whitelistLabelId = this.whitelistLabel.id;
    }

    this.dashboardService.saveBusiness(() => {
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
      this.init();
    });
  }

  public selectLabel(selectedLabel: CustomerLabel) {
    this.customerLabel = selectedLabel;
    this.loadCustomers();
  }

  public selectBlacklistLabel(selectedLabel: CustomerLabel) {
    this.blacklistLabel = selectedLabel;
    this.loadBlacklistedCustomers();
  }

  public selectWhitelistLabel(selectedLabel: CustomerLabel) {
    this.whitelistLabel = selectedLabel;
    this.loadWhitelistedCustomers();
  }

  public deleteCache() {
    console.log('refresh cache');
    this.readyToRefresh = false;
    this.http.post(Api.CACHE + '/clear-customer/' + this.dashboardService.business.id,
      {id: this.customerLabel.id}, () => {
        this.alertService.addInfo(this.translate.instant('ALERT.CACHE_DELETED'));
        this.init();
        setTimeout(() => {
            this.readyToRefresh = true;
          },
          10_000);
      });
  }

  public deleteContactLabel() {
    this.dashboardService.business.contactLabel = null;
    this.dashboardService.business.contactLabelId = null;
    this.customerLabel = new CustomerLabel();
    this.customers = [];
    this.save();
    this.alertService.addInfo(this.translate.instant('ALERT.LABEL_DELETED'));
  }

  public deleteBlacklistLabel() {
    this.dashboardService.business.blacklistLabel = null;
    this.dashboardService.business.blacklistLabelId = null;
    this.blacklistLabel = new CustomerLabel();
    this.blacklistedCustomers = [];
    this.save();
    this.alertService.addInfo(this.translate.instant('ALERT.LABEL_DELETED'));
  }

  public deleteWhitelistLabel() {
    this.dashboardService.business.whitelistLabel = null;
    this.dashboardService.business.whitelistLabelId = null;
    this.whitelistLabel = new CustomerLabel();
    this.whitelistedCustomers = [];
    this.save();
    this.alertService.addInfo(this.translate.instant('ALERT.LABEL_DELETED'));
  }

  public getLabelForUrl(): string {
    return this.customerLabel.id.replace('contactGroups/', '');
  }

  public getBlacklistLabelForUrl(): string {
    return this.blacklistLabel.id.replace('contactGroups/', '');
  }

  public getWhitelistLabelForUrl(): string {
    return this.whitelistLabel.id.replace('contactGroups/', '');
  }
  
  public get menuStateEnum(): typeof MenuState {
    return MenuState;
  }
}
