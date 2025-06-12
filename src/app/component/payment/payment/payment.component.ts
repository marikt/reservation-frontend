import {Component, OnInit, ViewChild} from '@angular/core';
import {Payment} from '../../../model/payment';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {PaymentPlan} from '../../../util/payment-plan';
import {StripeService} from 'ngx-stripe';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {DashboardService} from '../../../service/dashboard.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {PaymentSession} from '../../../../../projects/notado-lib/src/lib/model/payment-session';
import {CONST} from '../../../../../projects/notado-lib/src/lib/util/const';
import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../../../../../projects/notado-lib/src/lib/service/local-storage.service';
import {TranslateModule} from '@ngx-translate/core';
import {NgIf} from '@angular/common';
import {RowFaqItemComponent} from '../../util/row-faq-item/row-faq-item.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [
    TranslateModule,
    NgIf,
    RowFaqItemComponent
  ],
  standalone: true
})
export class PaymentComponent implements OnInit {

  @ViewChild('modalPayment')
  public modalPayment: any;

  public payment: Payment = new Payment;
  public testMode: boolean = false;
  public promo: boolean = false;


  constructor(
    public modalService: ModalService,
    private stripeService: StripeService,
    public http: HttpService,
    public userService: UserService,
    public spinnerService: SpinnerService,
    public dashboardService: DashboardService,
    public localStorage: LocalStorageService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.params.promo == null) {
      this.promo = false;
    } else {
      this.promo = true;
    }

    const testMode: boolean = this.localStorage.get(CONST.TEST_MODE);
    if (testMode) {
      this.testMode = true;
    }
  }

  public selectPlanAndProceedPayment(plan: PaymentPlan): void {
    this.payment.plan = plan;

    const payment: Payment = new Payment();
    payment.plan = plan;

    this.http.post(Api.PAYMENT + '/' + this.userService.user.id + '/session/' + this.promo, payment, (paymentSession: PaymentSession) => {
      this.stripeService.redirectToCheckout(
        {sessionId: paymentSession.sessionId})
        .subscribe(
          response => {
            console.error(response);
          }
        )
    });
  }

  public get paymentPlan(): typeof PaymentPlan {
    return PaymentPlan;
  }


}
