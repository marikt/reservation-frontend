import {Component} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {DashboardButtonOtherComponent} from '../dashboard-button-other/dashboard-button-other.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {VideoTutorialComponent} from '../../../video-tutorial/video-tutorial.component';
import {FormsModule} from '@angular/forms';
import {FormUrlPipe} from '../../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

@Component({
  selector: 'app-dashboard-button-wix',
  templateUrl: './dashboard-button-wix.component.html',
  styleUrls: ['./dashboard-button-wix.component.scss'],
  imports: [
    TranslateModule,
    VideoTutorialComponent,
    FormsModule,
    FormUrlPipe
  ],
  standalone: true
})
export class DashboardButtonWixComponent extends DashboardButtonOtherComponent {


  constructor(public dashboardService: DashboardService,
              public alertService: AlertService,
              public formUrlPipe: FormUrlPipe,
              public translate: TranslateService
  ) {
    super(dashboardService, alertService, formUrlPipe, translate);

  }

}
