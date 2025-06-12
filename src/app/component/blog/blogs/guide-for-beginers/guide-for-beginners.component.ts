import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {FAQItemForBlog, ReadMoreItem} from '../../blog-template/blog-template.component';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-guide-for-beginners',
  templateUrl: './guide-for-beginners.component.html',
  styleUrls: ['./guide-for-beginners.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class GuideForBeginnersComponent implements OnInit, SetMeta {

  public faq: FAQItemForBlog[] = [];
  public readMore: ReadMoreItem[] = [];

  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {

    this.setMeta();

    this.faq.push(new FAQItemForBlog('Co je to online rezervační systém?', 'Online rezervační systém, někdy označovaný jako rezervační web, je software, který umožňuje potenciálním zákazníkům rezervovat a platit za aktivity nebo služby přímo na vašich stránkách.'));
    this.faq.push(new FAQItemForBlog('Jak funguje jednoduchý rezervační systém?', 'Zákazník přijde na vaše webové stránky, vybere si službu, klikne na tlačítko pro rezervaci, vyplní rezervační formulář a zaplatí prostřednictvím zabezpečené platební brány.'));
    this.faq.push(new FAQItemForBlog('Jsou online rezervační platby bezpečné?', 'Ano, moderní online rezervační systémy, jako je Notado, nabízí vysokou úroveň zabezpečení.'));
    this.faq.push(new FAQItemForBlog('Jaký rezervační kalendář je integrován v online rezervačních systémech?', 'Většina moderních systémů nabízí integrovaný rezervační kalendář, který je plně responzivní a přizpůsobí se velikosti obrazovky zařízení.'));
    this.faq.push(new FAQItemForBlog('Pro koho je vhodný rezervační systém pro kadeřnictví?', 'Rezervační systém pro kadeřnictví je ideální pro kadeřníky a salony, kteří chtějí automatizovat a zefektivnit proces rezervace.'));
    this.faq.push(new FAQItemForBlog('Může fitness centrum využít online rezervační systém?', 'Ano, online rezervační systém pro fitness je ideální pro fitness centra, která chtějí nabídnout svým klientům snadnou a rychlou rezervaci.'));
    this.faq.push(new FAQItemForBlog('Jaký je nejlepší rezervační systém na web?', 'Nejlepší rezervační systém závisí na specifických potřebách a požadavcích vašeho podnikání. Notado je jedním z moderních a efektivních systémů na trhu.'));
    this.faq.push(new FAQItemForBlog('Existuje bezplatný rezervační systém?', 'Ano, některé online rezervační systémy, včetně Notado, nabízejí bezplatné verze s základními funkcemi.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný rezervační software pro fotografy?', 'Ano, Notado je flexibilní a může být použit jako rezervační software pro fotografy, kadeřníky, maséry a mnoho dalších profesí.'));
    this.faq.push(new FAQItemForBlog('Jaká je výhoda aplikace rezervačního systému?', 'Aplikace rezervačního systému umožňuje podnikům a zákazníkům provádět rezervace kdykoli a kdekoli, což zvyšuje efektivitu a zákaznickou spokojenost.'));
    this.faq.push(new FAQItemForBlog('Může rezervační kalendář pro web zvýšit moje tržby?', 'Ano, online rezervační kalendář pro web může maximalizovat vaše možnosti příjmu tím, že umožní zákazníkům provádět rezervace kdykoli.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný rezervační systém pro wellness centra?', 'Ano, Notado je vhodný pro různé typy podnikání, včetně wellness centra.'));
    this.faq.push(new FAQItemForBlog('Může objednávkový systém pro kadeřnictví zvýšit moji produktivitu?', 'Ano, objednávkový systém pro kadeřnictví může automatizovat proces rezervace, což vám umožní soustředit se na poskytování služeb.'));
    this.faq.push(new FAQItemForBlog('Je Notado vhodný rezervační software pro kadeřnictví?', 'Ano, Notado je navržen tak, aby vyhovoval různým typům podnikání, včetně kadeřnictví.'));
    this.faq.push(new FAQItemForBlog('Může rezervační systém pro maséry zvýšit moji klientelu?', 'Ano, online rezervační systém může přilákat více klientů tím, že nabízí snadnou a rychlou možnost rezervace.'));

    this.readMore.push(new ReadMoreItem('5 nejoblíbenějších českých rezervačních systémů', 'top-5'));
    this.readMore.push(new ReadMoreItem('Telefonické vs Online Rezervace: Změna hry v různých odvětvích', 'telefonicke-vs-online-rezervace'));
    this.readMore.push(new ReadMoreItem('Jak vybrat nejlepší rezervační systém pro rok 2023?', 'price'));
    this.readMore.push(new ReadMoreItem('Jak funguje online rezervační systém?', 'jak-funguje-rezervacni-system'));
    this.readMore.push(new ReadMoreItem('Rozhovor s majitelkou masážního salonu: Jak online rezervační systém zvýšil moje zakázky o 40%', 'masaz-story'));
    this.readMore.push(new ReadMoreItem('Spravujte své zákazníky jako nikdy předtím s integrací Notado a Google Kontaktů', 'sprava-zakazniku'));
    this.readMore.push(new ReadMoreItem('Revoluční online rezervační systém: Představení reverzní rezervace!', 'reverzni-rezervace'));
    this.readMore.push(new ReadMoreItem('Pro koho jsou určeny rezervační systémy? Průvodce pro každý obor', 'pro-koho-jsou-rezervacni-systemy'));
    this.readMore.push(new ReadMoreItem('Výhody a nevýhody používání online rezervačního systému', 'advantages-and-disadvantages'));
    this.readMore.push(new ReadMoreItem('Klíčové funkce skvělého online rezervačního systému', 'key-features'));

  }

  setMeta(): void {
    this.metaService.setCsMetaData('Online rezervační systémy: Kompletní průvodce pro začátečníky', 'Internet zásadně změnil způsob provozování podnikání, zejména jak provádíme a přijímáme rezervace. Objevte vývoj online rezervačního kalendáře a jeho dopad na podnikání.');

  }

}
