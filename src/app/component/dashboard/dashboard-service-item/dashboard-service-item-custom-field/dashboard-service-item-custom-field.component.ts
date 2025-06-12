import {Component, Input, OnInit} from '@angular/core';
import {ServiceMax} from '../../../../../../projects/notado-lib/src/lib/model/service-max';
import {DashboardService} from '../../../../service/dashboard.service';
import {NgClass, NgIf} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {FormConfigService} from '../../../../service/form-config.service';
import {CustomFieldManagerComponent} from '../../../shared/custom-field-manager/custom-field-manager.component';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {
  DashboardReservationCardCustomComponent
} from '../../reservation-form/dashboard-reservation-card-custom/dashboard-reservation-card-custom.component';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import {TemplateUtil} from '../../../../../../projects/notado-lib/src/lib/util/template-util';
import {FormWindowName} from '../../../../../../projects/notado-lib/src/lib/util/form-window-name';

@Component({
  selector: 'app-dashboard-service-item-custom-field',
  templateUrl: './dashboard-service-item-custom-field.component.html',
  styleUrls: ['./dashboard-service-item-custom-field.component.scss'],
  imports: [
    NgIf,
    NgClass,
    CustomFieldManagerComponent,
    TranslateModule,
    DashboardReservationCardCustomComponent,
    NgbPopoverModule
  ],
  standalone: true
})
export class DashboardServiceItemCustomFieldComponent implements OnInit {

  @Input()
  public service: ServiceMax;

  constructor(
    public dashboardService: DashboardService,
    public http: HttpService,
    public translate: TranslateService,
    public preventDoubleClickService: PreventDoubleClickService,
    public formConfigService: FormConfigService,
    public alertService: AlertService,

  ) {
  }

  ngOnInit() {
    this.formConfigService.serviceForCustomWindow = this.service;
    this.formConfigService.setCustomFieldsForService(TemplateUtil.getWindow(FormWindowName.CUSTOM, this.dashboardService.template));
  }

  public saveTemplate(): void {
    this.preventDoubleClickService.preventFor();
    this.dashboardService.saveTemplate(
      () => {
        this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
      }
    );
  }

}
