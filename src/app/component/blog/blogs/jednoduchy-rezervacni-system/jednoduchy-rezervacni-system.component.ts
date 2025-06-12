import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {FAQItemForBlog, ReadMoreItem} from '../../blog-template/blog-template.component';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-jednoduchy-rezervacni-system',
  templateUrl: './jednoduchy-rezervacni-system.component.html',
  styleUrls: ['./jednoduchy-rezervacni-system.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class JednoduchyRezervacniSystemComponent implements OnInit, SetMeta {

  public faq: FAQItemForBlog[] = [];
  public readMore: ReadMoreItem[] = [];

  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();

    this.faq.push(new FAQItemForBlog('Co je to jednoduchý rezervační systém?', 'Jednoduchý rezervační systém, jako je Notado, je software navržený tak, aby malým podnikům umožnil snadné a efektivní spravování rezervací.'));
    this.faq.push(new FAQItemForBlog('Jak mohu nastavit zákazníka v rezervačním systému?', 'V Notado je nastavení zákazníka velmi jednoduché. Stačí vyplnit několik základních informací a váš zákazník je připraven k rezervaci.'));
    this.faq.push(new FAQItemForBlog('Jaké služby mohu nabízet pomocí online rezervačního systému?', 'S Notado můžete snadno definovat a nastavit služby, které nabízíte, včetně cen, trvání a dostupnosti.'));
    this.faq.push(new FAQItemForBlog('Jak mohu informovat své zákazníky o jejich rezervacích?', 'Notado umožňuje nastavit notifikace pro vás i vaše zákazníky. Upozornění můžete odeslat e-mailem nebo SMS.'));
    this.faq.push(new FAQItemForBlog('Jak nastavím otevírací dobu v rezervačním kalendáři?', 'V Notado můžete jednoduše definovat otevírací dobu vašeho podniku, což je klíčové pro správný chod vašeho rezervačního systému.'));
    this.faq.push(new FAQItemForBlog('Jaký je nejlepší rezervační systém pro malé podniky?', 'Nejlepší rezervační systém závisí na potřebách vašeho podnikání. Notado je jedním z jednoduchých a efektivních systémů na trhu.'));
    this.faq.push(new FAQItemForBlog('Může rezervační systém pro kadeřnictví zvýšit moji produktivitu?', 'Ano, rezervační systém, jako je Notado, může automatizovat proces rezervace, což vám umožní soustředit se na poskytování služeb.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný rezervační software pro fotografy?', 'Ano, Notado je flexibilní a může být použit jako rezervační software pro různé profese, včetně fotografů.'));
    this.faq.push(new FAQItemForBlog('Existuje bezplatný rezervační systém pro malé podniky?', 'Ano, některé online rezervační systémy, včetně Notado, nabízejí bezplatné verze s základními funkcemi.'));
    this.faq.push(new FAQItemForBlog('Jaké další funkce nabízí Notado kromě rezervací?', 'Kromě základních rezervačních funkcí nabízí Notado také integraci s jinými systémy, speciální požadavky na rezervace a mnoho dalších funkcí.'));


    this.readMore.push(new ReadMoreItem('Rozhovor s majitelkou masážního salonu: Jak online rezervační systém zvýšil moje zakázky o 40%', 'masaz-story'));
    this.readMore.push(new ReadMoreItem('5 nejoblíbenějších českých rezervačních systémů', 'top-5'));
    // this.readMore.push(new ReadMoreItem('Telefonické vs Online Rezervace: Změna hry v různých odvětvích', 'telefonicke-vs-online-rezervace'));
    this.readMore.push(new ReadMoreItem('Jak vybrat nejlepší rezervační systém pro rok 2023?', 'price'));
    // this.readMore.push(new ReadMoreItem('Jak funguje online rezervační systém?', 'jak-funguje-rezervacni-system'));
    this.readMore.push(new ReadMoreItem('Spravujte své zákazníky jako nikdy předtím s integrací Notado a Google Kontaktů', 'sprava-zakazniku'));
    // this.readMore.push(new ReadMoreItem('Revoluční online rezervační systém: Představení reverzní rezervace!', 'reverzni-rezervace'));
    this.readMore.push(new ReadMoreItem('Pro koho jsou určeny rezervační systémy? Průvodce pro každý obor', 'pro-koho-jsou-rezervacni-systemy'));
    this.readMore.push(new ReadMoreItem('Výhody a nevýhody používání online rezervačního systému', 'advantages-and-disadvantages'));
    this.readMore.push(new ReadMoreItem('Klíčové funkce skvělého online rezervačního systému', 'key-features'));

  }

  setMeta(): void {
    this.metaService.setCsMetaData('Jednoduchý rezervační systém s Notadem | Notado Blog', 'Hledáte jednoduchý rezervační systém pro váš malý podnik? Notado je řešení, které vám ušetří čas a peníze. V článku se dozvíte, jak snadno můžete nastavit zákazníka, služby, notifikace, otevírací dobu a další nezbytné věci pro nastavení rezervačního systému.');
  }

}
