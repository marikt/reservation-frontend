import {Component, Input, OnInit} from '@angular/core';
// tslint:disable-next-line:quotemark
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {DemoService} from '../../../../service/demo.service';
import {FAQItemForBlog} from '../../../blog/blog-template/blog-template.component';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {RouterLink} from '@angular/router';
import {IntroItemComponent} from '../../intro-item/intro-item.component';
import {IntroItemRevertComponent} from '../../intro-item-revert/intro-item-revert.component';
import {FaqOnBottomPageComponent} from '../../../util/faq-on-bottom-page/faq-on-bottom-page.component';
import {MenuDiscountComponent} from '../../../menu-discount/menu-discount.component';

@Component({
  selector: 'app-for-industry',
  templateUrl: './for-industry.component.html',
  styleUrls: ['./for-industry.component.scss'],
  imports: [
    NgStyle,
    TranslateModule,
    RouterLink,
    IntroItemComponent,
    NgForOf,
    IntroItemRevertComponent,
    FaqOnBottomPageComponent,
    NgIf,
    MenuDiscountComponent
  ],
  standalone: true
})
export class ForIndustryComponent implements OnInit {

  @Input('profession')
  profession: string;

  @Input('blackStyle')
  blackStyle: boolean;

  @Input('img')
  img: string;

  @Input('industries')
  industries: Industry[];

  @Input('faqOnBottomPages')
  public faqOnBottomPages: FAQItemForBlog[];

  public lazyLoad: boolean = false;

  constructor(public languageService: LanguageService,
              public demoService: DemoService, ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
        this.lazyLoad = true;
      },
      300);
  }

  public backgroundImage(): string {
    if (this.img) {
      return 'url(\'' + this.img + '\') no-repeat scroll top center'

    }
    return '';
  }


}

export class Industry {
  public title: string;
  public img: string;
  public link: string;


  constructor(title: string, img: string, link?: string) {
    this.title = title;
    this.img = img;
    this.link = link;
  }


}
