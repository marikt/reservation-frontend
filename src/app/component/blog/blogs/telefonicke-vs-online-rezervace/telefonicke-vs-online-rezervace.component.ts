import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-telefonicke-vs-online-rezervace',
  templateUrl: './telefonicke-vs-online-rezervace.component.html',
  styleUrls: ['./telefonicke-vs-online-rezervace.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class TelefonickeVsOnlineRezervaceComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Telefonické vs Online Rezervace: Změna hry v různých odvětvích', 'Ponořte se do revoluce rezervačních služeb, kdy svět přechází od telefonních hovorů k online rezervačním systémům. Rozumějte skutečnému rozdílu mezi těmito dvěma metodami v různých odvětvích.');

  }

}
