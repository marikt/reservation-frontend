import {Component, Input, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-price-item',
  templateUrl: './price-item.component.html',
  styleUrls: ['./price-item.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    RouterLink
  ],
  standalone: true
})
export class PriceItemComponent implements OnInit, SetMeta {

  @Input('color')
  public color: string;

  @Input('subscriptionType')
  public subscriptionType: string;

  public items: Item[];

  constructor(public metaService: MetaService,
              public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.setMeta();
    // this.items = [];
    // for (let i = 0; i < 9; i++) {
    //   this.items.push(new Item());
    // }
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.PRICE');
  }

}

export class Item {

}
