import {Component, OnInit} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {Api} from '../../../enum/api';
import {ActivatedRoute} from '@angular/router';
import {FormSummaryWindowComponent} from '../form-summary-window/form-summary-window.component';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'app-form-paid-error-window',
  templateUrl: './form-paid-error-window.component.html',
  styleUrls: ['./form-paid-error-window.component.scss'],
  imports: [
    FormSummaryWindowComponent,
    TranslateModule
  ],
  standalone: true
})
export class FormPaidErrorWindowComponent extends MyForm implements OnInit {
  public countdown: number = 5;
  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
    private route: ActivatedRoute
  ) {
    super(formService, broadcastService, http, metaService, languageService);
  }

  public ngOnInit() {
    super.ngOnInit();
    this.formService.idx = this.formService.template.windows.length - 1;

    const sessionId: string = this.route.snapshot.paramMap.get('session_id');
    this.http.get(Api.FORM_PAYMENT + '/' + sessionId + '/payment-failed',
      () => {
      });

    const intervalId = setInterval(() => {
      console.log(this.countdown); // log the countdown value
      this.countdown--;
      if (this.countdown < 0) {
        clearInterval(intervalId); // stop the interval when countdown reaches 0
      }
    }, 1000);

    setTimeout(() => {
        this.formService.openReservationFormForProduction();
      },
      5_000
    );
  }

  public validate(): boolean {
    return true;
  }

}
