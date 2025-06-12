import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-pro-koho-jsou-rezervacni-systemy',
  templateUrl: './pro-koho-jsou-rezervacni-systemy.component.html',
  styleUrls: ['./pro-koho-jsou-rezervacni-systemy.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class ProKohoJsouRezervacniSystemyComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Pro koho jsou určeny rezervační systémy? Průvodce pro každý obor', 'Rezervační systémy se staly nedílnou součástí různých odvětví. Ponořte se do odvětví, kde jsou tyto systémy nejvíce využívány, a pochopit jejich význam.');

  }

}
