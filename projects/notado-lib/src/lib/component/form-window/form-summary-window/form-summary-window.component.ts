import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MyForm} from '../../../util/my-form';
import {FormService} from '../../../service/form.service';
import {BroadcastService} from '../../../service/broadcast.service';
import {HttpService} from '../../../service/http.service';
import {LanguageService} from '../../../service/language.service';
import {MetaForFormService} from '../../../service/meta-for-form.service';
import {FormsModule, NgModel} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {DaysHoursMinutesPipe} from '../../../pipe/hours-minutes.pipe';
import {DateToStringPipe} from '../../../pipe/date-to-string.pipe';
import {TimeToStringPipe} from '../../../pipe/time-to-string.pipe';
import {NgForOf, NgIf} from '@angular/common';
import {DurationToStringPipe} from '../../../pipe/duration-to-string.pipe';

@Component({
  selector: 'app-form-summary-window',
  templateUrl: './form-summary-window.component.html',
  styleUrls: ['./form-summary-window.component.scss'],
  imports: [
    TranslateModule,
    DaysHoursMinutesPipe,
    DateToStringPipe,
    TimeToStringPipe,
    FormsModule,
    NgIf,
    NgForOf,
    DurationToStringPipe
  ],
  standalone: true
})
export class FormSummaryWindowComponent extends MyForm implements OnInit {

  @ViewChild('licenceAgreement')
  public licenceAgreementInput: NgModel;
  public wasValidate: boolean = false;

  constructor(
    public formService: FormService,
    public broadcastService: BroadcastService,
    public http: HttpService,
    public metaService: MetaForFormService,
    public languageService: LanguageService,
  ) {
    super(formService, broadcastService, http, metaService, languageService);
  }

  public ngOnInit() {
    super.ngOnInit();
  }

  public validate(): boolean {
    this.wasValidate = true;
    if (
      this.window &&
      this.window.config &&
      this.window.config.licenceAgreement) {
      return this.licenceAgreementInput.valid;
    }
    return true;
  }


}
