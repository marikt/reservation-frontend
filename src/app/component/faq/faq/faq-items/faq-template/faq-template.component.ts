import {Component, Input, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {SafeUrlPipe} from '../../../../../pipe/safe-url.pipe';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'faq-template',
  templateUrl: './faq-template.component.html',
  styleUrls: ['../../../faq.component.scss'],
  imports: [
    TranslateModule,
    SafeUrlPipe,
    RouterLink,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class FaqTemplateComponent implements OnInit {

  @Input('title')
  public title: string;

  @Input('labels')
  public labels: number;

  @Input('imgs')
  public imgs: number[] = [];

  @Input('links')
  public links: ItemWithLink[] = [];

  @Input('videos')
  public videos: ItemWithLink[] = [];

  constructor(public languageService: LanguageService) {
  }

  ngOnInit() {
  }

}

export class ItemWithLink {
  public idx: number;
  public link: number;
  public title: string;


  constructor(idx: number, link: number, title?: string) {
    this.idx = idx;
    this.link = link;
    this.title = title;
  }
}
