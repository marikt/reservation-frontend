import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../../../projects/notado-lib/src/lib/service/language.service';
import {SetMeta} from '../../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../../service/meta.service';
import {VideoTutorialComponent} from '../../../../video-tutorial/video-tutorial.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-faq-intro',
  templateUrl: './faq-intro.component.html',
  styleUrls: ['../../../faq.component.scss'],
  imports: [
    VideoTutorialComponent,
    TranslateModule
  ],
  standalone: true
})
export class FaqIntroComponent implements OnInit, SetMeta {

    constructor(public languageService: LanguageService,
                private metaService: MetaService) {
    }

    ngOnInit() {
      this.setMeta();
    }

  public setMeta(): void {
    this.metaService.setMetaData('META.INTRO');
  }

}
