import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {FAQItemForBlog, ReadMoreItem} from '../../blog-template/blog-template.component';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-rozhovor-s-fotografem',
  templateUrl: './rozhovor-s-fotografem.component.html',
  styleUrls: ['./rozhovor-s-fotografem.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class RozhovorSFotografemComponent implements OnInit, SetMeta {

  public readMore: ReadMoreItem[] = [];
  public faq: FAQItemForBlog[] = [];

  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();


    this.readMore.push(new ReadMoreItem('Rezervační systém pro fotografy: Proč je nezbytný pro moderní fotografický podnik?', 'rezervacni-system-pro-fotografy'));
    this.readMore.push(new ReadMoreItem('Jak vybrat nejlepší rezervační systém pro rok 2023?', 'price'));
    this.readMore.push(new ReadMoreItem('Rozhovor s majitelkou masážního salonu: Jak online rezervační systém zvýšil moje zakázky o 40%', 'masaz-story'));
    this.readMore.push(new ReadMoreItem('Spravujte své zákazníky jako nikdy předtím s integrací Notado a Google Kontaktů', 'sprava-zakazniku'));
    this.readMore.push(new ReadMoreItem('Pro koho jsou určeny rezervační systémy? Průvodce pro každý obor', 'pro-koho-jsou-rezervacni-systemy'));
    this.readMore.push(new ReadMoreItem('Výhody a nevýhody používání online rezervačního systému', 'advantages-and-disadvantages'));
    this.readMore.push(new ReadMoreItem('Klíčové funkce skvělého online rezervačního systému', 'key-features'));

  }

  setMeta(): void {
    this.metaService.setCsMetaData('Inovativní Rezervační Systém Notado: Úspěch ve Fotografii', 'Poznejte příběh majitele fotoateliéru a dozvíte se, jak rezervační systém Notado může optimalizovat a automatizovat váš podnikatelský proces, od konfigurovatelných rezervačních formulářů až po efektivní správu kalendáře.');
  }

}
