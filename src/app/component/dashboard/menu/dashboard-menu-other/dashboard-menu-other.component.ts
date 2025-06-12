import {Component, OnInit} from '@angular/core';
import {UserConfigService} from '../../../../service/user-config.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-menu-other',
  templateUrl: './dashboard-menu-other.component.html',
  styleUrls: ['./dashboard-menu-other.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class DashboardMenuOtherComponent implements OnInit {

  constructor(public userConfigService: UserConfigService,
              public dashboardService: DashboardService) {
  }

  ngOnInit(): void {
  }

}
