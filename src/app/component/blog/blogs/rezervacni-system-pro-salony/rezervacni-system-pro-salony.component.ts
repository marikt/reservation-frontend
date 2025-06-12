import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {FAQItemForBlog, ReadMoreItem} from '../../blog-template/blog-template.component';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-rezervacni-system-pro-salony',
  templateUrl: './rezervacni-system-pro-salony.component.html',
  styleUrls: ['./rezervacni-system-pro-salony.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class RezervacniSystemProSalonyComponent implements OnInit, SetMeta {

  public readMore: ReadMoreItem[] = [];
  public faq: FAQItemForBlog[] = [];

  constructor(
    private metaService: MetaService,
    public languageService: LanguageService) {

  }

  ngOnInit(): void {
    this.setMeta();

    this.faq.push(new FAQItemForBlog('Proč bych měl používat rezervační systém pro svůj kosmetický salon?', 'Rezervační systém, jako je Notado, může výrazně zefektivnit a zorganizovat chod vašeho kosmetického salonu. Kromě snadného vytváření rezervací pro vaše klienty systém také snižuje počet zmeškaných schůzek díky automatickým připomínkám a integrovanému CRM.'));
    this.faq.push(new FAQItemForBlog('Jak mohu začít s Notado pro správu mého salonu?', 'Je to jednoduché! Stačí kliknout na odkaz pro registraci v pravém horním rohu a následovat instrukce. Bez potřeby vkládání platební karty můžete ihned začít s přijímáním online rezervací a prezentací vašeho.'));
    this.faq.push(new FAQItemForBlog('Je používání Notada pro můj kosmetický salon skutečně na 3 měsíce zdarma?', 'Ano, Notado nabízí 3 měsiční plán, který pokrývá všechny základní funkce potřebné pro správu vašeho salonu.'));
    this.faq.push(new FAQItemForBlog('Jaká zařízení mohu používat k přístupu k Notado?', 'Ať už dáváte přednost stolnímu počítači, tabletu nebo mobilnímu telefonu, Notado je optimalizováno pro všechny tyto platformy, takže si můžete vybrat to, co vám nejlépe vyhovuje.'));
    this.faq.push(new FAQItemForBlog('Jak mohu založit účet Notada pro můj kosmetický salon?', 'K založení účtu Notado stačí kliknout na odkaz pro registraci v pravém horním rohu.'));

    this.readMore.push(new ReadMoreItem('5 nejoblíbenějších českých rezervačních systémů', 'top-5'));
    // this.readMore.push(new ReadMoreItem('Telefonické vs Online Rezervace: Změna hry v různých odvětvích', 'telefonicke-vs-online-rezervace'));
    this.readMore.push(new ReadMoreItem('Jak vybrat nejlepší rezervační systém pro rok 2023?', 'price'));
    // this.readMore.push(new ReadMoreItem('Jak funguje online rezervační systém?', 'jak-funguje-rezervacni-system'));
    this.readMore.push(new ReadMoreItem('Rozhovor s majitelkou masážního salonu: Jak online rezervační systém zvýšil moje zakázky o 40%', 'masaz-story'));
    this.readMore.push(new ReadMoreItem('Spravujte své zákazníky jako nikdy předtím s integrací Notado a Google Kontaktů', 'sprava-zakazniku'));
    // this.readMore.push(new ReadMoreItem('Revoluční online rezervační systém: Představení reverzní rezervace!', 'reverzni-rezervace'));
    this.readMore.push(new ReadMoreItem('Pro koho jsou určeny rezervační systémy? Průvodce pro každý obor', 'pro-koho-jsou-rezervacni-systemy'));
    this.readMore.push(new ReadMoreItem('Výhody a nevýhody používání online rezervačního systému', 'advantages-and-disadvantages'));
    this.readMore.push(new ReadMoreItem('Klíčové funkce skvělého online rezervačního systému', 'key-features'));

  }

  setMeta(): void {
    this.metaService.setCsMetaData('Rezervační systém pro kosmetická studia a salony | Reservio Business', 'Reservio je ideální řešení pro kosmetická studia a salony, umožňující online rezervace 24/7. Tento rezervační software pomáhá efektivně spravovat rezervace, zasílat automatické připomínky a zvyšovat online viditelnost vašeho podnikání.');
  }

}
