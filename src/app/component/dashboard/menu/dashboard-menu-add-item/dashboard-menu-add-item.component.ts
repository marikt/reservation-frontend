import {Component, OnInit} from '@angular/core';
import {UserConfigService} from '../../../../service/user-config.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-dashboard-menu-add-item',
  templateUrl: './dashboard-menu-add-item.component.html',
  styleUrls: ['./dashboard-menu-add-item.component.scss'],
  imports: [
    TranslateModule,
    RouterLink
  ],
  standalone: true
})
export class DashboardMenuAddItemComponent implements OnInit {

  constructor(public userConfigService: UserConfigService) { }

  ngOnInit(): void {
  }

}
