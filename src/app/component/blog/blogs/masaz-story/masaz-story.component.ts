import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-masaz-story',
  templateUrl: './masaz-story.component.html',
  styleUrls: ['./masaz-story.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class MasazStoryComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Rozhovor s majitelkou masážního salonu: Jak online rezervační systém zvýšil moje zakázky o 40%', 'Objevte transformační sílu online rezervačního systému pro maséry. Zjistěte, jak zvýšil objednávky o 40% pro majitelku masážního salonu.');

  }

}
