import {Component, OnInit} from '@angular/core';
import {MetaService} from '../../../../service/meta.service';
import {RouterLink} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {HttpService} from '../../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../../projects/notado-lib/src/lib/enum/api';
import {DashboardService} from '../../../../service/dashboard.service';

@Component({
  selector: 'app-dashboard-button-platform',
  templateUrl: './dashboard-button-platform.component.html',
  styleUrls: ['./dashboard-button-platform.component.scss'],
  imports: [
    RouterLink,
    TranslateModule
  ],
  standalone: true
})
export class DashboardButtonPlatformComponent implements OnInit {

  constructor(public http: HttpService,
              public dashboardService: DashboardService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.http.get(Api.TODO_ITEM + '/' + this.dashboardService.business.id + '/add-button-done');
    }, 5000);
  }


}
