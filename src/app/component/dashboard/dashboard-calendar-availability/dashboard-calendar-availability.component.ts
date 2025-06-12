import {Component, OnInit} from '@angular/core';
import {FormService} from '../../../../../projects/notado-lib/src/lib/service/form.service';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {FormUrlPipe} from '../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';


@Component({
  selector: 'app-dashboard-calendar-availability',
  templateUrl: './dashboard-calendar-availability.component.html',
  styleUrls: ['./dashboard-calendar-availability.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    FormUrlPipe,
    TranslateModule
  ],
  standalone: true
})
export class DashboardCalendarAvailabilityComponent implements OnInit {
  public calendarAvailabilityLink: string;


  constructor(public formService: FormService,
              public dashboardService: DashboardService,
              private formUrlPipe: FormUrlPipe,
              private alertService: AlertService,
              public translate: TranslateService,
  ) {
  }

  public ngOnInit(): void {
    this.calendarAvailabilityLink = '<iframe width="100%" height="900" src="' + this.formUrlPipe.transform(this.dashboardService.business.url) + '/calendar-availability" frameborder="0"></iframe>';
    this.alertService.addInfo(this.translate.instant('ALERT.BUTTON_CODE'))
  }

  public copyButtonLink(): void {
    navigator.clipboard.writeText(this.calendarAvailabilityLink).then().catch(e => console.log(e));
  }
}


