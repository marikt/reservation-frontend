import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../../../projects/notado-lib/src/lib/service/language.service';
import {SetMeta} from '../../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../../service/meta.service';
import {FaqTemplateComponent} from '../faq-template/faq-template.component';

@Component({
  selector: 'app-faq-notification-from-own-email',
  templateUrl: './faq-notification-from-own-email.component.html',
  styleUrls: ['../../../faq.component.scss'],
  imports: [
    FaqTemplateComponent
  ],
  standalone: true
})
export class FaqNotificationFromOwnEmailComponent implements OnInit, SetMeta {

  constructor(public languageService: LanguageService,
              private metaService: MetaService) {
  }

  ngOnInit() {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.NOTIFICATION_FROM_OWN_EMAIL');
  }

}
