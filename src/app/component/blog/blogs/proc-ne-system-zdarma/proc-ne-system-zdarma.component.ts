import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-proc-ne-system-zdarma',
  templateUrl: './proc-ne-system-zdarma.component.html',
  styleUrls: ['./proc-ne-system-zdarma.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class ProcNeSystemZdarmaComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Zdarma neznamená lepší: Příběh mého boje s online rezervačním systémem pro kadeřnictví! | Notado Blog', 'Zjistěte, proč volba bezplatného rezervačního systému může být nákladná. Přečtěte si příběh o tom, jak se jedna kadeřnice dostala do pasti s online rezervačními systémy zdarma a jak našla to pravé řešení.');
  }

}
