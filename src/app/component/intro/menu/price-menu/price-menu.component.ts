import {Component, OnInit} from '@angular/core';
import {SetMeta} from '../../../../../../projects/notado-lib/src/lib/util/set-meta';
import {MetaService} from '../../../../service/meta.service';
import {LanguageService} from '../../../../../../projects/notado-lib/src/lib/service/language.service';
import {TranslateModule} from '@ngx-translate/core';
import {TryButtonComponent} from '../../try-button/try-button.component';
import {PriceItemComponent} from '../price-item/price-item.component';
import {MenuDiscountComponent} from '../../../menu-discount/menu-discount.component';

@Component({
  selector: 'app-price-menu',
  templateUrl: './price-menu.component.html',
  styleUrls: ['./price-menu.component.scss'],
  imports: [
    TranslateModule,
    TryButtonComponent,
    PriceItemComponent,
    MenuDiscountComponent
  ],
  standalone: true
})
export class PriceMenuComponent implements OnInit, SetMeta {

  public activeSubscriptionType = '3MONTH';
  constructor(public metaService: MetaService,
              public languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.setMeta();
  }

  public setMeta(): void {
    this.metaService.setMetaData('META.PRICE');
  }

}
