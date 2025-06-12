import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-advantages-and-disadvantages',
  templateUrl: './advantages-and-disadvantages.component.html',
  styleUrls: ['./advantages-and-disadvantages.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class AdvantagesAndDisadvantagesComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Výhody online rezervačního kalendáře pro vaše podnikání', 'Online rezervační kalendář může přinést mnoho výhod pro vaše podnikání. Zjistěte, jak může zvýšit efektivitu, zákaznickou spokojenost a zvýšit vaše příjmy.');

  }

}
