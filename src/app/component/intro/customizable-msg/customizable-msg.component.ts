import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../service/meta.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {DemoService} from '../../../service/demo.service';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';
import {IntroItemComponent} from '../intro-item/intro-item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'customizable-msg',
  templateUrl: './customizable-msg.component.html',
  styleUrls: ['./customizable-msg.component.scss'],
  imports: [
    IntroItemRevertComponent,
    TranslateModule,
    IntroItemComponent,
    NgForOf
  ],
  standalone: true
})
export class CustomizableMsgComponent implements OnInit, SetMeta {

  constructor(public metaService: MetaService,
              public translate: TranslateService,
              public demoService: DemoService,
              public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.CUSTOM_MSG');
  }
}

