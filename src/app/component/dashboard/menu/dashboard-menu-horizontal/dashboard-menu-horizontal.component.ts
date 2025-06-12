import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {Router, RouterLink} from '@angular/router';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {UserConfigService} from '../../../../service/user-config.service';
import {TodoItemService} from '../../../../service/todo-item.service';
import {NotadoWidgetUtil} from '../../../util/notado-widget-util';
import {PaymentPlan} from '../../../../util/payment-plan';
import {ModalService} from '../../../../../../projects/notado-lib/src/lib/service/modal.service';
import {MenuState} from '../../../util/menu-state';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgForOf, NgIf} from '@angular/common';
import {NgbCollapse, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {DashboardMenuAddItemComponent} from '../dashboard-menu-add-item/dashboard-menu-add-item.component';
import {FormsModule} from '@angular/forms';
import {SafeUrlPipe} from '../../../../pipe/safe-url.pipe';
import {AddHolidayModalComponent} from '../../module/add-holiday-modal/add-holiday-modal.component';
import {LineService} from '../../../../service/line.service';
import {WidgetType} from '../../button/dashboard-button-custom-web/dashboard-button-custom-web.component';
import {FormUrlPipe} from '../../../../../../projects/notado-lib/src/lib/pipe/form-url.pipe';

@Component({
  selector: 'app-dashboard-menu-horizontal',
  templateUrl: './dashboard-menu-horizontal.component.html',
  styleUrls: ['./dashboard-menu-horizontal.component.scss'],
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
  imports: [
    TranslateModule,
    RouterLink,
    NgForOf,
    NgbTooltip,
    NgIf,
    NgbCollapse,
    DashboardMenuAddItemComponent,
    FormsModule,
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownItem,
    FormUrlPipe,
    SafeUrlPipe,
    AddHolidayModalComponent,
    NgbDropdownToggle
  ],
  standalone: true
})
export class DashboardMenuHorizontalComponent implements OnInit {

  @ViewChild('ratingModal')
  public ratingModal: any;
  public showFrame: boolean;
  public addItemMenuCollapsed: boolean = true;

  constructor(public userService: UserService,
              public dashboardService: DashboardService,
              public router: Router,
              public languageService: LanguageService,
              public userConfigService: UserConfigService,
              public todoItemService: TodoItemService,
              public translate: TranslateService,
              public modalService: ModalService,
              public lineService: LineService,
  ) {
  }

  ngOnInit(): void {
  }

  public goToBusinessDetail(idx: number) {
    this.lineService.clean();
    this.dashboardService.switchBusiness(idx);
    this.router.navigate(['/dashboard/dashboard-landing']);
  }

  public computeFormSize(): string {
    return NotadoWidgetUtil.computeFormSize(1400, 'SMALL_FORM', WidgetType.POP_UP);
  }

  public computeCloseButtonPosition(): string {
    return NotadoWidgetUtil.computeCloseButtonPosition(1400, 'SMALL_FORM', WidgetType.POP_UP);
  }

  public get paymentPlan(): typeof PaymentPlan {
    return PaymentPlan;
  }

  public get menuStateEnum(): typeof MenuState {
    return MenuState;
  }

  public isDiscountApplicable() {
    if (this.todoItemService.todoItemWarnOrErrorNames.length > 0 ||
      this.dashboardService.payment.plan !== PaymentPlan.TRIAL) {
      return false;
    }
    const validity: Date = new Date(this.dashboardService.payment.validity);
    const today: Date = new Date();
    const seventyDaysLater: Date = new Date(today.setDate(today.getDate() + 75));
    return validity > seventyDaysLater;
  }

}
