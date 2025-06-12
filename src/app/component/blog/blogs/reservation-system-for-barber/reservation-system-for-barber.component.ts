import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {FAQItemForBlog, ReadMoreItem} from '../../blog-template/blog-template.component';
import {BlogTemplateCsComponent} from '../../blog-template-cs/blog-template-cs.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-reservation-system-for-barber',
  templateUrl: './reservation-system-for-barber.component.html',
  styleUrls: ['./reservation-system-for-barber.component.scss'],
  imports: [
    BlogTemplateCsComponent,
    TranslateModule
  ],
  standalone: true
})
export class ReservationSystemForBarberComponent implements OnInit, SetMeta {
  public faq: FAQItemForBlog[] = [];
  public readMore: ReadMoreItem[] = [];

  constructor(private metaService: MetaService) {

  }

  ngOnInit(): void {

    this.faq.push(new FAQItemForBlog('Co je hlavní výhodou online rezervačního systému pro holičství?', 'Online rezervační systém umožňuje zákazníkům snadno rezervovat schůzky kdykoli a odkudkoli, což zvyšuje jejich spokojenost.'));
    this.faq.push(new FAQItemForBlog('Jak může online rezervační systém zlepšit efektivitu mého holičství?', 'Systém poskytuje automatické upomínky, snižuje počet zmeškaných schůzek a umožňuje lepší plánování a optimalizaci provozu.'));
    this.faq.push(new FAQItemForBlog('Jaký je význam integrace s oblíbenými nástroji?', 'Integrace s nástroji jako Google Kalendář a Stripe zvyšuje efektivitu a pohodlí jak pro podnik, tak pro zákazníky.'));
    this.faq.push(new FAQItemForBlog('Jak může online rezervační systém rozšířit můj dosah?', 'Díky integraci s webovými stránkami a sociálními médii můžete dosáhnout širšího publiku a přilákat nové zákazníky.'));
    this.faq.push(new FAQItemForBlog('Jak může Notado pomoci vytvářet silnější vztahy se zákazníky?', 'Notado nabízí personalizovaný zážitek, umožňuje zákazníkům sdílet recenze a poskytuje nástroje pro interakci s komunitou.'));
    this.faq.push(new FAQItemForBlog('Jak může online rezervační systém zvýšit ziskovost mého holičství?', 'Snížením počtu zmeškaných schůzek, zvýšením efektivity a optimalizací provozu můžete dosáhnout vyššího zisku.'));
    this.faq.push(new FAQItemForBlog('Jak mohu začít s Notado?', 'Začít s Notado je snadné a nabízí vzdělávací materiály a podporu pro rychlé nastavení.'));
    this.faq.push(new FAQItemForBlog('Jaké klíčové funkce nabízí Notado?', 'Notado nabízí flexibilní rezervační formulář, automatické upomínky, online platby, integraci s Google Kalendářem a podrobné statistiky.'));
    this.faq.push(new FAQItemForBlog('Jak může Notado zvýšit důvěru zákazníků?', 'Díky bezpečným online platbám a možnosti zákazníků sdílet své zkušenosti může Notado zvyšovat důvěru zákazníků.'));
    this.faq.push(new FAQItemForBlog('Jak může Notado pomoci v růstu mého holičství?', 'Díky integraci s vašimi webovými stránkami a sociálními médii, automatizaci procesů a podrobným analýzám může Notado podporovat růst vašeho podniku.'));
    this.faq.push(new FAQItemForBlog('Proč bych měl investovat do moderního rezervačního systému?', 'Investováním do moderního systému investujete do budoucnosti svého podniku, zvyšujete efektivitu a spokojenost zákazníků.'));
    this.faq.push(new FAQItemForBlog('Jak může Notado snížit administrativní zátěž mého holičství?', 'Automatizací procesů, jako jsou rezervace, upomínky a platby, může Notado ušetřit čas a snížit administrativní zátěž.'));

    this.readMore.push(new ReadMoreItem('Rozhovor s majitelkou masážního salonu: Jak online rezervační systém zvýšil moje zakázky o 40%', 'masaz-story'));
    this.readMore.push(new ReadMoreItem('Klíčové funkce skvělého online rezervačního systému', 'key-features'));

    this.setMeta();
  }

  setMeta(): void {
    this.metaService.setCsMetaData('Optimalizace holičství a kadeřnictví s online rezervačním systémem Notado', '"Průvodce pro holičství a kadeřnictví o výhodách online rezervačního systému Notado. Zjistěte, jak moderní technologie může zvýšit efektivitu, zlepšit zákaznický servis a podpořit růst vašeho podniku.');
  }

}
