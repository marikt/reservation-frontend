import {Component, Input, OnInit} from '@angular/core';
import {FAQItem} from '../../../../zzzmodules/root-component/faq/faq-module.component';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {NgForOf, NgIf} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-faq-item',
  templateUrl: './faq-item.component.html',
  styleUrls: ['./faq-item.component.scss'],
  imports: [
    NgbPopover,
    NgIf,
    TranslateModule,
    NgForOf
  ],
  standalone: true
})
export class FaqItemComponent implements OnInit {

  @Input('faqItems')
  public faqItems: FAQItem[] = [];

  constructor(public languageService: LanguageService) {
  }

  ngOnInit() {
  }

}


