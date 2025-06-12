import {Component, HostListener, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {DemoService} from '../../../../service/demo.service';
import {DemoComponent, DemoType} from '../../demo/demo.component';
import {FAQItemForBlog} from '../../../blog/blog-template/blog-template.component';
import {TranslateModule} from '@ngx-translate/core';
import {TryAndVideoButtonComponent} from '../../try-and-video-button/try-and-video-button.component';
import {NgIf} from '@angular/common';
import {FeedbackComponent} from '../../feedback/feedback.component';
import {RouterLink} from '@angular/router';
import {FeaturesComponent} from '../../features/features.component';
import {BookingChannelsComponent} from '../../booking-channels/booking-channels.component';
import {IntroItemRevertComponent} from '../../intro-item-revert/intro-item-revert.component';
import {IntroItemComponent} from '../../intro-item/intro-item.component';
import {FaqOnBottomPageComponent} from '../../../util/faq-on-bottom-page/faq-on-bottom-page.component';
import {TryButtonComponent} from '../../try-button/try-button.component';
import {DemoModalComponent} from '../../demo/demo-modal/demo-modal.component';

@Component({
  selector: 'app-for-audience',
  templateUrl: './for-audience.component.html',
  styleUrls: ['./for-audience.component.scss'],
  imports: [
    TranslateModule,
    TryAndVideoButtonComponent,
    DemoComponent,
    NgIf,
    FeedbackComponent,
    RouterLink,
    FeaturesComponent,
    BookingChannelsComponent,
    IntroItemRevertComponent,
    IntroItemComponent,
    FaqOnBottomPageComponent,
    TryButtonComponent,
    DemoModalComponent
  ],
  standalone: true
})
export class ForAudienceComponent implements OnInit {

  public isMobile: boolean;

  @Input('profession')
  profession: string;

  @Input('label')
  label: string;

  @Input('img')
  img: string;

  @Input('video')
  video: string;

  @Input('img1')
  img1: string;

  @Input('title1')
  title1: string;

  @Input('title11')
  title11: string;

  @Input('desc1')
  desc1: string;

  @Input('item11')
  item11: string;

  @Input('item12')
  item12: string;

  @Input('item13')
  item13: string;

  @Input('item21')
  item21: string;

  @Input('item22')
  item22: string;

  @Input('item23')
  item23: string;

  @Input('item31')
  item31: string;

  @Input('item32')
  item32: string;

  @Input('item33')
  item33: string;

  @Input('img2')
  img2: string;

  @Input('title2')
  title2: string;

  @Input('title22')
  title22: string;

  @Input('label2')
  label2: string;

  @Input('desc2')
  desc2: string;

  @Input('img3')
  img3: string;

  @Input('title3')
  title3: string;

  @Input('title33')
  title33: string;

  @Input('label3')
  label3: string;

  @Input('desc3')
  desc3: string;

  @Input('title4')
  title4: string;

  @Input('title44')
  title44: string;

  @Input('desc4')
  desc4: string;

  @Input('img4')
  img4: string;


  @Input('title5')
  title5: string;

  @Input('title55')
  title55: string;

  @Input('desc5')
  desc5: string;

  @Input('item51')
  item51: string;

  @Input('item52')
  item52: string;

  @Input('item53')
  item53: string;

  @Input('img5')
  img5: string;

  @Input('imgAlt5')
  imgAlt5: string;

  @Input('title6')
  title6: string;

  @Input('title66')
  title66: string;

  @Input('desc6')
  desc6: string;

  @Input('imgAlt')
  imgAlt: string;

  @Input('imgAlt1')
  imgAlt1: string;

  @Input('imgAlt2')
  imgAlt2: string;

  @Input('imgAlt3')
  imgAlt3: string;
  @Input('imgAlt4')
  imgAlt4: string;

  @Input('demoType')
  demoType: DemoType;

  @Input('link1')
  link1: string;

  @Input('link2')
  link2: string;

  @Input('link3')
  link3: string;

  @Input('link4')
  link4: string;

  @Input('link5')
  link5: string;


  @Input('faqOnBottomPages')
  public faqOnBottomPages: FAQItemForBlog[];


  public lazyLoad: boolean = false;

  constructor(public languageService: LanguageService,
              public demoService: DemoService) {
  }

  ngOnInit(): void {
    this.onResize();
    setTimeout(() => {
        this.lazyLoad = true;
      },
      300);
  }

  @HostListener('window:resize', ['$event'])
  public onResize(event?) {
    if (window.innerWidth < 576) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  getTranslationKeyWithPrefix(key: string) {
    if (key) {
      return 'AUDIENCE.PROFESSION.' + this.profession + '.' + key;
    }
    return null;
  }
}
