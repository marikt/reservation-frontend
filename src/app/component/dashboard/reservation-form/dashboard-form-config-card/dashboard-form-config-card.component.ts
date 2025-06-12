import {Component, OnInit} from '@angular/core';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {
  AlertItem,
  ReservationWindowConfig
} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window-config';
import {CustomField} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/custom-field';
import {ComponentTypeEnum} from '../../../../../../projects/notado-lib/src/lib/util/component-type.enum';
import {DashboardService} from '../../../../service/dashboard.service';
import {FormConfigService} from '../../../../service/form-config.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {ServiceGroup} from '../../../../../../projects/notado-lib/src/lib/model/service-group';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {BusinessBranch} from '../../../../../../projects/notado-lib/src/lib/model/business-branch';
import {Service} from '../../../../../../projects/notado-lib/src/lib/model/service';
import {NgForOf, NgIf} from '@angular/common';
import {NgToggleModule} from 'ng-toggle-button';
import {FormsModule} from '@angular/forms';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {RouterLink} from '@angular/router';
import {CustomFieldManagerComponent} from '../../../shared/custom-field-manager/custom-field-manager.component';

@Component({
  selector: 'app-dashboard-form-config-card',
  templateUrl: './dashboard-form-config-card.component.html',
  styleUrls: ['./dashboard-form-config-card.component.scss'],
  imports: [
    NgIf,
    NgToggleModule,
    TranslateModule,
    FormsModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgForOf,
    NgbDropdownItem,
    RouterLink,
    CustomFieldManagerComponent
  ],
  standalone: true
})
export class DashboardFormConfigCardComponent implements OnInit {

  public serviceGroups: ServiceGroup[];
  public businessBranches: BusinessBranch[];
  public services: Service[];
  public showRedirectOnReservationFinInbox: boolean = false;

  constructor(public dashboardService: DashboardService,
              public translate: TranslateService,
              public http: HttpService,
              public languageService: LanguageService,
              public formConfigService: FormConfigService) {
  }

  ngOnInit(): void {
    if (this.dashboardService.template.windows[10].config.redirectOnReservationFin) {
      this.showRedirectOnReservationFinInbox = true;
    }
    this.http.get(Api.SERVICE + '/by-business/' + this.dashboardService.business.id, (services: Service[]) => {
      this.services = services;
    });

    this.http.get(Api.SERVICE_GROUP + '/by-business/' + this.dashboardService.business.id,
      (serviceGroups: ServiceGroup[]) => {
        this.serviceGroups = serviceGroups;
      });
    this.http.get(Api.BUSINESS_BRANCH + '/by-business/' + this.dashboardService.business.id,
      (businessBranches: BusinessBranch[]) => {
        this.businessBranches = businessBranches;
      });
  }

  public selectService(service: Service, window: ReservationWindow) {
    this.formConfigService.serviceForCustomWindow = service;
    this.formConfigService.setCustomFieldsForService(window);
  }

  public addPhoneInput(reservationWindow: ReservationWindow): void {
    if (!reservationWindow.config) {
      reservationWindow.config = new ReservationWindowConfig();
    }
    reservationWindow.config.phone = true;
  }

  public addLicenceAgreement(reservationWindow: ReservationWindow): void {
    if (!reservationWindow.config) {
      reservationWindow.config = new ReservationWindowConfig();
    }
    if (reservationWindow.config && !reservationWindow.config.licenceAgreementConf) {
      reservationWindow.config.licenceAgreementConf = new CustomField();
    }
    reservationWindow.config.licenceAgreement = true;
  }

  public hideServicePrice(reservationWindow: ReservationWindow) {
    if (!reservationWindow.config) {
      reservationWindow.config = new ReservationWindowConfig();
    }
    reservationWindow.config.hidePrice = true;
  }

  public hideServiceDuration(reservationWindow: ReservationWindow) {
    if (!reservationWindow.config) {
      reservationWindow.config = new ReservationWindowConfig();
    }
    reservationWindow.config.hideDuration = true;
  }

  public get componentType(): typeof ComponentTypeEnum {
    return ComponentTypeEnum;
  }

  public addAlertItems(reservationWindow: ReservationWindow): void {
    if (!reservationWindow.config) {
      reservationWindow.config = new ReservationWindowConfig();
    }
    if (!reservationWindow.config.alertItems) {
      reservationWindow.config.alertItems = [];
    }
    const alertItem: AlertItem = new AlertItem();
    alertItem.type = 'light';
    alertItem.label = '';
    alertItem.msg = '';
    reservationWindow.config.alertItems.push(alertItem);
  }
}
