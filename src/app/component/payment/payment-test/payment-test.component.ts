import {Component, OnInit, ViewChild} from '@angular/core';
import {Payment} from '../../../model/payment';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {StripeService} from 'ngx-stripe';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {UserService} from '../../../../../projects/notado-lib/src/lib/security/service/user.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {DashboardService} from '../../../service/dashboard.service';
import {PaymentPlan} from '../../../util/payment-plan';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {PaymentSession} from '../../../../../projects/notado-lib/src/lib/model/payment-session';

@Component({
    selector: 'app-payment-test',
    templateUrl: './payment-test.component.html',
    styleUrls: ['./payment-test.component.scss'],
    standalone: true
})
export class PaymentTestComponent implements OnInit {

  @ViewChild('modalPayment')
  public modalPayment: any;

  public payment: Payment = new Payment;


  constructor(
    public modalService: ModalService,
    private stripeService: StripeService,
    public http: HttpService,
    public userService: UserService,
    public spinnerService: SpinnerService,
    public dashboardService: DashboardService,
  ) {
  }

  ngOnInit(): void {
  }

  public selectPlanAndProceedPayment(plan: PaymentPlan): void {
    this.payment.plan = plan;
    let payment: Payment = new Payment();
    payment.plan = plan;
    this.http.post(Api.PAYMENT + '/' + this.userService.user.id + '/session/false', payment, (paymentSession: PaymentSession) => {
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
