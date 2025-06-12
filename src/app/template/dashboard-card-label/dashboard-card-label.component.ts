import {Component, Input, OnInit} from '@angular/core';
import {FAQItem} from '../../zzzmodules/root-component/faq/faq-module.component';
import {TranslateModule} from '@ngx-translate/core';
import {FaqItemComponent} from '../../component/faq/faq/faq-item/faq-item.component';

@Component({
  selector: 'app-dashboard-card-label',
  templateUrl: './dashboard-card-label.component.html',
  styleUrls: ['./dashboard-card-label.component.scss'],
  imports: [
    TranslateModule,
    FaqItemComponent
  ],
  standalone: true
})
export class DashboardCardLabelComponent implements OnInit {
    @Input('label')
    public label: string;

    @Input('faqItems')
    public faqItems: FAQItem[] = [];

    @Input('entityName')
    public entityName: string;

    constructor() {
    }

    ngOnInit() {
    }

}
