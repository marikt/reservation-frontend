import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-notado-integrace-blog',
  templateUrl: './notado-integrace-blog.component.html',
  styleUrls: ['./notado-integrace-blog.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class NotadoIntegraceBlogComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Integrace s Notadem: Výhody a Flexibilita', 'Maximalizujte efektivitu týmu s integrací Slack a Notado. Objevte, jak toto spojení může okamžitě informovat váš tým o nových nebo nadcházejících rezervacích.');

  }

}
