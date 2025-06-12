import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {NotificationTypeEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-type-enum';
import {Notification} from '../../../model/notification';
import {NotificationRecipientEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-recipient-enum';
import {NotificationWhenEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-when-enum';
import {TypeaheadService} from '../../../../../projects/notado-lib/src/lib/service/typeahead.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../../../service/notification.service';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {Event} from '../../../../../projects/notado-lib/src/lib/util/event.enum';
import Typewriter from 't-writer.js'
import {NgIf} from '@angular/common';
import {WhatWeKnowListItemComponent} from '../what-we-know-list-item/what-we-know-list-item.component';
import {TryButtonComponent} from '../try-button/try-button.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    WhatWeKnowListItemComponent,
    TryButtonComponent
  ],
  standalone: true
})

export class NotificationComponent extends MySubscribable implements OnInit {
  start: boolean = false
  public whiteSpace: number = 1.09;

  constructor(public languageService: LanguageService,
              public typeaheadService: TypeaheadService,
              public translate: TranslateService,
              public notificationService: NotificationService,
              public broadcastService: BroadcastService) {
    super(broadcastService);
    this.subscribe(Event.LANGUAGE_SWITCH, () => {
      this.typeaheadService.reset(); // translate typeahead
    });
  }

  public notification: Notification;

  ngOnInit(): void {

    const target1 = document.querySelector('.tw1')
    const target2 = document.querySelector('.tw2')
    const target3 = document.querySelector('.tw3')
    const writerTarget = new Typewriter(target1, {typeSpeed: 90});
    const writerType = new Typewriter(target2, {typeSpeed: 90});
    const writerWhen = new Typewriter(target3, {typeSpeed: 90});

    let send: string;
    this.translate.get('NOTIFICATION.SEND').subscribe((s: string) => send = s);
    let customer: string;
    this.translate.get('NOTIFICATION.' + NotificationRecipientEnum.CUSTOMER).subscribe((c: string) => customer = c);
    let worker: string;
    this.translate.get('NOTIFICATION.' + NotificationRecipientEnum.EMPLOYEE).subscribe((w: string) => worker = w);
    let sms: string;
    this.translate.get('NOTIFICATION.' + NotificationTypeEnum.SMS).subscribe((s: string) => sms = s);
    let email: string;
    this.translate.get('NOTIFICATION.' + NotificationTypeEnum.EMAIL).subscribe((e: string) => email = e);
    let slack: string;
    this.translate.get('NOTIFICATION.' + NotificationTypeEnum.SLACK).subscribe((s: string) => slack = s);
    let now: string;
    this.translate.get('NOTIFICATION.' + NotificationWhenEnum.ON_RESERVATION_CREATE).subscribe((n: string) => now = n);
    let dayAfter: string;
    this.translate.get('NOTIFICATION.' + NotificationWhenEnum.ONE_DAY_AFTER).subscribe((d: string) => dayAfter = d);
    let day: string;
    this.translate.get('NOTIFICATION.' + NotificationWhenEnum.ONE_DAY_BEFORE).subscribe((d: string) => day = d);
    let day2: string;
    this.translate.get('NOTIFICATION.' + NotificationWhenEnum.TWO_DAYS_BEFORE).subscribe((d: string) => day2 = d);
    let five_hours: string;
    this.translate.get('NOTIFICATION.' + NotificationWhenEnum.FIVE_HOURS_BEFORE).subscribe((f: string) => five_hours = f);

    writerTarget
      .type(worker + ' ')
      .rest(1000)
      .clear()
      .type(customer + ' ')
      .rest(1000)
      .removeCursor()
      .then(writerType.start.bind(writerType))
      .start();

    writerType
      .changeTypeColor('blue')
      .rest(1000)
      .type(email + ' ')
      .rest(1000)
      .clear()
      .type(slack + ' ')
      .rest(1000)
      .clear()
      .type(sms + ' ')
      .rest(1000)
      .removeCursor()
      .then(writerWhen.start.bind(writerWhen));

    writerWhen
      .changeTypeColor('green')
      .rest(1000)
      .type(five_hours + ' ')
      .rest(1000)
      .clear()
      .type(day + ' ')
      .rest(1000)
      .clear()
      .type(day2 + ' ')
      .rest(1000)
      .clear()
      .type(now + ' ')
      .rest(1000)
      .clear()
      .type(dayAfter + ' ')
      .rest(1000)
      .removeCursor()
      .then(writerTarget.start.bind(writerTarget));
  }


  public get notificationType(): typeof NotificationTypeEnum {
    return NotificationTypeEnum;
  }

  public getRandomInt(max): number {
    return Math.floor(Math.random() * max);
  }

}

export enum NotificationAnimationState {
  SHOW = 'SHOW',
  HIDE = 'HIDE'
}

