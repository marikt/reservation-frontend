import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {EventColor} from '../../../../model/event-color';
import {DashboardServiceItemCommonComponent} from '../dashboard-service-item-common.component';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {FormsModule} from '@angular/forms';
import {VideoTutorialComponent} from '../../../video-tutorial/video-tutorial.component';
import {NgForOf, NgIf} from '@angular/common';
import {
  NgbDropdown,
  NgbDropdownButtonItem,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbTooltip
} from '@ng-bootstrap/ng-bootstrap';
import {KeywordHighlighterComponent} from '../../../util/keyword-highlighter/keyword-highlighter.component';
import {LineService} from '../../../../service/line.service';
import {ServiceService} from '../../../../service/service.service';

@Component({
  selector: 'app-dashboard-service-item-advance',
  templateUrl: './dashboard-service-item-advance.component.html',
  styleUrls: ['../dashboard-service-item.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    VideoTutorialComponent,
    NgIf,
    NgbTooltip,
    NgForOf,
    NgbDropdownMenu,
    NgbDropdownButtonItem,
    NgbDropdownItem,
    NgbDropdown,
    NgbDropdownToggle,
    KeywordHighlighterComponent,
    RouterLink
  ],
  standalone: true
})
export class DashboardServiceItemAdvanceComponent extends DashboardServiceItemCommonComponent implements OnInit {

  public colors: EventColor[] = [];
  public colorPerService: boolean = false;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public modalService: ModalService,
    public translate: TranslateService,
    public languageService: LanguageService,
    public preventDoubleClickService: PreventDoubleClickService,
    public lineService: LineService,
    public serviceService: ServiceService
  ) {
    super(
      dashboardService,
      alertService,
      broadcastService,
      http,
      router,
      modalService,
      translate,
      preventDoubleClickService,
      lineService,
      serviceService);
  }

  ngOnInit() {
    if (this.service.color) {
      this.colorPerService = true;
    }
    
    if (this.dashboardService.business.googleCalendarConnected) {
      this.http.get(Api.CALENDAR_EVENT + '/colors/' + this.dashboardService.business.id,
        (colors: EventColor[]) => {
          this.colors = colors
        });
    }
  }

  public clearColor() {
    if (!this.colorPerService) {
      this.service.color = null;
    }
  }

  public getColorById(): EventColor {
    for (const color of this.colors) {
      if (this.service.color === color.id) {
        return color;
      }
    }
  }

}
