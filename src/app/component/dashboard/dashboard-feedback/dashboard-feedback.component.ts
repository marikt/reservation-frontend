import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-feedback',
  templateUrl: './dashboard-feedback.component.html',
  styleUrls: ['./dashboard-feedback.component.scss'],
  imports: [
    DashboardCardLabelComponent,
    DashboardCardComponent,
    TranslateModule
  ],
  standalone: true
})
export class DashboardFeedbackComponent implements OnInit {

  constructor(public http: HttpService,
              public userService: UserService) {
  }

  ngOnInit(): void {
  }

}
