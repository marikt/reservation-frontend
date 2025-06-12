import {Component, Input, OnInit} from '@angular/core';
import {ComponentTypeEnum} from '../../../../../../projects/notado-lib/src/lib/util/component-type.enum';
import {FormConfigService} from '../../../../service/form-config.service';
import {ReservationWindow} from '../../../../../../projects/notado-lib/src/lib/model/reservation-form/reservation-window';
import {NgbInputDatepicker, NgbTimepicker, NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {DashboardService} from '../../../../service/dashboard.service';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';

@Component({
  selector: 'app-dashboard-reservation-card-custom',
  templateUrl: './dashboard-reservation-card-custom.component.html',
  styleUrls: ['./dashboard-reservation-card-custom.component.scss'],
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    ColorPickerModule,
    NgbTimepicker,
    NgbInputDatepicker
  ],
  standalone: true
})
export class DashboardReservationCardCustomComponent implements OnInit {

  @Input('window')
  public window: ReservationWindow;
  public time = {hour: 13, minute: 30};
  constructor(public formConfigService: FormConfigService,
              public dashboardService: DashboardService,
              config: NgbTimepickerConfig) {
    // customize default values of ratings used by this component tree
    config.seconds = false;
    config.spinners = false;
  }

  ngOnInit() {
    if (!this.window.config.customFieldsForServices) {
      this.window.config.customFieldsForServices = [];
    }
  }

  public get componentType(): typeof ComponentTypeEnum {
    return ComponentTypeEnum;
  }

  public getDatePickerColor(selected: boolean): string {
    if (selected) {
      return this.dashboardService.template.componentColor;
    }
    return 'transparent';
  }
}
