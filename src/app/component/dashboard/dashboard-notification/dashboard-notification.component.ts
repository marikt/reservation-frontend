import {Component, OnInit} from '@angular/core';
import {Notification} from '../../../model/notification';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Router, RouterLink} from '@angular/router';
import {NotificationService} from '../../../service/notification.service';
import {NotificationTypeEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-type-enum';
import {NotificationStatus} from '../../../../../projects/notado-lib/src/lib/util/notification-status';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgForOf, NgIf} from '@angular/common';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-notification',
  templateUrl: './dashboard-notification.component.html',
  styleUrls: ['./dashboard-notification.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule,
    RouterLink,
    NgForOf,
    NgIf,
    NgbTooltip
  ],
  standalone: true
})
export class DashboardNotificationComponent implements OnInit {

  constructor(public http: HttpService,
              public router: Router,
              public notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.notificationService.loadNotifications();
  }

  public addNotification(): void {
    const notification: Notification = new Notification();
    this.notificationService.notifications.push(notification);
    this.router.navigate(['/dashboard/dashboard-notification-item', this.notificationService.notifications.length - 1]);
  }

  public get notificationType(): typeof NotificationTypeEnum {
    return NotificationTypeEnum;
  }

  public get notificationStatus(): typeof NotificationStatus {
    return NotificationStatus;
  }

}
