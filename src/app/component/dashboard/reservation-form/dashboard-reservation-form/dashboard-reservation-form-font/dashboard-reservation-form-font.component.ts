import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../../../../../service/dashboard.service';
import {HttpService} from '../../../../../../../projects/notado-lib/src/lib/service/http.service';
import {FormService} from '../../../../../../../projects/notado-lib/src/lib/service/form.service';
import {MetaService} from '../../../../../service/meta.service';
import {Server} from '../../../../../../../projects/notado-lib/src/config/server';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {ColorPickerModule} from 'ngx-color-picker';
import {FormsModule} from '@angular/forms';
import 'leader-line';
import {VideoTutorialComponent} from '../../../../video-tutorial/video-tutorial.component';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {TypeaheadService} from '../../../../../../../projects/notado-lib/src/lib/service/typeahead.service';

@Component({
  selector: 'app-dashboard-reservation-form-font',
  templateUrl: './dashboard-reservation-form-font.component.html',
  styleUrls: ['./dashboard-reservation-form-font.component.scss'],
  imports: [
    NgIf,
    ColorPickerModule,
    TranslateModule,
    FormsModule,
    VideoTutorialComponent,
    NgbTypeahead
  ],
  standalone: true
})
export class DashboardReservationFormFontComponent implements OnInit, OnDestroy {

  constructor(
    public dashboardService: DashboardService,
    public formService: FormService,
    public metaService: MetaService,
    public server: Server,
    public http: HttpService,
    public translate: TranslateService,
    public typeaheadService: TypeaheadService
  ) {
  }

  ngOnInit(): void {
  }

  public ngOnDestroy() {
  }

}
