import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-jakub-story',
  templateUrl: './jakub-story.component.html',
  styleUrls: ['./jakub-story.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class JakubStoryComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Rozhovor s Jakubem: Modernizace autoservisu v digitální době | Notado Blog', 'Jakub sdílí svůj příběh o tom, jak hledal způsob, jak zefektivnit svůj autoservis. Od komunikace se zákazníky, přes online notifikace, až po konfigurovatelný rezervační formulář. Přečtěte si, jak moderní řešení mohou transformovat tradiční podnikání.');

  }

}
