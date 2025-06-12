import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {BlogTemplateComponent, FAQItemForBlog, ReadMoreItem} from '../../blog-template/blog-template.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-co-je-online-rezervacni-system',
  templateUrl: './co-je-online-rezervacni-system.component.html',
  styleUrls: ['./co-je-online-rezervacni-system.component.scss'],
  imports: [
    BlogTemplateComponent,
    TranslateModule
  ],
  standalone: true
})
export class CoJeOnlineRezervacniSystemComponent implements OnInit, SetMeta {

  public faq: FAQItemForBlog[] = [];
  public readMore: ReadMoreItem[] = [];
  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();

    this.faq.push(new FAQItemForBlog('Co je online rezervační systém?', 'Online rezervační systém je internetová aplikace, která umožňuje zákazníkům předem rezervovat časové úseky pro poskytnutí dané služby nebo ubytování.'));
    this.faq.push(new FAQItemForBlog('Jaké výhody přináší online rezervační systém?', 'Online rezervační systém nabízí výhody jako zvýšení dostupnosti, zlepšení komunikace, snížení chyb a zvýšení tržeb.'));
    this.faq.push(new FAQItemForBlog('Jak může online rezervační systém zlepšit komunikaci s klienty?', 'Systém umožňuje automaticky posílat potvrzení, upozornění a připomínky o rezervacích zákazníkům.'));
    this.faq.push(new FAQItemForBlog('Jak online rezervační systém pomáhá snižovat chyby?', 'Eliminuje riziko lidských chyb, jako jsou zapomenuté, špatně zapsané nebo dvojité rezervace.'));
    this.faq.push(new FAQItemForBlog('Jak může online rezervační systém zvýšit tržby?', 'Pomáhá maximalizovat využití kapacit a nabízet různé ceny, slevy a balíčky.'));
    this.faq.push(new FAQItemForBlog('Jak vybrat správný online rezervační systém pro můj podnik?', 'Je důležité zvážit typ podniku, funkce, rozpočet, uživatelskou přívětivost, spolehlivost a bezpečnost.'));
    this.faq.push(new FAQItemForBlog('Jaký typ podniku by měl mít svůj online rezervační systém?', 'Systém by měl být přizpůsoben typu podniku a služeb, které nabízíte.'));
    this.faq.push(new FAQItemForBlog('Jaké funkce by měl mít online rezervační systém?', 'Měl by obsahovat všechny funkce potřebné pro efektivní správu rezervací, jako je online platba, automatické upozornění a analýza dat.'));
    this.faq.push(new FAQItemForBlog('Jaký je rozdíl mezi různými online rezervačními systémy na trhu?', 'Různé systémy se mohou lišit svou funkcionalitou, cenou, designem a podporou.'));
    this.faq.push(new FAQItemForBlog('Jak mohu porovnat různé online rezervační systémy?', 'Můžete využít vyhledávače, online adresáře, recenze nebo blogy k porovnání různých systémů.'));
    this.faq.push(new FAQItemForBlog('Jak mohu integrovat online rezervační systém do mého webu?', 'Většina online rezervačních systémů nabízí integrační nástroje nebo API pro snadné začlenění do vašeho webu.'));
    this.faq.push(new FAQItemForBlog('Je bezpečné přijímat online platby prostřednictvím rezervačního systému?', 'Pokud rezervační systém splňuje standardy bezpečnosti a je certifikován, mělo by být bezpečné přijímat online platby.'));

    this.readMore.push(new ReadMoreItem('5 nejoblíbenějších českých rezervačních systémů', 'top-5'));
    this.readMore.push(new ReadMoreItem('Jak vybrat nejlepší rezervační systém pro rok 2023?', 'price'));
    this.readMore.push(new ReadMoreItem('Pro koho jsou určeny rezervační systémy? Průvodce pro každý obor', 'pro-koho-jsou-rezervacni-systemy'));

  }

  setMeta(): void {
    this.metaService.setCsMetaData('Jak vybrat nejlepší rezervační systém pro rok 2023?', 'Internet zásadně změnil každý aspekt provozování podnikání. Naučte se, jak vybrat nejlepší rezervační systém pro rok 2023, který odpovídá potřebám vašeho podnikání.');
  }

}
