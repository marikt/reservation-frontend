import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../../../projects/notado-lib/src/lib/service/language.service';
import {IntroItemComponent} from '../intro-item/intro-item.component';

@Component({
  selector: 'app-payment-while-booking-simple',
  templateUrl: './payment-while-booking-simple.component.html',
  styleUrls: ['./payment-while-booking-simple.component.scss'],
  imports: [
    IntroItemComponent
  ],
  standalone: true
})
export class PaymentWhileBookingSimpleComponent implements OnInit {

  constructor(public languageService: LanguageService) {
  }

  ngOnInit(): void {
  }

}
