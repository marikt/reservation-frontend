import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../service/meta.service';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {DemoService} from '../../../service/demo.service';
import {RouterLink} from '@angular/router';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';
import {IntroItemComponent} from '../intro-item/intro-item.component';
import {TryButtonComponent} from '../try-button/try-button.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-online-reservation',
  templateUrl: './online-reservation.component.html',
  styleUrls: ['./online-reservation.component.scss'],
  imports: [
    TranslateModule,
    RouterLink,
    IntroItemRevertComponent,
    IntroItemComponent,
    TryButtonComponent,
    NgIf
  ],
  standalone: true
})
export class OnlineReservationComponent implements OnInit, SetMeta {


  constructor(public metaService: MetaService,
              public translate: TranslateService,
              public demoService: DemoService,
              public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.FORM_ADJUSTMENT');
  }
}
