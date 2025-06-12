import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-keyguru',
  templateUrl: './keyguru-blog.component.html',
  styleUrls: ['./keyguru-blog.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class KeyguruBlogComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Efektivní Rezervační Kalendář Pro Váše Podnikání', 'Poznejte, jak Notado inovativně zjednodušuje rezervace pomocí integrace Google Kalendáře, flexibilní přizpůsobitelnosti a uživatelsky přívětivého designu. Začněte nyní a zlepšete efektivitu vašeho podnikání.');

  }

}
