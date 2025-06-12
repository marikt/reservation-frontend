import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {NgbCollapse, NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MenuState} from '../menu-state';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {CustomerLabel} from '../../../model/customer-label';

@Component({
  selector: 'app-customer-dropdown',
  templateUrl: './customer-dropdown.component.html',
  styleUrls: ['./customer-dropdown.component.scss'],
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
    NgbCollapse
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
export class CustomerDropdownComponent implements OnInit {

  @Input('label')
  public label: string;

  @Input('labelTooltip')
  public labelTooltip: string;

  @Input('customerLabel')
  public customerLabel: CustomerLabel;

  @Input('customerLabels')
  public customerLabels: CustomerLabel[] = [];

  @Input('dropdownId')
  public dropdownId: string;

  @Input('inputId')
  public inputId: string;

  @Input('inputName')
  public inputName: string;

  @Input('readyToRefresh')
  public readyToRefresh: boolean = true;

  @Input('getLabelUrlFn')
  public getLabelUrlFn: () => string;

  @Output('selectLabelAction')
  public selectLabelAction: EventEmitter<CustomerLabel> = new EventEmitter();

  @Output('deleteLabelAction')
  public deleteLabelAction: EventEmitter<void> = new EventEmitter();

  @Output('deleteCacheAction')
  public deleteCacheAction: EventEmitter<void> = new EventEmitter();

  public menuCollapsed: boolean = true;

  constructor(
    public dashboardService: DashboardService,
    private alertService: AlertService,
    public translate: TranslateService,
    public preventDoubleClickService: PreventDoubleClickService,
    private http: HttpService
  ) {}

  public ngOnInit() {}

  public selectLabel(selectedLabel: CustomerLabel) {
    this.selectLabelAction.emit(selectedLabel);
  }

  public deleteLabel() {
    this.deleteLabelAction.emit();
  }

  public deleteCache() {
    this.deleteCacheAction.emit();
  }

  public get menuStateEnum(): typeof MenuState {
    return MenuState;
  }
}
