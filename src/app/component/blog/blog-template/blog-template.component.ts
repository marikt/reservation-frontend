import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {NgIf, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TryButtonComponent} from '../../intro/try-button/try-button.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-blog-template',
  templateUrl: './blog-template.component.html',
  styleUrls: ['./blog-template.component.scss'],
  imports: [
    NgIf,
    NgStyle,
    RouterLink,
    TryButtonComponent,
    TranslateModule
  ],
  standalone: true
})
export class BlogTemplateComponent implements OnInit {


  @Input('blogId')
  public blogId: number;

  @Input('title')
  public title: string;

  @Input('date')
  public date: string;

  @Input('hideAuthor')
  public hideAuthor: boolean;

  @Input('readMore')
  public readMore: ReadMoreItem[];

  @Input('faq')
  public faq: FAQItemForBlog[];


  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {
  }

}


export class ReadMoreItem {
  public title: string;
  public url: string;
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}

export class FAQItemForBlog {
  public question: string;
  public answer: string;

  constructor(question: string, answer: string) {
    this.question = question;
    this.answer = answer;
  }
}
