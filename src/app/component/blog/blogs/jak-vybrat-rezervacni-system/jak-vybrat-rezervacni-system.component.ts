import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-jak-vybrat-rezervacni-system',
  templateUrl: './jak-vybrat-rezervacni-system.component.html',
  styleUrls: ['./jak-vybrat-rezervacni-system.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class JakVybratRezervacniSystemComponent implements OnInit, SetMeta {


  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Jak vybrat online rezervační systém | Notado Blog', 'Spotřebitelé očekávají, že podniky budou poskytovat zážitky na více kanálech, aby mohli interagovat prostřednictvím webových, mobilních a sociálních médií. Toto může zahrnovat rezervaci schůzek, která se přesunula od tradičních telefonních systémů, zejména u mladších spotřebitelů.');
  }

}
