import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DashboardService} from '../../../service/dashboard.service';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {NotificationMsg} from '../../../model/notification-msg';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {NotificationTypeEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-type-enum';
import {NotificationRecipientEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-recipient-enum';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NotificationWhenEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-when-enum';
import {PreventDoubleClickService} from '../../../../../projects/notado-lib/src/lib/service/prevent-double-click.service';
import {DashboardCardComponent} from '../../../template/dashboard-card/dashboard-card.component';
import {DashboardCardLabelComponent} from '../../../template/dashboard-card-label/dashboard-card-label.component';
import {FormsModule} from '@angular/forms';
import {IntPipe} from '../../pipe/int-pipe';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {VideoTutorialComponent} from '../../video-tutorial/video-tutorial.component';
import {VideoGuideComponent} from '../../video-guide/video-guide.component';
import {NgIf} from '@angular/common';
import {KeywordHighlighterComponent} from '../../util/keyword-highlighter/keyword-highlighter.component';

@Component({
  selector: 'app-dashboard-message',
  templateUrl: './dashboard-message.component.html',
  styleUrls: ['./dashboard-message.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    DashboardCardComponent,
    DashboardCardLabelComponent,
    TranslateModule,
    FormsModule,
    IntPipe,
    NgbTooltip,
    VideoTutorialComponent,
    VideoGuideComponent,
    NgIf,
    KeywordHighlighterComponent
  ],
  standalone: true
})
export class DashboardMessageComponent implements OnInit {

  public SMS_SIZE: number = 160;

  private tagsTemplate: string[] = [];

  public messages: Map<NotificationWhenEnum, MsgPair> = new Map<NotificationWhenEnum, MsgPair>()

  public when: NotificationWhenEnum;

  constructor(
    public dashboardService: DashboardService,
    public alertService: AlertService,
    public translate: TranslateService,
    private http: HttpService,
    public preventDoubleClickService: PreventDoubleClickService
  ) {
  }

  ngOnInit(): void {
    this.loadMsgs();
  }

  private loadMsgs(): void {
    this.loadMsgsPair(NotificationWhenEnum.TWO_DAYS_BEFORE);
    this.loadMsgsPair(NotificationWhenEnum.ONE_DAY_BEFORE);
    this.loadMsgsPair(NotificationWhenEnum.ONE_DAY_AFTER);
    this.loadMsgsPair(NotificationWhenEnum.FIVE_HOURS_BEFORE);
    this.loadMsgsPair(NotificationWhenEnum.ON_RESERVATION_CREATE);
  }

  private loadMsgsPair(when: NotificationWhenEnum): void {
    const msgPair: MsgPair = new MsgPair();
    this.when = when;
    this.messages.set(this.when, msgPair);
    this.loadMsg(NotificationTypeEnum.SMS, (objectMsg: NotificationMsg) => msgPair.smsMsg = objectMsg);
    this.loadMsg(NotificationTypeEnum.EMAIL, (objectMsg: NotificationMsg) => msgPair.emailMsg = objectMsg);
  }

  public saveMsg() {
    this.preventDoubleClickService.preventFor();
    const emailMsgTmp = new NotificationMsg();
    const emailMsg = this.messages.get(this.when).emailMsg;
    emailMsgTmp.msg = emailMsg.msg.replace(/\n/g, '<br>');
    emailMsgTmp.recipient = emailMsg.recipient;
    emailMsgTmp.type = emailMsg.type;
    emailMsgTmp.when = this.when;
    this.http.put(Api.NOTIFICATION_MSG + '/' + this.dashboardService.business.id, emailMsgTmp, () => {
      this.loadMsg(NotificationTypeEnum.EMAIL, (objectMsg: NotificationMsg) => this.messages.get(this.when).emailMsg = objectMsg);
      this.alertService.addInfo(this.translate.instant('ALERT.SAVED'));
    });

    const smsMsgTmp = new NotificationMsg();
    const smsMsg = this.messages.get(this.when).smsMsg;
    smsMsgTmp.msg = smsMsg.msg;
    smsMsgTmp.type = smsMsg.type;
    smsMsgTmp.recipient = smsMsg.recipient;
    smsMsgTmp.when = this.when;
    this.http.put(Api.NOTIFICATION_MSG + '/' + this.dashboardService.business.id, smsMsgTmp, () => {
      this.loadMsg(NotificationTypeEnum.SMS, (objectMsg: NotificationMsg) => this.messages.get(this.when).smsMsg = objectMsg);
    });
  }

  private loadMsg(type: NotificationTypeEnum, callback?: (data?: any) => void): void {
    this.http.get(
      Api.NOTIFICATION_MSG + '/' + this.dashboardService.business.id + '/' + type + '/' + this.when + '/' + NotificationRecipientEnum.CUSTOMER,
      (objectMsg: NotificationMsg) => {
        if (!objectMsg.msg) {
          objectMsg.msg = '';
        }
        if (type === NotificationTypeEnum.EMAIL) {
          objectMsg.msg = objectMsg.msg.replace(/<br\s*\/?>/mg, '\n');
        }
        objectMsg.msg = objectMsg.msg.replace('#business', this.dashboardService.business.url);
        callback(objectMsg);

      }, () => {
        const newObjectMsg: NotificationMsg = new NotificationMsg();
        if (type === NotificationTypeEnum.SMS) {
          newObjectMsg.msg = this.translate.instant('SMS_TO_CUSTOMER');
        } else if (type === NotificationTypeEnum.EMAIL) {
          newObjectMsg.msg = this.translate.instant('EMAIL_TO_CUSTOMER');
        }
        newObjectMsg.type = type;
        newObjectMsg.when = this.when;
        newObjectMsg.recipient = NotificationRecipientEnum.CUSTOMER;
        this.http.post(Api.NOTIFICATION_MSG + '/' + this.dashboardService.business.id, newObjectMsg, (objectMsg: NotificationMsg) => {
          callback(objectMsg);
        });
      });
  }

  public get notificationWhen(): typeof NotificationWhenEnum {
    return NotificationWhenEnum;
  }

}

export class MsgPair {
  public smsMsg: NotificationMsg;
  public emailMsg: NotificationMsg;
}
