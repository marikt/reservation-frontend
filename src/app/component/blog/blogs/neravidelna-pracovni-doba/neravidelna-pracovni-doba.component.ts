import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {SafeUrlPipe} from '../../../../pipe/safe-url.pipe';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-price',
  templateUrl: './neravidelna-pracovni-doba.component.html',
  styleUrls: ['./neravidelna-pracovni-doba.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    SafeUrlPipe,
    TranslateModule
  ],
  standalone: true
})
export class NeravidelnaPracovniDobaComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Malý Podnik, Velká Flexibilita: Jak Nastavit Nepravidelné Pracovní Hodiny', 'Odkryjte, jak nastavit flexibilní pracovní hodiny ve vašem malém podniku. Zjistěte, jak využít Google Kalendář pro plánování mimořádných přesčasů a volna. Získejte kontrolu nad vaším časem a udržte tým spokojený.');
  }

}
