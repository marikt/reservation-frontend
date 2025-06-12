import {Component, OnInit} from '@angular/core';
import {UserConfigService} from '../../../../service/user-config.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-menu-business',
  templateUrl: './dashboard-menu-business.component.html',
  styleUrls: ['./dashboard-menu-business.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    NgIf
  ],
  standalone: true
})
export class DashboardMenuBusinessComponent implements OnInit {

  constructor(public userConfigService: UserConfigService) { }

  ngOnInit(): void {
  }

}
