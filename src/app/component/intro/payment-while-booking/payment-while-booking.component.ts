import {Component, OnInit} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-payment-while-booking',
  templateUrl: './payment-while-booking.component.html',
  styleUrls: ['./payment-while-booking.component.scss'],
  imports: [
    TranslateModule
  ],
  standalone: true
})
export class PaymentWhileBookingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
