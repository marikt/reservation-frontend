import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {FAQItemForBlog} from '../../blog/blog-template/blog-template.component';
import {FaqOnBottomPageItemComponent} from '../faq-on-bottom-page-item/faq-on-bottom-page-item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-faq-on-bottom-page',
  templateUrl: './faq-on-bottom-page.component.html',
  styleUrls: ['./faq-on-bottom-page.component.scss'],
  imports: [
    FaqOnBottomPageItemComponent,
    NgForOf
  ],
  standalone: true
})
export class FaqOnBottomPageComponent implements OnInit {

  @Input('faqOnBottomPages')
  public faqOnBottomPages: FAQItemForBlog[];

  constructor(public languageService: LanguageService) {
  }
  ngOnInit(): void {
  }

}


