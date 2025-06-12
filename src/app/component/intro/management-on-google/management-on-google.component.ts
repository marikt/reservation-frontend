import {Component, HostListener, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {DemoService} from '../../../service/demo.service';
import {SetMeta} from '../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../service/meta.service';
import {FAQItemForBlog} from '../../blog/blog-template/blog-template.component';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {TranslateModule} from '@ngx-translate/core';
import {TryAndVideoButtonComponent} from '../try-and-video-button/try-and-video-button.component';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';
import {IntroItemComponent} from '../intro-item/intro-item.component';
import {BookingChannelsComponent} from '../booking-channels/booking-channels.component';
import {FaqOnBottomPageComponent} from '../../util/faq-on-bottom-page/faq-on-bottom-page.component';
import {TryButtonComponent} from '../try-button/try-button.component';
import {DemoModalComponent} from '../demo/demo-modal/demo-modal.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-management-on-google',
  templateUrl: './management-on-google.component.html',
  styleUrls: ['./management-on-google.component.scss'],
  imports: [
    TranslateModule,
    TryAndVideoButtonComponent,
    IntroItemRevertComponent,
    IntroItemComponent,
    BookingChannelsComponent,
    FaqOnBottomPageComponent,
    TryButtonComponent,
    DemoModalComponent,
    NgIf
  ],
  standalone: true
})
export class ManagementOnGoogleComponent implements OnInit, SetMeta {

  public faq: FAQItemForBlog[] = [];
  public isMobile: boolean;
  public youtubeLoad: boolean = false;


  constructor(public languageService: LanguageService,
              public demoService: DemoService,
              public modalService: ModalService,

              public metaService: MetaService) {
  }

  ngOnInit(): void {
    this.setMeta();

    this.faq.push(new FAQItemForBlog('Co je Notado?', 'Notado je služba, která adaptuje Google Kalendář pro použití jako rezervační systém.'));
    this.faq.push(new FAQItemForBlog('Jak mohu vyzkoušet Notado?', 'Můžete vyzkoušet Notado zdarma po dobu 3 měsíců bez potřeby kreditní karty. Stačí se zaregistrovat a začít rezervovat.'));
    this.faq.push(new FAQItemForBlog('Jaká je výhoda používání Google Kalendáře s Notado?', 'Používání kalendáře třetí strany, jako je Google Kalendář, nabízí levnější rezervační systém, protože není potřeba vyvíjet a udržovat samostatný kalendářový systém. Služby jako Google Kalendář jsou také spolehlivější a bezpečnější.'));
    this.faq.push(new FAQItemForBlog('V čem se Notado liší od ostatních rezervačních systémů?', 'Zatímco většina rezervačních systémů jsou jen další plánovací kalendáře, Notado adaptuje nejlepší kalendář na trhu.'));
    this.faq.push(new FAQItemForBlog('Je Notado zdarma?', 'Ano, můžete vyzkoušet Notado zdarma po dobu 3 měsíců.'));
    this.faq.push(new FAQItemForBlog('Můžu přidat rezervační widget Notado na svůj web?', 'Ano, Notado nabízí rezervační widget, který můžete přidat na svůj web.'));
    this.faq.push(new FAQItemForBlog('Jaké jsou výhody používání Notado?', 'Notado nabízí levnější a spolehlivější rezervační systém založený na Google Kalendáři s řadou užitečných funkcí a integrací.'));
    this.faq.push(new FAQItemForBlog('Můžu sdílet svůj kalendář s ostatními uživateli?', 'Ano, s Notado a Google Kalendářem máte možnost snadno sdílet kalendáře s ostatními uživateli.'));
    this.faq.push(new FAQItemForBlog('Je možné přistupovat ke kalendáři z více zařízení?', 'Ano, díky integraci s Google Kalendářem můžete přistupovat ke kalendáři z více zařízení.'));

    this.onResize();

  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  setMeta(): void {
    this.metaService.setMetaData('META.MANAGE_ON_GOOGLE');
  }

}
