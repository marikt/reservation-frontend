import {Component, Input, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-row-faq-item',
  templateUrl: './row-faq-item.component.html',
  styleUrls: ['./row-faq-item.component.scss'],
  imports: [
    TranslateModule,
    NgIf
  ],
  standalone: true
})
export class RowFaqItemComponent implements OnInit {

  @Input('question')
  public question: string;

  @Input('answer')
  public answer: string;

  public open: boolean = false;

  constructor(
  ) { }

  ngOnInit(): void {

  }

}
