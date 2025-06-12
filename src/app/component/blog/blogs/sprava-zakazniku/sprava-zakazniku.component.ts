import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-sprava-zakazniku',
  templateUrl: './sprava-zakazniku.component.html',
  styleUrls: ['./sprava-zakazniku.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class SpravaZakaznikuComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Spravujte své zákazníky s integrací Notado a Google Kontaktů', 'Revoluční správa klientů s integrací Notado a Google Kontaktů. Zažijte automatické ukládání klientů, sledování návštěv a pochopení preferencí klientů.');

  }

}
