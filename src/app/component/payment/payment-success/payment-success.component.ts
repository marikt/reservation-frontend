import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MySubscribable} from '../../../../../projects/notado-lib/src/lib/util/my-subscribable';
import {BroadcastService} from '../../../../../projects/notado-lib/src/lib/service/broadcast.service';
import {SpinnerService} from '../../../../../projects/notado-lib/src/lib/service/spinner.service';
import {TranslateService} from '@ngx-translate/core';
import {AlertService} from '../../../../../projects/notado-lib/src/lib/service/alert.service';
import {ModalService} from '../../../../../projects/notado-lib/src/lib/service/modal.service';
import {CONST} from '../../../../../projects/notado-lib/src/lib/util/const';
import {Api} from '../../../../../projects/notado-lib/src/lib/enum/api';
import {Payment} from '../../../model/payment';
import {HttpService} from '../../../../../projects/notado-lib/src/lib/service/http.service';
import {DashboardService} from '../../../service/dashboard.service';
import {Event} from '../../../../../projects/notado-lib/src/lib/util/event.enum';
import {LocalStorageService} from '../../../../../projects/notado-lib/src/lib/service/local-storage.service';

@Component({
    selector: 'app-payment-success',
    templateUrl: './payment-success.component.html',
    styleUrls: ['./payment-success.component.scss'],
    standalone: true
})
export class PaymentSuccessComponent extends MySubscribable {

  constructor(
    public broadcastService: BroadcastService,
    private route: ActivatedRoute,
    public spinnerService: SpinnerService,
    public translate: TranslateService,
    public alertService: AlertService,
    public router: Router,
    public modalService: ModalService,
    public http: HttpService,
    private localStorage: LocalStorageService,
    private dashboardService: DashboardService
  ) {
    super(broadcastService);
  }

  ngOnInit() {
    console.log('PROCESS PAYMENT');
    this.dashboardService.processingPayment = true;
    setTimeout(() => {
        const sessionId = this.route.snapshot.paramMap.get('session_id');
        const userId: string = this.localStorage.get(CONST.USER_ID); // this is set after login so it must be present
        this.http.get(Api.PAYMENT + '/' + userId + '/process-session/' + sessionId, (payment: Payment) => {
          if (payment) {
            this.dashboardService.payment = payment;
            if (this.dashboardService.payment.valid) {
              this.alertService.addSuccess(this.translate.instant('ALERT.PAYMENT_SUCCESS'));
              this.fire(Event.PAYMENT_FOR_SUBSCRIPTION_SUCCESS);
              this.router.navigate(['/dashboard/dashboard-landing']);
            }
          }
        })
      },
      3000);
  }


}
