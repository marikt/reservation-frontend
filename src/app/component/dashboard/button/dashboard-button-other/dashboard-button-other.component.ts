import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {FormUrlPipe} from '../../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

@Component({
  selector: 'app-dashboard-button-other',
  templateUrl: './dashboard-button-other.component.html',
  styleUrls: ['./dashboard-button-other.component.scss'],
  imports: [
    TranslateModule,
    FormsModule,
    FormUrlPipe
  ],
  standalone: true
})
export class DashboardButtonOtherComponent implements OnInit {

  constructor(public dashboardService: DashboardService,
              public alertService: AlertService,
              public formUrlPipe: FormUrlPipe,
              public translate: TranslateService
  ) {
  }

  ngOnInit() {
  }

  public copyButtonLink(): void {
    navigator.clipboard.writeText(this.formUrlPipe.transform(this.dashboardService.business.url)).then().catch(e => console.log(e));
    this.alertService.addInfo(this.translate.instant('ALERT.URL_COPY'));
  }

}
