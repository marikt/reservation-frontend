import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../../../../service/dashboard.service';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {FormService} from '../../../../../../../projects/notado-lib/src/lib/service/form.service';
import {MetaService} from '../../../../../service/meta.service';
import {Server} from '../../../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {ColorPickerModule} from 'ngx-color-picker';
import {FormsModule} from '@angular/forms';
import 'leader-line';
import {VideoTutorialComponent} from '../../../../video-tutorial/video-tutorial.component';

@Component({
  selector: 'app-dashboard-reservation-form-right-detail',
  templateUrl: './dashboard-reservation-form-right-detail.component.html',
  styleUrls: ['./dashboard-reservation-form-right-detail.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class DashboardReservationFormRightDetailComponent implements OnInit, OnDestroy {

  constructor(
    public dashboardService: DashboardService,
    public formService: FormService,
    public metaService: MetaService,
    public server: Server,
    public http: HttpService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
  }

  public ngOnDestroy() {
  }

}
