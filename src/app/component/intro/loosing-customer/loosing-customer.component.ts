import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {BGType} from '../intro-item/intro-item.component';
import {IntroItemRevertComponent} from '../intro-item-revert/intro-item-revert.component';

@Component({
  selector: 'app-loosing-customer',
  templateUrl: './loosing-customer.component.html',
  styleUrls: ['./loosing-customer.component.scss'],
  imports: [
    IntroItemRevertComponent
  ],
  standalone: true
})
export class LoosingCustomerComponent implements OnInit {

  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {
  }
  public get getBGType(): typeof BGType {
    return BGType;
  }
}
