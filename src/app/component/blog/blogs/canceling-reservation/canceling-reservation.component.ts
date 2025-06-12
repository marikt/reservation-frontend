import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-canceling-reservation',
  templateUrl: './canceling-reservation.component.html',
  styleUrls: ['./canceling-reservation.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class CancelingReservationComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Jak zabránit rušení rezervací: Rozhovor s majitelkou masážního salonu',
      'Zjistěte, jak masážní salon snížil rušení rezervací na poslední chvíli pomocí efektivního rezervačního systému. Přinášíme rozhovor s majitelkou o klíčových strategiích, jako jsou notifikace, poplatky za rezervaci a zpětná vazba od klientů.');

  }

}
