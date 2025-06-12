import {Component, OnInit} from '@angular/core';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-admin-cache',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    NgForOf,
    JsonPipe,
    NgIf,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule
  ],
  standalone: true
})
export class AdminLogComponent implements OnInit {

  public logs: string[] = [];
  public selectedLog: string;
  public logText: string;

  constructor(
    public http: HttpService
  ) {
  }

  ngOnInit() {
    this.loadLogs();
  }

  public loadLogs() {
    this.http.get(Api.LOG + '/list',
      (logs) => {
        this.logs = logs;
      });
  }

  public downloadLog() {
    this.http.getBlob(Api.LOG + '/' + this.selectedLog, () => {
    }, this.selectedLog);
  }
}
