import {Component} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {DashboardButtonOtherComponent} from '../dashboard-button-other/dashboard-button-other.component';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateService} from '@ngx-translate/core';
import {FormUrlPipe} from '../../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

@Component({
    selector: 'app-dashboard-button-squarespace',
    templateUrl: './dashboard-button-squarespace.component.html',
    styleUrls: ['./dashboard-button-squarespace.component.scss'],
    standalone: true
})
export class DashboardButtonSquarespaceComponent extends DashboardButtonOtherComponent {


  constructor(public dashboardService: DashboardService,
              public alertService: AlertService,
              public formUrlPipe: FormUrlPipe,
              public translate: TranslateService


  ) {
      super(dashboardService, alertService, formUrlPipe, translate);
    }

}
