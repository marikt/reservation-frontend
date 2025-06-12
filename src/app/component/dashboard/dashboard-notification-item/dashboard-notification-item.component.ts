import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Notification} from '../../../model/notification';
import {DashboardService} from '../../../service/dashboard.service';
import {TypeaheadService} from '../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {NotificationService} from '../../../service/notification.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NotificationStatus} from '../../../../../projects/notado-lib/src/lib/util/notification-status';
import {NotificationTypeEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-type-enum';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {FormsModule} from '@angular/forms';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-dashboard-notification-item',
  templateUrl: './dashboard-notification-item.component.html',
  styleUrls: ['./dashboard-notification-item.component.scss'],
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    FormsModule,
    TranslateModule,
    NgbTypeahead,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class DashboardNotificationItemComponent implements OnInit {

  private idx: number;
  public notification: Notification;
  public showValidation: boolean;
  public whiteSpace: number = 1.05;

  constructor(
    public typeaheadService: TypeaheadService,
    public dashboardService: DashboardService,
    public notificationService: NotificationService,
    public modalService: ModalService,
    private route: ActivatedRoute,
    public router: Router,
    public http: HttpService,
    public alertService: AlertService,
    public translate: TranslateService,
    public preventDoubleClickService: PreventDoubleClickService
  ) {
  }

  ngOnInit(): void {
    this.idx = this.route.snapshot.params.idx;
    this.notification = this.notificationService.notifications[this.idx];
  }

  public saveNotification(): void {
    this.preventDoubleClickService.preventFor();
    if (this.notification.id) {
      this.notificationService.updateNotification(
        this.notification,
        (notification: Notification) => {
          this.afterNotificationSave(notification);
          this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
        }
      );
    } else {
      this.notificationService.createNotification(
        this.dashboardService.business.id,
        this.notification,
        (notification: Notification) => {
          this.afterNotificationSave(notification);
        }
      );
    }
  }

  private afterNotificationSave(notification: Notification) {
    this.notificationService.notifications[this.idx] = notification;
    // this.alertService.addSuccess('Upozernění bylo úspěšně uloženo');
    this.router.navigate(['/dashboard/dashboard-notification']);
  }

  public deleteNotification(): void {
    if (this.idx < 0) {
      return;
    }
    this.http.delete(Api.NOTIFICATION + '/' + this.notification.id,
      () => {
        this.notificationService.notifications.splice(this.idx, 1);
        this.modalService.close();
        // this.alertService.addSuccess('Upozernění bylo úspěšně smazáno');
        this.router.navigate(['/dashboard/dashboard-notification']);
      });
  }

  public get notificationStatus(): typeof NotificationStatus {
    return NotificationStatus;
  }

  public get notificationType(): typeof NotificationTypeEnum {
    return NotificationTypeEnum;
  }

  public recipientLength(notification: Notification) {
    const length = notification.recipientString ? notification.recipientString.length : this.translate.instant('NOTIFICATION.PLACEHOLDER.WHO').length;
    return length;
  }
}
