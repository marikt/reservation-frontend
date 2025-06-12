import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
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
import {DashboardMenuAddItemComponent} from '../../dashboard/menu/dashboard-menu-add-item/dashboard-menu-add-item.component';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {IntegrationData} from '../../../model/integration/integration-data';
import {IntegrationType} from '../../../../../projects/notado-lib/src/lib/util/integration-type';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {RouterLink} from '@angular/router';
import {LoadingProgressComponent} from '../../dashboard/loading-progress/loading-progress.component';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {VideoGuideComponent} from '../../video-guide/video-guide.component';
import {KeyguruDrawer} from '../../../../../projects/notado-lib/src/lib/model/keyguru-drawer';

@Component({
  selector: 'app-keyguru-drawer-dropdown',
  templateUrl: './keyguru-drawer-dropdown.component.html',
  styleUrls: ['./keyguru-drawer-dropdown.component.scss'],
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
    DashboardMenuAddItemComponent,
    RouterLink,
    LoadingProgressComponent,
    VideoTutorialComponent,
    VideoGuideComponent,
    JsonPipe
  ],
  standalone: true
})
export class KeyguruDrawerDropdownComponent implements OnInit {

  @Input('label')
  public label: string;

  @Input('drawerId')
  public drawerId: string;

  @Output('selectDrawerAction')
  public selectDrawerAction: EventEmitter<any> = new EventEmitter();

  @Output('loadDrawerAction')
  public loadDrawerAction: EventEmitter<any> = new EventEmitter();

  @Input('showValidation')
  public showValidation: boolean;

  public drawerName: string;
  public integrationData: IntegrationData;
  public keyguruDrawers: KeyguruDrawer[];

  constructor(public dashboardService: DashboardService,
              public translate: TranslateService,
              public spinnerService: SpinnerService,
              public modalService: ModalService,
              public preventDoubleClickService: PreventDoubleClickService,
              private http: HttpService) {
  }

  public ngOnInit() {
    this.spinnerService.startProgress(2_000);
    this.http.get(Api.INTEGRATION_CONFIG + '/' + this.dashboardService.business.id + '/' + IntegrationType.KEYGURU,
      (integrationData: IntegrationData) => {
        this.integrationData = integrationData;
        if (!integrationData.connected) {
          return;
        }
        this.loadDrawers();
      }
    );
  }

  public loadDrawers() {
    this.http.get(Api.KEYGURU + '/' + this.dashboardService.business.id + '/drawer', (keyguruDrawers: KeyguruDrawer[]) => {
      this.keyguruDrawers = keyguruDrawers;
      this.loadDrawerAction.emit(keyguruDrawers);
      for (const keyguruDrawer of keyguruDrawers) {
        if (keyguruDrawer.id === this.drawerId) {
          this.drawerName = keyguruDrawer.name
          return;
        }
      }
    });
  }

  public setName(keyguruDrawer: KeyguruDrawer) {
    this.drawerName = keyguruDrawer.name
  }
}
