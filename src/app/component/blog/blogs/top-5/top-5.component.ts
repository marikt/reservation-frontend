import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {FAQItemForBlog} from '../../blog-template/blog-template.component';
import {DOCUMENT, NgForOf, NgIf} from '@angular/common';
import {Snippet} from '../../../../util/snippet';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {RowFaqItemComponent} from '../../../util/row-faq-item/row-faq-item.component';
import {TryButtonComponent} from '../../../intro/try-button/try-button.component';
import {FeedbackComponent} from '../../../intro/feedback/feedback.component';
import {SafeUrlPipe} from '../../../../pipe/safe-url.pipe';

@Component({
  selector: 'app-top-5',
  templateUrl: './top-5.component.html',
  styleUrls: ['./top-5.component.scss'],
  imports: [
    NgForOf,
    RowFaqItemComponent,
    NgIf,
    TryButtonComponent,
    TranslateModule,
    FeedbackComponent,
    SafeUrlPipe
  ],
  standalone: true
})
export class Top5Component implements OnInit, SetMeta {

  public faq: FAQItemForBlog[] = [];

  constructor(private metaService: MetaService,
              public renderer2: Renderer2,
              public translate: TranslateService,
              @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit(): void {
    this.faq.push(new FAQItemForBlog('Jaké jsou top 5 rezervačních systémů v roce 2023?', 'Článek uvádí Notado, Reservio, Reenio, Supersaas a Myfox jako nejpopulárnější rezervační systémy.'));
    this.faq.push(new FAQItemForBlog('Pro jaké podniky jsou tyto rezervační systémy vhodné?', 'Jsou vhodné pro kadeřníky, zubaře, autoservisy, masážní salony, jóga a sportovní studia, online kurzy, sportovní zařízení a sauny.'));
    this.faq.push(new FAQItemForBlog('Jak se Notado odlišuje od ostatních systémů?', 'Notado je známý svým intuitivním rozhraním, flexibilním rezervačním formulářem a specifickými rezervačními formuláři pro každou službu.'));
    this.faq.push(new FAQItemForBlog('Kolik stojí používání Notado?', 'Notado stojí 240 Kč měsíčně, včetně všech poplatků a funkcí.'));
    this.faq.push(new FAQItemForBlog('Jak se cenově a funkčně srovnává Reservio?', 'Reservio nabízí licenci Standard za 368 Kč měsíčně, která zahrnuje rozumnou sadu funkcí vhodných pro různé podniky.'));
    this.faq.push(new FAQItemForBlog('Podle jakých kritérií byly tyto rezervační aplikace hodnoceny?', 'Kritéria zahrnují cenovou dostupnost, snadnost nastavení a použití, možnosti přizpůsobení a vzhled rezervačního formuláře.'));
    this.faq.push(new FAQItemForBlog('Jak je stanovena cenová struktura Reenio?', 'Reenio účtuje 225 Kč měsíčně za svou podnikatelskou licenci. Nabízejí také zdarma verzi s limitem 50 rezervací za měsíc.'));
    this.faq.push(new FAQItemForBlog('Který rezervační systém nabízí zdarma verzi?', 'Reenio a Supersaas nabízejí zdarma verze, ale s omezením na počet měsíčních rezervací.'));
    this.faq.push(new FAQItemForBlog('Jak se Supersaas odlišuje svými službami?', 'Supersaas nabízí dvě varianty služeb. Varianta A je zdarma, ale má reklamy a je omezena na 50 rezervací za měsíc. Varianta B stojí 300 Kč měsíčně a umožňuje až 300 rezervací.'));
    this.faq.push(new FAQItemForBlog('Kolik stojí licence Myfox STANDARD?', 'Licence Myfox STANDARD stojí 459 Kč měsíčně a je přizpůsobena potřebám menších provozů s cca 30 zaměstnanci.\n'));

  }

  setMeta(): void {
    this.metaService.setCsMetaData('5 nejoblíbenějších českých rezervačních systémů | Notado Blog', 'Prozkoumejte top 5 českých rezervačních systémů roku 2022. Objevte kritéria pro nejlepší rezervační systém vhodný pro firmy s cca 30 zaměstnanci.');

    const script = this.renderer2.createElement('script');
    script.type = Snippet.type;
    script.text = Snippet.text;
    this.renderer2.appendChild(this.document.body, script);
  }

}
