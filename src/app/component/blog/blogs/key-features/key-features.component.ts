import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-key-features',
  templateUrl: './key-features.component.html',
  styleUrls: ['./key-features.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class KeyFeaturesComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Klíčové funkce skvělého online rezervačního systému | Notado Blog', 'Žijeme v digitálním světě, kde je pohodlí na dosah ruky. Informace máme doslova v dlani, existuje aplikace téměř pro vše a rezervace čehokoli - od letů po hotely, od kurzů po tábory - vše lze provést stiskem tlačítka. Dnes přibližně 83% dospělých v USA říká, že preferují rezervaci svých výletů a cest prostřednictvím online rezervačních systémů.');

  }

}
