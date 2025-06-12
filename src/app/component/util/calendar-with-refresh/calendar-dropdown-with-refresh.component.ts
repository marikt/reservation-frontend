import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Calendar} from '../../../../../projects/notado-lib/src/lib/model/calendar';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {
  NgbCollapse,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbPopover,
  NgbTooltip
} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {
  GoToGoogleCalendarSettingPopupComponent
} from '../go-to-google-calendar-setting-popup/go-to-google-calendar-setting-popup.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {DashboardMenuAddItemComponent} from '../../dashboard/menu/dashboard-menu-add-item/dashboard-menu-add-item.component';
import {MenuState} from '../menu-state';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';

@Component({
  selector: 'app-calendar-dropdown-with-refresh',
  templateUrl: './calendar-dropdown-with-refresh.component.html',
  styleUrls: ['./calendar-dropdown-with-refresh.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    NgbTooltip,
    FormsModule,
    NgbDropdownToggle,
    NgbDropdown,
    NgbDropdownMenu,
    NgForOf,
    NgbDropdownItem,
    NgbPopover,
    GoToGoogleCalendarSettingPopupComponent,
    NgbCollapse,
    DashboardMenuAddItemComponent
  ],
  animations: [
    trigger('popupMenu', [
      state('OPEN', style({
        opacity: 1
      })),
      state('CLOSE', style({
        opacity: 0
      })),
      transition('OPEN => CLOSE', [
        animate('0.2s')
      ]),
      transition('CLOSE => OPEN', [
        animate('0.2s')
      ]),
    ]),
  ],
  standalone: true
})
export class CalendarDropdownWithRefreshComponent implements OnInit {

  @Input('label')
  public label: string;

  @Input('labelTooltip')
  public labelTooltip: string;

  @Input('calendar')
  public calendar: Calendar;

  @Input('calendars')
  public calendars: Calendar[] = [];

  @Input('hideRefreshButtons')
  public hideRefreshButtons: boolean;

  @Input('deletable')
  public deletable: boolean = false;

  @Input('hideExternalRefreshButtons')
  public hideExternalRefreshButtons: boolean;

  @Output('selectCalendarAction')
  public selectCalendarAction: EventEmitter<any> = new EventEmitter();

  @Output('reloadCalendarsAction')
  public reloadCalendarsAction: EventEmitter<any> = new EventEmitter();

  @Output('deleteCalendarsAction')
  public deleteCalendarsAction: EventEmitter<any> = new EventEmitter();

  public addItemMenuCollapsed: boolean = true;

  constructor(public dashboardService: DashboardService,
              private alertService: AlertService,
              public translate: TranslateService,
              public modalService: ModalService,
              public preventDoubleClickService: PreventDoubleClickService,
              private http: HttpService) {
  }

  public ngOnInit() {
  }

  public deleteCache(calendarId: string) {
    this.preventDoubleClickService.preventFor(5);
    console.log('refresh cache');
    this.http.post(Api.CACHE + '/clear-calendar/' + this.dashboardService.business.id,
      {id: calendarId}, () => {
        this.reloadCalendarsAction.emit();
        this.alertService.addInfo(this.translate.instant('ALERT.CACHE_DELETED'));
      });
  }

  public get menuStateEnum(): typeof MenuState {
    return MenuState;
  }

}
