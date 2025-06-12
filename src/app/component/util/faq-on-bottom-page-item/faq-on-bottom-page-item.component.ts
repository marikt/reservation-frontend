import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {FAQItemForBlog} from '../../blog/blog-template/blog-template.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-faq-on-bottom-page-item',
  templateUrl: './faq-on-bottom-page-item.component.html',
  styleUrls: ['./faq-on-bottom-page-item.component.scss'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class FaqOnBottomPageItemComponent implements OnInit {
  public open: boolean = false;

  @Input('faqOnBottomPage')
  public faqOnBottomPage: FAQItemForBlog;

  constructor(public languageService: LanguageService) {
  }
  ngOnInit(): void {
  }

}


