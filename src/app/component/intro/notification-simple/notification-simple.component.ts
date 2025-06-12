import {Component, OnInit, ViewChild} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {NotificationTypeEnum} from '../../../../../projects/notado-lib/src/lib/util/notification-type-enum';
import {Notification} from '../../../model/notification';
import {TranslateService} from '@ngx-translate/core';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {NgModel} from '@angular/forms';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';
import {SafeUrlPipe} from '../../../pipe/safe-url.pipe';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-notification-simple',
  templateUrl: './notification-simple.component.html',
  styleUrls: ['./notification-simple.component.scss'],
  standalone: true,
  imports: [
    IntroItemRevertComponent,
    SafeUrlPipe,
    NgIf
  ]
})
export class NotificationSimpleComponent extends MySubscribable implements OnInit {

  @ViewChild('videoModal')
  public videoModal: NgModel;

  public youtubeLoad: boolean = false;

  constructor(public languageService: LanguageService,
              public translate: TranslateService,
              public modalService: ModalService,
              public broadcastService: BroadcastService) {
    super(broadcastService);
  }

  public notifications: NotificationForIntro[] = [];

  ngOnInit(): void {

  }

  public get notificationType(): typeof NotificationTypeEnum {
    return NotificationTypeEnum;
  }

  public showModelWithVideo() {
    this.modalService.open(this.videoModal, {size: 'lg'});
    this.youtubeLoad = true;
  }
}

export class NotificationForIntro extends Notification {

}
