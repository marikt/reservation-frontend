import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {DashboardService} from '../../../../service/dashboard.service';
import {Router} from '@angular/router';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {FormService} from '../../../../../../projects/notado-lib/src/lib/service/form.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-dashboard-menu-horizontal-mobile',
    templateUrl: './dashboard-menu-horizontal-mobile.component.html',
    styleUrls: ['./dashboard-menu-horizontal-mobile.component.scss'],
    standalone: true
})
export class DashboardMenuHorizontalMobileComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
