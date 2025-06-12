import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../../../service/dashboard.service';
import {AlertService} from '../../../../../../projects/notado-lib/src/lib/service/alert.service';
import {BroadcastService} from '../../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router} from '@angular/router';
import {TypeaheadService} from '../../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {Calendar} from '../../../../../../projects/notado-lib/src/lib/model/calendar';
import {DashboardServiceItemCommonComponent} from '../dashboard-service-item-common.component';
import {PreventDoubleClickService} from '../../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {FormsModule} from '@angular/forms';
import {CalendarDropdownWithRefreshComponent} from '../../../util/calendar-with-refresh/calendar-dropdown-with-refresh.component';
import {NgForOf, NgIf} from '@angular/common';
import {LineService} from '../../../../service/line.service';
import {ServiceService} from '../../../../service/service.service';
import {NgbDropdown, NgbDropdownButtonItem, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {EventColor} from '../../../../model/event-color';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';

@Component({
  selector: 'app-dashboard-service-item-automation',
  templateUrl: './dashboard-service-item-automation.component.html',
  styleUrls: ['../dashboard-service-item.component.scss'],
  imports: [
    FormsModule,
    TranslateModule,
    CalendarDropdownWithRefreshComponent,
    NgIf,
    NgForOf,
    NgbDropdown,
    NgbDropdownButtonItem,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle
  ],
  standalone: true
})
export class DashboardServiceItemAutomationComponent extends DashboardServiceItemCommonComponent implements OnInit {

  public colors: EventColor[] = [];
  public isColorToSwitch: boolean = false;

  public switchCalendar: Calendar = new Calendar();

  public onCourseFullCapacitySwitchCalendar: boolean;
  public onCourseFullCapacitySwitchName: boolean;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public router: Router,
    public typeaheadService: TypeaheadService,
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
    if (this.dashboardService.business.googleCalendarConnected) {
      this.http.get(Api.CALENDAR_EVENT + '/colors/' + this.dashboardService.business.id,
        (colors: EventColor[]) => {
          this.colors = colors
        });
    }


    this.loadCalendars((calendars: Calendar[]) => {
      if (!this.service.calendarToSwitchId) {
        return;
      }
      for (const calendar of this.calendars) {
        if (calendar && calendar.id === this.service.calendarToSwitchId) {
          this.switchCalendar = calendar;
        }
      }
    });

    if (this.service.calendarToSwitchId) {
      this.onCourseFullCapacitySwitchCalendar = true;
    } else {
      this.onCourseFullCapacitySwitchCalendar = false;
    }
    if (this.service.nameToSwitch) {
      this.onCourseFullCapacitySwitchName = true;
    } else {
      this.onCourseFullCapacitySwitchName = false;
    }

    if (this.service.colorToSwitch) {
      this.isColorToSwitch = true;
    } else {
      this.isColorToSwitch = false;
    }

  }

  public selectSwitchCalendar(calendar: Calendar) {
    this.switchCalendar = calendar;
    this.service.calendarToSwitchId = calendar.id;
  }

  public clearSwitchCalendar() {
    this.service.calendarToSwitchId = null;
    this.switchCalendar = new Calendar();
  }

  public getColorById(): EventColor {
    for (const color of this.colors) {
      if (this.service.colorToSwitch === color.id) {
        return color;
      }
    }
  }

}
