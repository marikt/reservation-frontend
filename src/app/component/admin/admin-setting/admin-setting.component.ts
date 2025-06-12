import {Component, OnInit} from '@angular/core';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {DashboardService} from '../../../service/dashboard.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {EventFromCalendar} from '../../../../../projects/notado-lib/src/lib/model/event/event-from-calendar';

@Component({
  selector: 'app-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent
  ],
  standalone: true
})
export class AdminSettingComponent implements OnInit {


    public evets: EventFromCalendar[] = [];

    constructor(
        public http: HttpService,
        public modalService: ModalService,
        public dashboardService: DashboardService,
        public spinnerService: SpinnerService,
        public alertService: AlertService,
    ) {
    }

    ngOnInit() {
    }


    /**
     * make sure that notado admin calendar is connected
     */
    public getHolidays(): void {
        this.spinnerService.show();

        this.http.get(Api.ADMIN + '/health-check-holidays', (evets: EventFromCalendar[]) => {
            this.evets = evets;
            this.spinnerService.hide();
        });

    }

  public repairTemplate(): void {
    this.http.get(Api.ADMIN + '/repair-template',
      () => {
        this.alertService.addSuccess('Template fixed');
      },
      () => {
        this.alertService.addError('Cant repair template');
      },
    );
  }

  addNotificationMsgs() {
    this.http.get(Api.ADMIN + '/add-missing-notification',
      () => {
        this.alertService.addSuccess('msgs fixed');
      },
      () => {
        this.alertService.addError('Cant add msgs');
      },
    );

  }
}
