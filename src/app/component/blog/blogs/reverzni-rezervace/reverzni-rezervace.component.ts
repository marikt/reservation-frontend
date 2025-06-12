import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-reverzni-rezervace',
  templateUrl: './reverzni-rezervace.component.html',
  styleUrls: ['./reverzni-rezervace.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class ReverzniRezervaceComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Revoluční online rezervační systém: Představení reverzní rezervace!', 'Objevte průlomový přístup k online rezervacím. Představujeme reverzní rezervaci, jedinečnou metodu, která nemá na trhu obdoby.');
  }

}
