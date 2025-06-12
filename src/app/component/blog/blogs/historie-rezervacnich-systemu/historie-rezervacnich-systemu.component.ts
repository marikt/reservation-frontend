import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-historie-rezervacnich-systemu',
  templateUrl: './historie-rezervacnich-systemu.component.html',
  styleUrls: ['./historie-rezervacnich-systemu.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class HistorieRezervacnichSystemuComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setMetaData('Úvod do online rezervačních systémů: Historie a vývoj technologie');
  }

}
